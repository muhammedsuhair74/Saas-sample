"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

export const signUp = async (name: string, email: string, password: string) => {
  // Check for existing user
  const existingUser = await prisma.user.findUnique({ where: { email } });
  console.log("existingUser", existingUser);
  if (existingUser) {
    return { error: "User already exists" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { user: newUser };
  } catch (error) {
    return { error: "Error creating user" };
  }
};
