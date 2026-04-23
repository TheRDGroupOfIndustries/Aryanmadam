// app/api/products/route.ts - COMPLETE FILE (Replace entirely)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// ================== GET - Fetch Products ==================
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bestSeller = searchParams.get("bestSeller");
    const category = searchParams.get("category");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    // Build the where clause dynamically
    const where: any = {
      status: "ACTIVE", // Only fetch active products
    };

    // Filter by category if provided
    if (category && category !== "All") {
      if (category === "Gifts Under Rs.699") {
        where.price = { lte: 699 };
      } else {
        where.category = category;
      }
    }

    // Filter by max price if provided
    if (maxPrice) {
      const priceLimit = parseInt(maxPrice);
      if (!where.price) {
        where.price = {};
      }
      where.price.lte = priceLimit;
    }

    // Search in title if query provided
    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Best sellers: all active products sorted by rating desc, capped at 8
    // (rating filter removed so products with any rating are shown)


    // Fetch products from database
    const products = await prisma.product.findMany({
      where,
      orderBy: bestSeller === "true"
        ? { rating: "desc" }
        : { createdAt: "desc" },
    });

    // Map Prisma fields to the shape expected by the frontend
    const mapped = products.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      priceDisplay: p.priceDisplay ?? undefined,
      oldPrice: p.oldPrice ?? undefined,
      oldPriceDisplay: p.oldPriceDisplay ?? undefined,
      images: p.images ?? [],
      rating: p.rating ?? 0,
      reviews: p.reviews ?? 0,
      badge: p.badge ?? undefined,
    }));

    return NextResponse.json(mapped, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ================== POST - Create Product ==================
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin_authenticated")?.value === "true";

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body = await req.json();


    // Generate unique SKU based on category
    const generateSKU = (category: string) => {
      const categoryPrefix = category.substring(0, 3).toUpperCase();
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      return `${categoryPrefix}-${randomNumber}`;
    };

    const sku = generateSKU(body.category || "PRD");

    // Ensure stock is a number
    const stock = typeof body.stock === 'number' ? body.stock :
      typeof body.initialStock === 'number' ? body.initialStock : 0;

    // Create product with all fields
    const product = await prisma.product.create({
      data: {
        title: body.title,
        details: body.details || null,
        description: body.description,
        price: body.price,
        priceDisplay: body.priceDisplay || null,
        oldPrice: body.oldPrice || null,
        oldPriceDisplay: body.oldPriceDisplay || null,
        exclusive: body.exclusive || null,
        stock: stock,
        images: body.images || [],
        video: body.video || null,
        colour: body.colour || [],
        insideBox: body.insideBox || [],
        rating: body.rating || 0,
        reviews: body.reviews || 0,
        badge: body.badge || null,
        sku: sku,
        category: body.category || "Other",
        stone: body.stone || null,
        status: body.status || "ACTIVE",
      },
    });



    return NextResponse.json(
      {
        success: true,
        product,
        id: product.id,
        productId: product.id
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}