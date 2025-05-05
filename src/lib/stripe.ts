import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Stripe from "stripe";


export async function getUserSubscriptionPlan() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { isSubscribed: false, name: "Free" };
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { stripeSubscriptionId: true, stripePriceId: true },
  });

  if (!dbUser?.stripeSubscriptionId) {
    return { isSubscribed: false, name: "Free" };
  }

  // you can extend this to fetch live subscription from Stripe if needed

  return {
    isSubscribed: true,
    name: "Pro", // for now assume Pro if user has a subscription
  };
}

// src/lib/stripe.ts


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16", // latest stable version as of early 2025
});

// Optional: you can export your Stripe webhook secret too if needed
export const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
