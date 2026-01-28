import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ payment_intent: string }> }
) {
  const { payment_intent } = await params;
    
  try {
    // First, try to find the order
    const existingOrder = await prisma.order.findFirst({
      where: {
        intent_id: payment_intent,
      },
    });

    if (!existingOrder) {
      
      
     await prisma.order.findMany({
        where: {
          intent_id: {
            not: null
          }
        },
        select: {
          id: true,
          intent_id: true,
          status: true
        }
      });
      
      
      return NextResponse.json(
        { error: "Order not found", payment_intent },
        { status: 404 }
      );
    }


    // Update order status
    const updatedOrder = await prisma.order.update({
      where: {
        id: existingOrder.id,
      },
      data: {
        status: "Being prepared!",
      },
    });
    
    
    return NextResponse.json(
      { 
        message: "Payment intent confirmed", 
        order: {
          id: updatedOrder.id,
          status: updatedOrder.status,
          price: updatedOrder.price.toString()
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error confirming payment:", error);
    return NextResponse.json(
      { 
        error: "Failed to confirm payment intent",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}