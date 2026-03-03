import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Convert slug to proper category format
    const categoryMap: Record<string, string> = {
      "all-anklets": "Crystals & Spiritual > Anklets",
      "crystal-clocks": "Crystals & Spiritual > Crystal Clocks",
      "crystal-pyramid": "Crystals & Spiritual > Crystal Pyramid",
      "crystal-pencils": "Crystals & Spiritual > Crystal Pencils",
      "crystal-box": "Crystals & Spiritual > Crystal Box",
      "crystal-idols": "Crystals & Spiritual > Crystal Idols",
      "pyrite-dust-frames": "Crystals & Spiritual > Pyrite Dust Frames",
      "seven-chakra-frames": "Crystals & Spiritual > Seven Chakra Healing Frames",
      "crystal-strings": "Crystals & Spiritual > Crystal Strings",
      "crystal-animals": "Crystals & Spiritual > Crystal Animals",
    };

    const fullCategory = categoryMap[category];

    if (!fullCategory) {
      return NextResponse.json(
        { error: `Unknown category: ${category}` },
        { status: 404 }
      );
    }

    // Fetch products matching this category
    let products;

    if (category === "all-anklets") {
      products = await prisma.product.findMany({
        where: {
          category: {
            startsWith: "Crystals & Spiritual > Anklets",
          },
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      products = await prisma.product.findMany({
        where: {
          category: fullCategory,
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (products.length === 0 && category !== "all-anklets") {
      products = await prisma.product.findMany({
        where: {
          category: {
            contains: category.replace(/-/g, " "),
            mode: "insensitive",
          },
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching anklet products:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}