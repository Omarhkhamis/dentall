import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_DAYS = 7;

export const ensureDefaultAdmin = async () => {
  const existing = await prisma.adminUser.findFirst();
  if (existing) return existing;

  const passwordHash = await bcrypt.hash("123456", 10);
  return prisma.adminUser.create({
    data: {
      email: "admin@admin.com",
      passwordHash
    }
  });
};

export const createAdminSession = async (userId) => {
  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS);

  await prisma.adminSession.create({
    data: {
      userId,
      token,
      expiresAt
    }
  });

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/"
  });
};

export const clearAdminSession = async () => {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.adminSession.deleteMany({ where: { token } });
  }
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/"
  });
};

export const getAdminUser = async () => {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.adminSession.deleteMany({ where: { token } });
    return null;
  }

  return session.user;
};

export const verifyAdminCredentials = async (email, password) => {
  await ensureDefaultAdmin();
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return user;
};
