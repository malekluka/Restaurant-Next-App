/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// FERTCH ALL ORDERS

export const GET = async (req:NextRequest) => {
  const session = await getAuthSession()

  if (session) {

      try {
        if (session.user.isAdmin) {
            const orders = await prisma.order.findMany()
            return new NextResponse(JSON.stringify(orders) , { status: 200 });
        }
        const orders = await prisma.order.findMany({
            where: {
                userEmail: session.user.email!
            }
        })
         return new NextResponse(JSON.stringify(orders) , { status: 200 });

      } catch (error) {
        console.log("Error fetching orders:", error);
        return NextResponse.json(
          { message: "Something went wrong!" },
          { status: 500 }
        );
      }
  } else {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  } 

};

// CREATE NEW ORDER
export const POST = async(req:NextRequest) => {
  const session = await getAuthSession()

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    
    // ✅ Validate required fields
    if (!body.price || !body.products || !body.status || !body.userEmail) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    console.log('Creating order with data:', body);
    
    const order = await prisma.order.create({
      data: {
        price: body.price, // Prisma will convert to Decimal
        products: body.products, // Should be an array
        status: body.status,
        userEmail: body.userEmail,
      }
    });
    
    console.log('Order created successfully:', order);
    
    // ✅ Convert Decimal to number for JSON serialization
    return NextResponse.json(
      {
        ...order,
        price: order.price.toNumber(), // Convert Decimal to number
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { 
        message: "Failed to create order", 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
};