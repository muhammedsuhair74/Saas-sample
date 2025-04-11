import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  console.log("signUpMethod");
  const { name, email, password } = await req.json();
  console.log("signUpMethod", name, email, password);
  // Check for existing user
  const existingUser = await prisma.user.findUnique({ where: { email } });
  console.log("existingUser", existingUser);
  if (existingUser) {
    const response = {
      message: "User already exists",
      status: 400,
    };
    console.log("response", response);
    return NextResponse.json(response, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(newUser);
}
