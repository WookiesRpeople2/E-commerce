import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { name, email, password, confirm } = await req.json();

    if (!email) {
      return new NextResponse("email field is required", { status: 400 });
    }
    if (!confirm) {
      return new NextResponse("Confirm password field is required");
    }
    if (!password) {
      return new NextResponse("Password field required", { status: 400 });
    }
    if (password !== confirm) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    const taken = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (taken) {
      return new NextResponse("This email is already taken", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json("User created");
  } catch (error) {
    console.log("SIGNUP/POST");
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
