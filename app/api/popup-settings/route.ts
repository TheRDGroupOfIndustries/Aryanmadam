import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const popup = await prisma.$queryRaw`SELECT * FROM "Popup" LIMIT 1` as any[];
    
    if (!popup || popup.length === 0) {
        return NextResponse.json({
            title: "10% off 54 collections",
            isActive: true
        });
    }

    return NextResponse.json(popup[0]);
  } catch (error: any) {
    console.error("Popup settings fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
