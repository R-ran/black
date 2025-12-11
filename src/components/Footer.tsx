"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Thank you for subscribing!" });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage({ type: "error", text: "Failed to subscribe. Please try again later." });
    } finally {
      setIsSubmitting(false);
      // 3秒后清除消息
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Quick Links */}
          <div className="footer-section footer-section--links">
            <h3 className="footer-title">Quick links</h3>
            <nav className="footer-nav">
              <Link href="/about" className="footer-link">
                About US
              </Link>
              <Link href="/contact" className="footer-link">
                Contact Us
              </Link>
              <Link href="/faqs" className="footer-link">
                FAQs
              </Link>
              <Link href="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/return-refund-policy" className="footer-link">
                Return & Refund Policy
              </Link>
              <Link href="/shipping-delivery" className="footer-link">
                Shipping & Delivery
              </Link>
              <Link href="/terms-of-service" className="footer-link">
                Terms of service
              </Link>
              <Link href="/privacy-choices" className="footer-link">
                Your privacy choices
              </Link>
            </nav>
          </div>

          {/* Right Section - Subscribe */}
          <div className="footer-section footer-section--subscribe">
            <div className="footer-subscribe-content">
              <h3 className="footer-title">Subscribe to our emails</h3>
              <p className="footer-description">
                Stay updated on exclusive offers and latest arrivals - subscribe to
                our newsletter now for special discounts and insider deals!
              </p>
              <form className="footer-subscribe-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Email"
                  className="footer-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="footer-signup-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </button>
              </form>
              {message && (
                <p className={`footer-subscribe-message footer-subscribe-message--${message.type}`}>
                  {message.text}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          {/* Full-width divider above PayPal logo */}
          <div className="footer-divider"></div>
          <div className="footer-payment">
            <img
              src="/paypal-logo.png"
              alt="PayPal"
              className="footer-paypal-logo"
            />
          </div>
          <p className="footer-copyright">
            © 2025,{" "}
            <Link href="/" className="footer-copyright-link">
              tinymintstore
            </Link>{" "}
            Powered by Shopify
          </p>
        </div>
      </div>
    </footer>
  );
}

