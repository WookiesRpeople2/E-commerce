import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const {
      productName,
      productImages,
      colors,
      sizes,
      quantity,
      price,
      diliveryPrice,
      collectionName,
    } = await req.json();

    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!productName) {
      return new NextResponse("Product name is required", { status: 400 });
    }
    if (!productImages) {
      return new NextResponse("Product images are required", { status: 400 });
    }
    if (!colors) {
      return new NextResponse("Colors are required", { status: 400 });
    }
    if (!sizes) {
      return new NextResponse("Sizes are required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!diliveryPrice) {
      return new NextResponse("Delevery price is required", { status: 400 });
    }
    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required");
    }
    if (!params.productId) {
      return new NextResponse("Products id is required", { status: 400 });
    }

    const productPatch = await prismadb.product.updateMany({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        productName,
        productImages,
        colors,
        sizes,
        quantity,
        price,
        diliveryPrice,
        collectionName,
      },
    });

    return NextResponse.json(productPatch);
  } catch (error) {
    console.log("/STORES/STOREID/Product/ProductID/PATCH");
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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
    if (!params.productId) {
      return new NextResponse("Collection Id is required", { status: 400 });
    }

    const productDelete = await prismadb.product.delete({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(productDelete);
  } catch (error) {
    console.log("/STORES/STOREID/PRODUCTS/PRODUCTID/DEDLETE");
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const productGet = await prismadb.product.findFirst({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(productGet);
  } catch (error) {
    console.log("/STORES/STOREID/PRODUCTS/PRODUCTID/GET");
    return NextResponse.json(error);
  }
}
