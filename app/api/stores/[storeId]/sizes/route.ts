import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { size } = await req.json();

    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!size) {
      return new NextResponse("Size is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const newSize = await prismadb.productSize.create({
      data: {
        size,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(newSize);
  } catch (error) {
    console.log("/STORES/STOREID/SIZE/POST");
    return NextResponse.json(error);
  }
}

export async function GET({ params }: { params: { storeId: string } }) {
  try {
    const sizes = await prismadb.productSize.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("STORES/STOREID/SIZE/GET");
    return NextResponse.json(error);
  }
}
