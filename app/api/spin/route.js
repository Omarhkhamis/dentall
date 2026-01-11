import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = body?.fullName?.trim();
    const phone = body?.phone?.trim();
    const prize = body?.prize?.trim();

    if (!fullName || !phone || !prize) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const record = await prisma.spinData.create({
      data: {
        fullName,
        phone,
        prize
      }
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save spin." },
      { status: 500 }
    );
  }
}
