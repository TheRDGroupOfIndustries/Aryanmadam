import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // @ts-ignore
    const popup = await prisma.popup.findFirst();
    
    if (!popup) {
        return NextResponse.json({
            title: "10% off 54 collections",
            isActive: true
        });
    }

    return NextResponse.json(popup);
  } catch (error: any) {
    console.error("Popup settings fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
