// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-02-24.acacia",
// });

// export async function POST(req: Request) {
//   const { email, plan } = await req.json();

//   // Set dynamic price based on the plan
//   const price = plan === "pro" ? 2000 : 1000; // 20.00 USD or 10.00 USD

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       customer_email: email,
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `Subscription - ${plan}`,
//               description: `Monthly ${plan} plan`,
//             },
//             unit_amount: price,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL!,
//       cancel_url: process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL!,
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     return NextResponse.json(
//       { error: "Failed to create checkout session" },
//       { status: 500 }
//     );
//   }
// }


import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe"; // You must have a stripe.ts file
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { priceId } = await req.json();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: session.user.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  return NextResponse.json({ url: stripeSession.url });
}
