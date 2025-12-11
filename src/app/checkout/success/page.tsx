"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const sessionId = searchParams.get("session_id");
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // 如果支付成功，清空购物车
    if (paymentId || sessionId) {
      // 如果是Stripe支付，验证session状态
      if (sessionId) {
        fetch(`/api/verify-session?session_id=${sessionId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.payment_status === "paid") {
              clearCart();
              setSessionDetails(data);
            }
          })
          .catch((error) => {
            console.error("Error verifying session:", error);
            // 即使验证失败，也清空购物车（因为用户已经到达成功页面）
            clearCart();
          });
      } else {
        // PayPal或其他支付方式，直接清空购物车
        clearCart();
      }
    }
  }, [paymentId, sessionId, clearCart]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "20px" }}>
      <div style={{ textAlign: "center", maxWidth: "500px" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>✓</div>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "15px" }}>Payment Successful!</h1>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
          Thank you for your purchase. Your order has been confirmed and we will process it as soon as possible.
        </p>
        {(paymentId || sessionId) && (
          <p style={{ fontSize: "14px", color: "#999", marginBottom: "30px" }}>
            Payment ID: {paymentId || sessionId}
          </p>
        )}
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#000",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "600",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

