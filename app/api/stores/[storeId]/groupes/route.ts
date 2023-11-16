import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
      return new NextResponse("storeId is required");
    }

    const newGroupe = await prismadb.productGroup.create({
      data: {
        groupe,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(newGroupe);
  } catch (error) {
    console.log("/STORES/STOREID/COLOR/POST");
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const groupes = await prismadb.productGroup.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(groupes);
  } catch (error) {
    console.log("STORES/STOREID/COLORS/GET");
    return NextResponse.json(error);
  }
}
