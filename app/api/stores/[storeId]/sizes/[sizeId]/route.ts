import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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
    if (!params.sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    const sizePatch = await prismadb.productSize.updateMany({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        size,
      },
    });

    return NextResponse.json(sizePatch);
  } catch (error) {
    console.log("/STORES/STOREID/SIZES/SIZEID/PATCH");
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required");
    }
    if (!params.sizeId) {
      return new NextResponse("SIZEID Id is required", { status: 400 });
    }

    const product = await prismadb.product.findFirst({
      where: {
        storeId: params.storeId,
        sizeId: params.sizeId,
      },
    });

    if (product) {
      return new NextResponse(
        "Please make sure there are no products with this size",
        { status: 400 }
      );
    }

    const sizeDelete = await prismadb.productSize.delete({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizeDelete);
  } catch (error) {
    console.log("/STORES/STOREID/SIZE/SIZEID/DEDLETE");
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const size = await prismadb.productSize.findFirst({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("/STORES/STOREID/COLORS/COLORID/GET");
    return NextResponse.json(error);
  }
}
