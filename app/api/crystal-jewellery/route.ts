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

    // Map slug → full DB category string, e.g. "necklaces" → "Crystal Jewellery > Necklaces"
    const categoryMap: Record<string, string> = {
      necklaces: "Crystal Jewellery > Necklaces",
      bracelets: "Crystal Jewellery > Bracelets",
      earrings: "Crystal Jewellery > Earrings",
      rings: "Crystal Jewellery > Rings",
      pendants: "Crystal Jewellery > Pendants",
      anklets: "Crystal Jewellery > Anklets",
      bangles: "Crystal Jewellery > Bangles",
      malas: "Crystal Jewellery > Malas",
      "crystal-sets": "Crystal Jewellery > Crystal Sets",
    };

    const fullCategory = categoryMap[category];

    if (!fullCategory) {
      // Fallback: search by the slug loosely
      const products = await prisma.product.findMany({
        where: {
          category: {
            contains: "Crystal Jewellery",
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
    console.error("Error fetching crystal jewellery products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
