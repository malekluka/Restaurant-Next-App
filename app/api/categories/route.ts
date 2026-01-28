import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// FERTCH ALL CATEGORIES
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const POST = () => {
  return NextResponse.json({ message: "Hello, Categories!" }, { status: 200 });
};