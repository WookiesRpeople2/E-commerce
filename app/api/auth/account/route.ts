import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request) {
  try {
    const { image, name, email, password, confirm } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!image) {
      return new NextResponse("Image is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (password !== confirm) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    const hashedPassword = password ? await hash(password, 12) : undefined;

    const user = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        image,
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json("User created");
  } catch (error) {
    console.log("STORES/STOREID/ACCOUNT/PATCH");
    return NextResponse.json("Something went wrong");
  }
}
