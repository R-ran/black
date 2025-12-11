"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, getTotalSavings } = useCart();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5分钟倒计时

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 倒计时
  useEffect(() => {
    if (!isOpen || items.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 5 * 60; // 重置为5分钟
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, items.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();
  const totalSavings = getTotalSavings();
  const totalItems = getTotalItems();

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="cart-sidebar-overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* 侧边栏 */}
      <div className="cart-sidebar">
        {/* 头部 */}
        <div className="cart-sidebar-header">
          <h2 className="cart-sidebar-header-title">
            Cart • {totalItems} {totalItems === 1 ? "item" : "items"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cart-sidebar-header-close"
            aria-label="Close cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 倒计时横幅 */}
        {items.length > 0 && (
          <div className="cart-sidebar-reserved">
            Cart reserved for {formatTime(timeLeft)}
          </div>
        )}

        {/* 内容 */}
        <div className="cart-sidebar-content">
          {items.length === 0 ? (
            <>
              <h2 className="cart-sidebar-title">Your cart is empty</h2>
              
              <Link
                href="/"
                onClick={onClose}
                className="cart-sidebar-continue-button"
              >
                Continue shopping
              </Link>

              <div className="cart-sidebar-account">
                <p className="cart-sidebar-account-question">Have an account?</p>
                <a
                  href="https://accounts.shopify.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cart-sidebar-account-link"
                >
                  Log in to check out faster.
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="cart-sidebar-items">
                {items.map((item) => {
                  const currentQty = parseInt(item.quantity.split(" ")[0]) || 1;
                  const unitPrice = item.price / currentQty;
                  const unitOriginalPrice = item.originalPrice ? item.originalPrice / currentQty : null;
                  const totalSavings = item.originalPrice ? item.originalPrice - item.price : 0;
                  const unitSavings = unitOriginalPrice ? unitOriginalPrice - unitPrice : 0;
                  
                  return (
                    <div key={item.id} className="cart-sidebar-item">
                      <div className="cart-sidebar-item-image">
                        <Image
                          src={item.image}
                          alt={`${item.color} ${item.size} ${item.quantity}`}
                          width={100}
                          height={120}
                          className="cart-sidebar-item-img"
                          unoptimized={true}
                        />
                      </div>
                      <div className="cart-sidebar-item-details">
                        <div className="cart-sidebar-item-header">
                          <h3 className="cart-sidebar-item-title">
                            The Original Magic Fleece-Lined Shaping Leggings — Waist-Defining, Warm and Sleek, Never Bulky
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="cart-sidebar-item-remove"
                            aria-label="Remove item"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        
                        {/* 单价信息 */}
                        <div className="cart-sidebar-item-unit-price">
                          {unitOriginalPrice !== null && (
                            <span className="cart-sidebar-item-unit-original">
                              ${unitOriginalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="cart-sidebar-item-unit-current">
                            ${unitPrice.toFixed(2)}
                          </span>
                          {item.originalPrice !== null && totalSavings > 0 && (
                            <span className="cart-sidebar-item-save-badge">
                              SAVE{totalSavings.toFixed(2).replace('.', '')}
                            </span>
                          )}
                        </div>
                        
                        <p className="cart-sidebar-item-variant">
                          {item.color} / {item.size} / {item.quantity}
                        </p>
                        
                        <div className="cart-sidebar-item-quantity-price">
                          <div className="cart-sidebar-quantity-selector">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, currentQty - 1)}
                              className="cart-sidebar-quantity-btn"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="cart-sidebar-quantity-value">{currentQty}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, currentQty + 1)}
                              className="cart-sidebar-quantity-btn"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* 总价信息 */}
                          <div className="cart-sidebar-item-pricing">
                            {item.originalPrice !== null && (
                              <span className="cart-sidebar-item-original-price">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="cart-sidebar-item-current-price">
                              ${item.price.toFixed(2)}
                            </span>
                            {totalSavings > 0 && (
                              <span className="cart-sidebar-item-savings">
                                (You save ${totalSavings.toFixed(2)})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 总结 */}
              <div className="cart-sidebar-summary">
                {totalSavings > 0 && (
                  <div className="cart-sidebar-summary-row">
                    <span className="cart-sidebar-summary-label">Savings</span>
                    <span className="cart-sidebar-summary-value cart-sidebar-summary-savings">
                      -${totalSavings.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="cart-sidebar-summary-row">
                  <span className="cart-sidebar-summary-label">Subtotal</span>
                  <span className="cart-sidebar-summary-value cart-sidebar-summary-total">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* 支付按钮 */}
              <div className="cart-sidebar-payment">
                <a
                  href="/checkout?method=paypal"
                  className="cart-sidebar-payment-button cart-sidebar-payment-paypal"
                >
                  Pay with <span className="paypal-text">PayPal</span>
                </a>
                <a
                  href="/checkout?method=card"
                  className="cart-sidebar-payment-button cart-sidebar-payment-card"
                >
                  <span className="card-payment-button__content">
                    <span className="card-payment-button__text">Pay with</span>
                    <img
                      src="/visa.png"
                      alt="Debit/Credit Card"
                      className="card-payment-button__logo"
                    />
                  </span>
                </a>
                <a
                  href="/checkout?method=apple"
                  className="cart-sidebar-payment-button cart-sidebar-payment-apple"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Pay with Apple Pay
                </a>
              </div>

              {/* 支付方式图标 */}
              <div className="cart-sidebar-payment-icons">
                <Image
                  src="/visa.png"
                  alt="Visa"
                  width={40}
                  height={25}
                  className="cart-sidebar-payment-icon"
                  unoptimized={true}
                />
                <Image
                  src="/paypal-logo.png"
                  alt="PayPal"
                  width={40}
                  height={25}
                  className="cart-sidebar-payment-icon"
                  unoptimized={true}
                />
                <Image
                  src="/apple.png"
                  alt="Apple Pay"
                  width={40}
                  height={25}
                  className="cart-sidebar-payment-icon"
                  unoptimized={true}
                />
                <Image
                  src="/yinlian.png"
                  alt="UnionPay"
                  width={40}
                  height={25}
                  className="cart-sidebar-payment-icon"
                  unoptimized={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
