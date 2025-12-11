import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { items, totalPrice } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // 检查是否配置了Stripe密钥
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey || stripeSecretKey === "your_stripe_secret_key") {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY in .env.local" },
        { status: 500 }
      );
    }

    // 动态导入stripe（如果已安装）
    let stripe;
    try {
      stripe = await import('stripe');
    } catch (importError) {
      return NextResponse.json(
        { error: "Stripe package is required. Please run: npm install stripe" },
        { status: 500 }
      );
    }

    const stripeClient = new stripe.default(stripeSecretKey);

    // 构建line items
    // 注意：item.price已经是该商品的总价（考虑了数量折扣），所以quantity应该设为1
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'The Original Magic Fleece-Lined Shaping Leggings — Waist-Defining, Warm and Sleek, Never Bulky',
          description: `${item.color} / ${item.size} / ${item.quantity}`,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe使用cents，item.price已经是该商品的总价
      },
      quantity: 1, // item.price已经是该商品的总价，所以quantity设为1
    }));

    // 创建Checkout Session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin') || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin') || 'http://localhost:3000'}/checkout?method=card`,
      metadata: {
        order_items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

