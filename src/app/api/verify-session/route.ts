import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey || stripeSecretKey === "your_stripe_secret_key") {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    // 动态导入stripe
    let stripe;
    try {
      stripe = await import('stripe');
    } catch (importError) {
      return NextResponse.json(
        { error: "Stripe package is required" },
        { status: 500 }
      );
    }

    const stripeClient = new stripe.default(stripeSecretKey);

    // 获取session详情
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (error: any) {
    console.error("Error verifying session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify session" },
      { status: 500 }
    );
  }
}

