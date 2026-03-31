import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { title, isActive } = await req.json();
    // @ts-ignore
    const popup = await prisma.popup.findFirst();

    if (popup) {
      // @ts-ignore
      const updatedPopup = await prisma.popup.update({
        where: { id: popup.id },
        data: { 
          title: title !== undefined ? title : popup.title, 
          isActive: isActive !== undefined ? isActive : popup.isActive 
        },
      });
      return NextResponse.json(updatedPopup);
    } else {
      // @ts-ignore
      const newPopup = await prisma.popup.create({
        data: { 
          title: title || "10% off 54 collections", 
          isActive: isActive ?? true 
        },
      });
      return NextResponse.json(newPopup);
    }
  } catch (error) {
    console.error("Admin popup update error:", error);
    return NextResponse.json({ error: "Failed to update popup settings" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // @ts-ignore
    const popup = await prisma.popup.findFirst();
    return NextResponse.json(popup || { title: "10% off 54 collections", isActive: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch popup settings" }, { status: 500 });
  }
}
