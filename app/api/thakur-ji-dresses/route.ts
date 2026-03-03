// app/api/thakur-ji-dresses/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Slug to Category Name Mapping for Thakur Ji Dresses
const SLUG_TO_CATEGORY: Record<string, string[]> = {
  "all-dresses": [
    "Thakur Ji Dresses > All Dresses",
    "Thakur Ji Dresses",
    "All Dresses"
  ],
  "rudraksh": [
    "Thakur Ji Dresses > Rudraksh",
    "Crystals & Spiritual > Thakur Ji Dresses > Rudraksh",
    "Rudraksh"
  ],
  "pooja-items": [
    "Thakur Ji Dresses > Pooja Items",
    "Crystals & Spiritual > Thakur Ji Dresses > Pooja Items",
    "Pooja Items"
  ]
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    if (!categorySlug) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // Get possible category names for this slug
    const possibleCategories = SLUG_TO_CATEGORY[categorySlug];

    if (!possibleCategories) {
      return NextResponse.json([], { status: 200 }); // Return empty array
    }

    // Search for products matching any of the category variations
    const products = await prisma.product.findMany({
      where: {
        OR: possibleCategories.map((cat) => ({
          category: {
            contains: cat,
            mode: "insensitive",
          },
        })),
        status: "ACTIVE",
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        oldPrice: true,
        images: true,
        rating: true,
        stock: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching Thakur Ji Dresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch Thakur Ji Dresses" },
      { status: 500 }
    );
  }
}