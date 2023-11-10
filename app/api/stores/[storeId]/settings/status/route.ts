import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { status } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    if (!status) {
      return new NextResponse("Sattus is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("Stores/STOREID/SETTINGS/SATUS/PATCH ", error);
    return NextResponse.json("Internal issue", { status: 500 });
  }
}
