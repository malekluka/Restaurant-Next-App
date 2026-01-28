import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PRODUCT

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params; // ✅ Await params

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id, // ✅ id is string
      },
    });
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update order status" }),
      { status: 500 }
    );
  }
};

// DELETE SINGLE PRODUCT

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params; // ✅ Await params
  const session = await getAuthSession();
  if (session?.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: {
          id: id, // ✅ id is string
        },
      });
      return new NextResponse(JSON.stringify("Product has been deleted!"), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Failed to update order status" }),
        { status: 500 }
      );
    }
  }
  return new NextResponse(
        JSON.stringify({ message: "You are not allowed to delete!" }),
        { status: 403 }
      );
};
