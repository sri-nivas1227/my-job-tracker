// take user email and password and create a user if email doesn't exist in the database
// if email exists, return success if password matches, else return error

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body: { email: string; password: string; name: string } =
    await req.json();
  const email = body.email;
  const password = body.password;
  const name = body.name;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return NextResponse.json({
        success: true,
        data: {
          user: {
            name: user.name,
            email: user.email,
            id: user.id,
          },
          isLoggedin: true,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Password does not match",
      });
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
    return NextResponse.json({
      success: true,
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          id: newUser.id,
        },
        isLoggedin: true,
      },
    });
  }
}
