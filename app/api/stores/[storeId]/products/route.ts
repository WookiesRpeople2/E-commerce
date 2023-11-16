import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
      groupe,
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
      return new NextResponse("Color is required", { status: 400 });
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
    if (!groupe) {
      return new NextResponse("Groupe is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required");
    }

    const newProduct = await prismadb.product.create({
      data: {
        productName,
        productImages,
        colors,
        sizes,
        quantity,
        price,
        diliveryPrice,
        groupe,
        collectionName,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log("/STORES/STOREID/PRODUCTS/POST");
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("STORES/STOREID/PRODUCTS/GET");
    return NextResponse.json(error);
  }
}
