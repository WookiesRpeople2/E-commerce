import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
      return new NextResponse("storeId is required");
    }

    const collection = await prismadb.collection.create({
      data: {
        storeId: params.storeId,
        userId,
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

export async function GET({ params }: { params: { storeId: string } }) {
  try {
    const collections = await prismadb.collection.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(collections);
  } catch (error) {
    console.log("STORES/STOREID/COLLECTIONS/GET");
    return NextResponse.json(error);
  }
}
