import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { storeName } = await req.json();

    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    if (!storeName) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        storeName,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("/STORES/POST");
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
