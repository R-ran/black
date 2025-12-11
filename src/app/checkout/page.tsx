"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import type {
  PayPalOrderData,
  PayPalOrderActions,
  PayPalOrderDetails,
  ApplePayValidateMerchantEvent,
  ApplePayPaymentAuthorizedEvent,
} from "@/types/payment";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("method") || "paypal";
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    if (paymentMethod === "paypal" && paypalLoaded && window.paypal && items.length > 0) {
      // 清除之前的按钮
      const container = document.getElementById("paypal-button-container");
      if (container) {
        container.innerHTML = "";
      }

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },
          fundingSource: "paypal",
          createOrder: function (data: PayPalOrderData, actions: PayPalOrderActions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice.toFixed(2),
                    currency_code: "USD",
                  },
                  description: `Order from TinyMint Store - ${items.length} item(s)`,
                },
              ],
            });
          },
          onApprove: function (data: PayPalOrderData, actions: PayPalOrderActions) {
            return actions.order.capture().then(function (details: PayPalOrderDetails) {
              setProcessing(true);
              // 支付成功后的处理
              console.log("Payment successful:", details);
              // 清空购物车
              clearCart();
              // 跳转到成功页面
              window.location.href = `/checkout/success?paymentId=${details.id}`;
            });
          },
          onError: function (err: Error) {
            console.error("PayPal error:", err);
            alert("An error occurred during payment, please try again.");
          },
        })
        .render("#paypal-button-container");
    }
  }, [paymentMethod, paypalLoaded, items, totalPrice, clearCart]);

  // 检查Apple Pay是否可用
  useEffect(() => {
    if (paymentMethod === "apple") {
      if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
        setApplePayAvailable(true);
      } else {
        setApplePayAvailable(false);
      }
    }
  }, [paymentMethod]);

  const handleApplePay = () => {
    if (!window.ApplePaySession) {
      alert("Apple Pay is not available in this browser.");
      return;
    }

    const request = {
      countryCode: "US",
      currencyCode: "USD",
      supportedNetworks: ["visa", "masterCard", "amex", "discover"],
      merchantCapabilities: ["supports3DS"],
      total: {
        label: "TinyMint Store",
        amount: totalPrice.toFixed(2),
      },
      lineItems: items.map((item) => ({
        label: `The Original Magic Fleece-Lined Shaping Leggings - ${item.color} ${item.size}`,
        amount: item.price.toFixed(2),
      })),
    };

    const session = new window.ApplePaySession(3, request);

    session.onvalidatemerchant = async (event: ApplePayValidateMerchantEvent) => {
      try {
        // 在实际应用中，这里应该调用后端API来验证商户
        // 现在使用模拟的merchantSession
        const merchantSession = {
          epochTimestamp: Date.now(),
          expiresAt: Date.now() + 3600000,
          merchantSessionIdentifier: "merchant.session." + Date.now(),
          nonce: "nonce-" + Math.random(),
          merchantIdentifier: "merchant.com.tinymintstore",
          domainName: window.location.hostname,
          displayName: "TinyMint Store",
        };
        session.completeMerchantValidation(merchantSession);
      } catch (error) {
        console.error("Merchant validation error:", error);
        session.abort();
      }
    };

    session.onpaymentauthorized = async (event: ApplePayPaymentAuthorizedEvent) => {
      try {
        setProcessing(true);
        // 在实际应用中，这里应该调用后端API来处理支付
        console.log("Apple Pay payment authorized:", event.payment);
        
        // 模拟支付处理
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // 清空购物车
        clearCart();
        
        // 跳转到成功页面
        window.location.href = `/checkout/success?paymentId=applepay_${Date.now()}`;
        
        if (window.ApplePaySession) {
          session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        if (window.ApplePaySession) {
          session.completePayment(window.ApplePaySession.STATUS_FAILURE);
        }
        alert("Payment processing failed. Please try again.");
        setProcessing(false);
      }
    };

    session.oncancel = () => {
      console.log("Apple Pay cancelled");
      setProcessing(false);
    };

    session.begin();
  };

  const handleStripeCheckout = async () => {
    try {
      setStripeLoading(true);
      setProcessing(true);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // 重定向到Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to initiate payment. Please try again.';
      alert(errorMessage);
      setProcessing(false);
      setStripeLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
        <h1>Cart is empty</h1>
        <Link href="/" style={{ padding: "12px 24px", backgroundColor: "#000", color: "#fff", textDecoration: "none", borderRadius: "4px" }}>
          back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "700" }}>Checkout</h1>

      {/* 订单摘要 */}
      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "15px", fontSize: "20px", fontWeight: "600" }}>Order Summary</h2>
        
        {/* 商品列表 */}
        {items.map((item) => {
          const currentQty = parseInt(item.quantity.split(" ")[0]) || 1;
          return (
            <div key={item.id} style={{ display: "flex", gap: "15px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #ddd" }}>
              <Image
                src={item.image}
                alt={`${item.color} ${item.size} ${item.quantity}`}
                width={80}
                height={100}
                style={{ borderRadius: "4px", objectFit: "cover" }}
                unoptimized={true}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
                  The Original Magic Fleece-Lined Shaping Leggings — Waist-Defining, Warm and Sleek, Never Bulky
                </h3>
                <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                  <span>Color: {item.color}</span>
                  <span style={{ margin: "0 10px" }}>|</span>
                  <span>Size: {item.size}</span>
                  <span style={{ margin: "0 10px" }}>|</span>
                  <span>Quantity: {item.quantity}</span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  ${item.price.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "10px" }}>
          <span>Item Quantity:</span>
          <span>{totalItems} {totalItems === 1 ? "item" : "items"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "700", paddingTop: "15px", borderTop: "1px solid #ddd" }}>
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* 支付方式 */}
      {paymentMethod === "paypal" && (
        <>
          <Script
            src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test"}&currency=USD&disable-funding=credit,card,paylater`}
            strategy="afterInteractive"
            onLoad={() => {
              console.log("PayPal SDK loaded");
              setPaypalLoaded(true);
            }}
            onError={() => {
              console.error("Failed to load PayPal SDK");
              alert("Failed to load PayPal payment, please check your network connection or configure PayPal Client ID.");
            }}
          />
          <div>
            <h2 style={{ marginBottom: "15px", fontSize: "20px", fontWeight: "600" }}>PayPal Payment</h2>
            {processing ? (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <p>Processing payment...</p>
              </div>
            ) : (
              <div id="paypal-button-container" style={{ marginBottom: "0px" }}></div>
            )}
            <Link href="/" style={{ color: "#666", textDecoration: "underline", display: "inline-block", marginTop: "5px" }}>
              back to shopping
            </Link>
          </div>
        </>
      )}

      {paymentMethod === "card" && (
        <div>
          <h2 style={{ marginBottom: "15px", fontSize: "20px", fontWeight: "600" }}>Card Payment</h2>
          {processing ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <p>Redirecting to payment...</p>
            </div>
          ) : (
            <>
              {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === "your_stripe_publishable_key" ? (
                <div style={{ padding: "20px", backgroundColor: "#fff3cd", border: "1px solid #ffc107", borderRadius: "8px", marginBottom: "20px" }}>
                  <h3 style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}>Stripe Configuration Required</h3>
                  <p style={{ marginBottom: "15px", color: "#856404" }}>
                    To enable card payments, you need to:
                  </p>
                  <ol style={{ marginLeft: "20px", color: "#856404", marginBottom: "15px" }}>
                    <li>Create a Stripe account at <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0070ba", textDecoration: "underline" }}>stripe.com</a></li>
                    <li>Get your API keys from the Stripe Dashboard</li>
                    <li>Add to <code style={{ backgroundColor: "#f5f5f5", padding: "2px 6px", borderRadius: "4px" }}>.env.local</code>:
                      <br />
                      <code style={{ backgroundColor: "#f5f5f5", padding: "2px 6px", borderRadius: "4px" }}>STRIPE_SECRET_KEY=sk_test_...</code>
                      <br />
                      <code style={{ backgroundColor: "#f5f5f5", padding: "2px 6px", borderRadius: "4px" }}>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...</code>
                    </li>
                    <li>Install Stripe: <code style={{ backgroundColor: "#f5f5f5", padding: "2px 6px", borderRadius: "4px" }}>npm install stripe</code></li>
                    <li>Restart the development server</li>
                  </ol>
                </div>
              ) : (
                <button
                  onClick={handleStripeCheckout}
                  disabled={stripeLoading || processing}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    backgroundColor: "#666",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: stripeLoading || processing ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    opacity: stripeLoading || processing ? 0.6 : 1,
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src="/visa.png"
                    alt="Card Payment"
                    style={{ width: "40px", height: "20px", objectFit: "contain" }}
                  />
                  Pay with Card
                </button>
              )}
              <div>
                <Link href="/" style={{ color: "#666", textDecoration: "underline", display: "inline-block", marginTop: "5px" }}>
                  back to shopping
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {paymentMethod === "apple" && (
        <div>
          <h2 style={{ marginBottom: "15px", fontSize: "20px", fontWeight: "600" }}>Apple Pay</h2>
          {processing ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <p>Processing payment...</p>
            </div>
          ) : applePayAvailable ? (
            <>
              <button
                onClick={handleApplePay}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                <img
                  src="/apple.png"
                  alt="Apple Pay"
                  style={{ width: "20px", height: "20px", objectFit: "contain" }}
                />
                Pay with Apple Pay
              </button>
              <div>
                <Link href="/" style={{ color: "#666", textDecoration: "underline", display: "inline-block", marginTop: "5px" }}>
                  back to shopping
                </Link>
              </div>
            </>
          ) : (
            <>
              <p style={{ color: "#666", marginBottom: "20px" }}>
                Apple Pay is not available on this device or browser. Please use a supported Apple device with Safari browser.
              </p>
              <div>
                <Link href="/" style={{ color: "#666", textDecoration: "underline" }}>
                  back to shopping
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

