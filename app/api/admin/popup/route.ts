import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { title, isActive } = await req.json();
    // @ts-ignore
    const popup = await prisma.$queryRaw`SELECT * FROM "Popup" LIMIT 1` as any[];

    if (popup.length > 0) {
      await prisma.$executeRaw`
        UPDATE "Popup" 
        SET "title" = ${title}, "isActive" = ${isActive}, "updatedAt" = NOW() 
        WHERE "id" = ${popup[0].id}
      `;
      return NextResponse.json({ success: true });
    } else {
      await prisma.$executeRaw`
        INSERT INTO "Popup" ("id", "title", "isActive", "updatedAt") 
        VALUES (${crypto.randomUUID()}, ${title || "10% off 54 collections"}, ${isActive ?? true}, NOW())
      `;
      return NextResponse.json({ success: true });
    }
  } catch (error: any) {
    console.error("Admin popup update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const popup = await prisma.$queryRaw`SELECT * FROM "Popup" LIMIT 1` as any[];
    return NextResponse.json(popup[0] || { title: "10% off 54 collections", isActive: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
