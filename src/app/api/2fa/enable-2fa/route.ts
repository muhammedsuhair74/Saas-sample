import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await req.json();
  console.log("body is", body);
  console.log("session.user.id is", session.user.id);
  const res = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      isTwoFactorEnabled: body.enable || false,
    },
  });
  console.log("res is", res);
  return new Response("Success", { status: 200 });
}
