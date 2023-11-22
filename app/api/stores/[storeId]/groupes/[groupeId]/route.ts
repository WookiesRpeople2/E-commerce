import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; groupeId: string } }
) {
  try {
    const { groupe } = await req.json();

    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!groupe) {
      return new NextResponse("Groupe is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    if (!params.groupeId) {
      return new NextResponse("Collection Id is required", { status: 400 });
    }

    const groupePatch = await prismadb.productGroup.updateMany({
      where: {
        id: params.groupeId,
        storeId: params.storeId,
      },
      data: {
        groupe,
      },
    });

    return NextResponse.json(groupePatch);
  } catch (error) {
    console.log("/STORES/STOREID/COLOR/COLORID/PATCH");
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; groupeId: string } }
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
    if (!params.groupeId) {
      return new NextResponse("Collection Id is required", { status: 400 });
    }

    const product = await prismadb.product.findFirst({
      where: {
        storeId: params.storeId,
        groupeId: params.groupeId,
      },
    });

    if (product) {
      return new NextResponse(
        "Please make sure there are no products associated with this groupe",
        { status: 400 }
      );
    }

    const groupeDelete = await prismadb.productGroup.delete({
      where: {
        id: params.groupeId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(groupeDelete);
  } catch (error) {
    console.log("/STORES/STOREID/COLORS/COLORID/DEDLETE");
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; groupeId: string } }
) {
  try {
    const color = await prismadb.productColor.findFirst({
      where: {
        id: params.groupeId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("/STORES/STOREID/COLORS/COLORID/GET");
    return NextResponse.json(error);
  }
}
