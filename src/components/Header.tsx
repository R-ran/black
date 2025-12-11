"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartSidebar from "./CartSidebar";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 向下滚动时隐藏，向上滚动时显示
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 向下滚动且超过100px时隐藏
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // 向上滚动时显示
        setIsVisible(true);
      }

      // 如果滚动到顶部，确保显示
      if (currentScrollY <= 0) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header className={`site-header ${isVisible ? "site-header--visible" : "site-header--hidden"}`}>
        <div className="header-container">
          <div className="header-content">
            {/* Logo - Centered */}
            <div className="header-logo">
              <Link href="/" className="logo-link">
                <span className="logo-text">TinyMint</span>
              </Link>
            </div>

            {/* Navigation Icons - Right aligned */}
            <div className="header-icons">
              <a
                href="https://accounts.shopify.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="header-icon-button"
                aria-label="Account"
              >
                <svg
                  className="header-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
              <button
                type="button"
                className="header-icon-button header-icon-button--cart"
                aria-label="Shopping Cart"
                onClick={() => setIsCartOpen(true)}
              >
                <svg
                  className="header-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="header-cart-badge">{cartItemCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

