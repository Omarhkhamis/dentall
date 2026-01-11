import { NextResponse } from "next/server";
import { readdir, unlink } from "fs/promises";
import path from "path";

const collectUploads = async (baseDir, relativeDir = "") => {
  const currentDir = path.join(baseDir, relativeDir);
  const entries = await readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const nextRelative = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectUploads(baseDir, nextRelative);
      files.push(...nested);
    } else {
      const urlPath = nextRelative.split(path.sep).join("/");
      files.push({
        name: urlPath,
        url: `/uploads/${urlPath}`
      });
    }
  }

  return files;
};

export const GET = async () => {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    const files = await collectUploads(uploadsDir);
    const items = files.sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json({ files: items });
  } catch (error) {
    return NextResponse.json({ files: [] });
  }
};

export const DELETE = async (request) => {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  const normalizedName = name.replace(/\\/g, "/").replace(/^\/+/, "");
  const safeName = path.posix.normalize(normalizedName);
  if (
    safeName.startsWith("..") ||
    safeName.includes("../") ||
    path.isAbsolute(safeName)
  ) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadsDir, safeName);
  const resolvedUploadsDir = path.resolve(uploadsDir);
  const resolvedFilePath = path.resolve(filePath);
  if (!resolvedFilePath.startsWith(resolvedUploadsDir + path.sep)) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  try {
    await unlink(filePath);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
};
