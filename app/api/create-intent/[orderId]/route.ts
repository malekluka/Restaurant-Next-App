import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(
  req: NextRequest, 
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  console.log("🔍 Creating payment intent for order:", orderId);

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      console.error("❌ Order not found:", orderId);
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ FIX: If order already has a payment intent, return it instead of creating a new one
    if (order.intent_id) {
      console.log("♻️ Order already has intent_id:", order.intent_id, "- Reusing existing payment intent");
      
      try {
        // Retrieve the existing payment intent from Stripe
        const existingIntent = await stripe.paymentIntents.retrieve(order.intent_id);
        
        console.log("✅ Reusing existing payment intent:", existingIntent.id);
        
        return NextResponse.json(
          { clientSecret: existingIntent.client_secret },
          { status: 200 }
        );
      } catch (stripeError) {
        console.warn("⚠️ Existing intent not found in Stripe, creating new one:", stripeError);
        // If the intent doesn't exist in Stripe anymore, continue to create a new one
      }
    }

    console.log("📦 Order found:", order.id, "Current intent_id:", order.intent_id, "Price:", order.price);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.price) * 100), // Convert dollars to cents
      currency: "usd",
      metadata: { orderId: orderId },
      automatic_payment_methods: { enabled: true },
    });

    console.log("✅ Stripe payment intent created:", paymentIntent.id);

    // Save intent_id to order
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        intent_id: paymentIntent.id,
      },
    });

    console.log("✅ Order updated with intent_id:", updatedOrder.intent_id);

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Payment intent creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}