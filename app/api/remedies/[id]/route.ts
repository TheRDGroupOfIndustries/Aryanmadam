import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET single remedy by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;


    const remedy = await prisma.remedy.findUnique({
      where: { id },
    });

    if (!remedy) {
      return NextResponse.json(
        { error: 'Remedy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(remedy);
  } catch (error) {
    console.error('❌ Error fetching remedy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch remedy' },
      { status: 500 }
    );
  }
}

// PUT - Update remedy (SIMPLIFIED - only basic fields)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('admin_authenticated')?.value === 'true';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();


    // ✅ ONLY UPDATE FIELDS THAT EXIST IN YOUR SCHEMA
    const updatedRemedy = await prisma.remedy.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        ailment: body.ailment,
        price: body.price,
        priceDisplay: body.priceDisplay || null,
        oldPrice: body.oldPrice || null,
        oldPriceDisplay: body.oldPriceDisplay || null,
        stock: body.stock,
        images: body.images || [],
        video: body.video || null,
        status: body.status || 'ACTIVE',
      },
    });

    return NextResponse.json(updatedRemedy);
  } catch (error) {
    console.error('❌ Error updating remedy:', error);
    return NextResponse.json(
      { error: 'Failed to update remedy' },
      { status: 500 }
    );
  }
}

// DELETE remedy
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get('admin_authenticated')?.value === 'true';
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { id } = await params;


    await prisma.remedy.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Remedy deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting remedy:', error);
    return NextResponse.json(
      { error: 'Failed to delete remedy' },
      { status: 500 }
    );
  }
}