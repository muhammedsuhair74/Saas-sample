import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET all users
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// Create a new user
export async function POST(req: Request) {
  const data = await req.json();
  const newUser = await prisma.user.create({
    data,
  });
  return NextResponse.json(newUser);
}

// Delete a user
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.user.delete({
    where: { id },
  });
  return NextResponse.json({ message: "User deleted" });
}
