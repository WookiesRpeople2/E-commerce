import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; collectionId: string } }
) {
  try {
    const { collectionName, collectionImage } = await req.json();

    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!collectionName) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!collectionImage) {
      return new NextResponse("Image is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    if (!params.collectionId) {
      return new NextResponse("Collection Id is required", { status: 400 });
    }

    const collection = await prismadb.collection.updateMany({
      where: {
        id: params.collectionId,
        storeId: params.storeId,
        userId,
      },
      data: {
        collectionName,
        collectionImage,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("/STORES/STOREID/COLLECTION/POST");
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; collectionId: string } }
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
    if (!params.collectionId) {
      return new NextResponse("Collection Id is required", { status: 400 });
    }

    const collection = await prismadb.collection.delete({
      where: {
        id: params.collectionId,
        storeId: params.storeId,
        userId,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("/STORES/STOREID/COLLECTION/DELETE");
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; collectionId: string } }
) {
  try {
    const collection = await prismadb.collection.findFirst({
      where: {
        id: params.collectionId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(collection);
  } catch (error) {
    console.log("/STORES/STOREID/COLLECTION/GET");
    return NextResponse.json(error);
  }
}
