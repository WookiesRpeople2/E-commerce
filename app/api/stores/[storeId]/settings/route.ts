import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeName } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    if (!storeName) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        storeName,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("Stores/STOREID/SETTINGS/POST ", error);
    return NextResponse.json("Internal issue", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    const store = await prismadb.store.delete({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE/STOREID/SETTINGS/DELETE", error);
    return NextResponse.json("Internale error", { status: 500 });
  }
}
