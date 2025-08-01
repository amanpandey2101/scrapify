import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

// Only import Stripe-related modules if environment variables are available
let stripe: any = null;
let handleCheckoutSessionCompleted: any = null;

// Check if Stripe is properly configured
const isStripeConfigured = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET;

if (isStripeConfigured) {
  try {
    const stripeModule = require("@/lib/stripe/stripe");
    stripe = stripeModule.stripe;
    
    const checkoutModule = require("@/lib/stripe/handleCheckoutSessionCompleted");
    handleCheckoutSessionCompleted = checkoutModule.handleCheckoutSessionCompleted;
  } catch (error) {
    console.warn("Stripe modules not available:", error);
  }
}

export async function POST(request: Request) {
  // If Stripe is not configured, return a 501 Not Implemented
  if (!isStripeConfigured || !stripe || !handleCheckoutSessionCompleted) {
    return new NextResponse("Stripe webhook not configured", { status: 501 });
  }

  const body = await request.text();
  const signatureHeaders = headers().get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signatureHeaders,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      default:
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Stripe webhook error", error);
    return new NextResponse("webhook error", { status: 400 });
  }
}
