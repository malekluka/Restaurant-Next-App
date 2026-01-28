import {prisma} from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req:NextRequest , { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params; // ✅ Await params

    try {   
        const body = await req.json();
        await prisma.order.update({
            where: {
                id: id
             },
            data: {
                status: body
            }
        });
        return new NextResponse(JSON.stringify({message:"Order status updated successfully"}), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message:"Failed to update order status"}), { status: 500 });
    }
};