import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";
import { ProductStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet) as any[];

    if (data.length === 0) {
      return NextResponse.json({ error: "Excel file is empty" }, { status: 400 });
    }

    const productsToCreate = data.map((row: any) => {
      // Helper to get value with multiple potential keys
      const v = (keys: string[]) => {
        for (const k of keys) if (row[k] !== undefined && row[k] !== null) return row[k];
        return null;
      };

      // Combine categories
      const mainCat = String(v(["Category", "category"]) || "").trim();
      const subCat = String(v(["Subcategory", "subcategory"]) || "").trim();
      const thirdCat = String(v(["ThirdCategory", "third_category"]) || "").trim();

      let finalCategory = mainCat || "General";
      if (mainCat && subCat) {
        finalCategory = `${mainCat} > ${subCat}`;
        if (thirdCat) {
          finalCategory = `${finalCategory} > ${thirdCat}`;
        }
      }

      const pInput = String(v(["Price", "price"]) || "0");
      const opInput = String(v(["Old Price", "OldPrice", "old_price"]) || "0");
      const excInput = v(["Exclusive", "exclusive"]);

      return {
        title: String(v(["Title", "title"]) || ""),
        description: String(v(["Description", "description"]) || ""),
        details: String(v(["SubTitle", "subtitle", "Details", "details"]) || ""),
        price: parseInt(pInput) || 0,
        priceDisplay: pInput,
        oldPrice: parseInt(opInput) || null,
        oldPriceDisplay: opInput,
        stock: parseInt(String(v(["Stock", "stock"]) || "0")) || 0,
        category: finalCategory,
        sku: String(v(["SKU", "sku"]) || `BULK-${Math.random().toString(36).substring(7).toUpperCase()}`),
        status: ProductStatus.ACTIVE,
        images: [],
        video: null,
        rating: 0,
        reviews: 0,
        colour: String(v(["Colour", "Color", "color"]) || "").split(",").map(c => c.trim()).filter(c => c !== ""),
        insideBox: String(v(["Inside box", "InsideBox", "inside_box"]) || "").split(",").map(i => i.trim()).filter(i => i !== ""),
        stone: String(v(["Material/Stone", "Material", "Stone", "stone", "material"]) || "").trim() || null,
        exclusive: excInput ? parseInt(String(excInput)) : null,
        badge: String(v(["Badge", "badge"]) || "").trim() || null
      };
    });

    // Simple validation
    const invalidProducts = productsToCreate.filter(p => !p.title || isNaN(p.price));
    if (invalidProducts.length > 0) {
      return NextResponse.json({
        error: "Some rows have invalid data (missing title or price is not a number)",
        invalidCount: invalidProducts.length
      }, { status: 400 });
    }

    try {
      // For PostgreSQL, createMany is efficient and supports skipDuplicates
      await prisma.product.createMany({
        data: productsToCreate,
        skipDuplicates: true,
      });
    } catch (dbError: any) {
      console.error("DB Bulk Error:", dbError);
      // Detailed fallback for debugging
      for (const p of productsToCreate) {
        await prisma.product.upsert({
          where: { sku: p.sku },
          update: p,
          create: p
        });
      }
    }

    return NextResponse.json({ success: true, count: productsToCreate.length });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: error.message || "An unknown error occurred" }, { status: 500 });
  }
}
