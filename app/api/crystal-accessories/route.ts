import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // Map slug → full DB category string
    const categoryMap: Record<string, string> = {
      "crystal-beads-set": "Crystal Accessories > Crystal Beads Set",
      "crystal-beads-bracelets": "Crystal Accessories > Crystal Beads Bracelets",
    };

    const fullCategory = categoryMap[category];

    if (!fullCategory) {
      // Fallback: search by the slug loosely
      const products = await prisma.product.findMany({
        where: {
          category: {
            contains: "Crystal Accessories",
            mode: "insensitive",
          },
          status: "ACTIVE",
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(products);
    }

    const products = await prisma.product.findMany({
      where: {
        category: fullCategory,
        status: "ACTIVE",
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching crystal accessories products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
