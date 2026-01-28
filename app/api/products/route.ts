import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// FERTCH ALL PRODUCTS

export const GET = async (req:NextRequest) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const products = await prisma.product.findMany({
      where: { 
        ...(category ? { categorySlug: category } : {isFeatured: true})
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        ...body,
        slug: `${body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Math.random().toString(36).substring(2, 8)}`,
      },
    });
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};