import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { color } = await req.json();

    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!color) {
      return new NextResponse("Color is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    if (!params.colorId) {
      return new NextResponse("Collection Id is required", { status: 400 });
    }

    const colorPatch = await prismadb.productColor.updateMany({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        color,
      },
    });

    return NextResponse.json(colorPatch);
  } catch (error) {
    console.log("/STORES/STOREID/COLOR/COLORID/PATCH");
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
    if (!params.colorId) {
      return new NextResponse("Collection Id is required", { status: 400 });
    }

    const product = await prismadb.product.findFirst({
      where: {
        storeId: params.storeId,
        colorId: params.colorId,
      },
    });

    if (product) {
      return new NextResponse(
        "Please make sure there are no products with this color",
        { status: 400 }
      );
    }

    const colorDelete = await prismadb.productColor.delete({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colorDelete);
  } catch (error) {
    console.log("/STORES/STOREID/COLORS/COLORID/DEDLETE");
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const color = await prismadb.productColor.findFirst({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("/STORES/STOREID/COLORS/COLORID/GET");
    return NextResponse.json(error);
  }
}
