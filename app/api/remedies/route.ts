import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// Slug to Label mapping for Remedies
const SLUG_TO_LABEL: Record<string, string> = {
  "wealth": "Wealth",
  "health": "Health",
  "relationship": "Relationship",
  "protection": "Protection",
  "self-confidence": "Self-Confidence",
  "education": "Education",
  "crown-chakra": "Crown Chakra",
  "third-eye-chakra": "Third Eye Chakra",
  "throat-chakra": "Throat Chakra",
  "heart-chakra": "Heart Chakra",
  "solar-plexus-chakra": "Solar Plexus Chakra",
  "sacral-chakra": "Sacral Chakra",
  "root-chakra": "Root Chakra",
};

// GET - Fetch all remedies (including from Product table)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const search = searchParams.get('search');
    const maxPrice = searchParams.get('maxPrice');

    const label = categorySlug ? SLUG_TO_LABEL[categorySlug] || categorySlug : null;

    // Build the query for Remedy table
    const remedyWhere: any = { status: 'ACTIVE' };
    if (categorySlug && categorySlug !== 'All') {
      remedyWhere.category = categorySlug;
    }
    if (search) {
      remedyWhere.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (maxPrice) {
      remedyWhere.price = { lte: parseInt(maxPrice) };
    }

    // Build the query for Product table (where category starts with "Remedies")
    const productWhere: any = { 
      status: 'ACTIVE',
      category: { contains: 'Remedies', mode: 'insensitive' } 
    };
    if (label && label !== 'All') {
      productWhere.category = { contains: label, mode: 'insensitive' };
    }
    if (search) {
      productWhere.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (maxPrice) {
      productWhere.price = { lte: parseInt(maxPrice) };
    }

    // Fetch from both tables
    const [remedies, products] = await Promise.all([
      prisma.remedy.findMany({ where: remedyWhere, orderBy: { createdAt: 'desc' } }),
      prisma.product.findMany({ where: productWhere, orderBy: { createdAt: 'desc' } }),
    ]);

    // Format products to match the expected structure if necessary (though they are very similar)
    // Merge and sort by createdAt
    const allItems = [...remedies, ...products].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allItems);
  } catch (error) {
    console.error('Error fetching remedies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch remedies' },
      { status: 500 }
    );
  }
}

// POST - Create new remedy (SIMPLIFIED - only basic fields)
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('admin_authenticated')?.value === 'true';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const body = await request.json();


    // ✅ ONLY USE FIELDS THAT EXIST IN YOUR SCHEMA
    const remedy = await prisma.remedy.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        ailment: body.ailment,
        price: body.price,
        priceDisplay: body.priceDisplay || null,
        oldPrice: body.oldPrice || null,
        oldPriceDisplay: body.oldPriceDisplay || null,
        stock: body.stock || 0,
        images: body.images || [],
        video: body.video || null,
        rating: 0,
        reviews: 0,
        status: 'ACTIVE',
      },
    });


    return NextResponse.json(remedy, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating remedy:', error);
    return NextResponse.json(
      { error: 'Failed to create remedy' },
      { status: 500 }
    );
  }
}