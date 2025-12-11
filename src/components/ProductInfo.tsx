"use client";

import { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

// 根据颜色获取对应的图片
const getImageByColor = (color: string) => {
  const colorMap: Record<string, string> = {
    Light: "https://tinymintstore.com/cdn/shop/files/LIGHT.jpg?v=1764530603&width=1946",
    Tan: "https://tinymintstore.com/cdn/shop/files/TAN.jpg?v=1764530603&width=1946",
    Bronze: "https://tinymintstore.com/cdn/shop/files/BRONZE.jpg?v=1764530603&width=1946",
    Deep: "https://tinymintstore.com/cdn/shop/files/013.jpg?v=1764530603&width=1946",
  };
  return colorMap[color] || colorMap.Light;
};

import { calculatePrice as calculatePriceUtil } from "@/utils/priceCalculator";

// 根据数量计算价格
const calculatePrice = (quantity: string) => {
  // 获取数量
  const quantityNum = parseInt(quantity.split(" ")[0]);
  
  // 使用统一的价格计算函数
  return calculatePriceUtil(quantityNum);
};

export default function ProductInfo() {
  const [selectedColor, setSelectedColor] = useState("Light");
  const [selectedSize, setSelectedSize] = useState("XS/S");
  const [selectedQuantity, setSelectedQuantity] = useState("2 Pairs");
  const { addToCart } = useCart();

  const colors = ["Light", "Tan", "Bronze", "Deep"];
  const sizes = ["XS/S", "M/L", "L/XL", "2XL/3XL"];
  const quantities = ["1 Pair", "2 Pairs", "3 Pairs", "5 Pairs"];

  // 计算价格
  const priceInfo = calculatePrice(selectedQuantity);

  const handleAddToCart = () => {
    addToCart({
      color: selectedColor,
      size: selectedSize,
      quantity: selectedQuantity,
      price: priceInfo.salePrice,
      originalPrice: priceInfo.originalPrice,
      discountPercent: priceInfo.discountPercent,
      image: getImageByColor(selectedColor),
    });
  };

  return (
    <div className="product__info-wrapper grid__item product__column-sticky product__info-wrapper--top-padding">
      <div
        id="ProductInfo-template--19873962786987__main"
        className="product__info-container main-product__info-container"
      >
        {/* Product Title */}
        <div className="product__title">
          <h1 className="h2">
            The Original Magic Fleece-Lined Shaping Leggings — Waist-Defining,
            Warm and Sleek, Never Bulky
          </h1>
        </div>

        {/* Rating */}
        <div className="rating-stars">
          <div className="rating-stars-and-text font-size--desktop-auto flex-center">
            <div className="rating-stars__container">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                  className="star-icon"
                  style={{ color: '#ffcc00' }}
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              ))}
            </div>
          </div>
          <span className="rating-stars__label">&nbsp;4.9 (12,478 reviews)</span>
        </div>

        {/* Features */}
        <div className="product__text-container product__text-container--left product__text-container--horizontal">
          <p className="product__text product__text-left">
            <span>
              ☑ <strong>4 natural shades</strong> that flatter every skin tone
            </span>
          </p>
        </div>

        <div className="product__text-container product__text-container--left product__text-container--horizontal">
          <p className="product__text product__text-left">
            <span>
              ☑ <strong>Waist-defining high-rise band</strong> that smooths the
              tummy and hips
            </span>
          </p>
        </div>

        <div className="product__text-container product__text-container--left product__text-container--horizontal">
          <p className="product__text product__text-left">
            <span>
              ☑ <strong>Cloud-soft fleece lining</strong> that keeps you warm
              without bulk
            </span>
          </p>
        </div>

        <div className="product__text-container product__text-container--left product__text-container--horizontal">
          <p className="product__text product__text-left">
            <span>
              ☑ <strong>Single clean seam</strong> for a long, sleek,
              second-skin look under clothes
            </span>
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Collection Title */}
        <div className="collection-title">
          <h2 className="collection-title__text">The Signature Collection</h2>
        </div>

        {/* Luxury Editorial Section */}
        <div className="luxury-editorial-container">
          <div className="le-trust-section">
            <div className="le-avatar-group">
              <div className="le-avatar">
                <Image
                  src="/1.avif"
                  alt="Customer avatar 1"
                  width={48}
                  height={48}
                  className="le-avatar-img"
                  unoptimized={true}
                />
              </div>
              <div className="le-avatar">
                <Image
                  src="/2.avif"
                  alt="Customer avatar 2"
                  width={48}
                  height={48}
                  className="le-avatar-img"
                  unoptimized={true}
                />
              </div>
              <div className="le-avatar">
                <Image
                  src="/3.avif"
                  alt="Customer avatar 3"
                  width={48}
                  height={48}
                  className="le-avatar-img"
                  unoptimized={true}
                />
              </div>
              <div className="le-avatar">
                <Image
                  src="/4.avif"
                  alt="Customer avatar 4"
                  width={48}
                  height={48}
                  className="le-avatar-img"
                  unoptimized={true}
                />
              </div>
              <div className="le-avatar">
                <Image
                  src="/5.avif"
                  alt="Customer avatar 5"
                  width={48}
                  height={48}
                  className="le-avatar-img"
                  unoptimized={true}
                />
              </div>
            </div>
            <div className="le-trust-text">
              <div className="le-stars">★★★★★</div>
              <p>
                Loved by <strong>200,000+</strong> Women
              </p>
            </div>
          </div>

          <div className="le-options">
            <div className="le-row">
              <div className="le-col-info">
                <span className="le-opt-title">1 Pair</span>
                <span className="le-opt-desc">Perfect for First-Time Try</span>
              </div>
              <div className="le-col-price">$29.99</div>
            </div>

            <div className="le-row">
              <div className="le-col-info">
                <span className="le-opt-title">2 Pairs</span>
                <span className="le-badge-outline">Save $15</span>
              </div>
              <div className="le-col-price">$44.99</div>
            </div>

            <div className="le-row le-row-hero">
              <div className="le-hero-tag">Best Value</div>
              <div className="le-col-info">
                <span className="le-opt-title">3 Pairs</span>
                <span className="le-badge-white">Most Loved Bundle</span>
              </div>
              <div className="le-col-price">
                <span className="le-price-big">$19.99</span>
                <span className="le-unit">/pair</span>
                <div className="le-sub-total">Bundle Total: $59.97</div>
              </div>
            </div>

            <div className="le-row">
              <div className="le-col-info">
                <span className="le-opt-title">5 Pairs</span>
                <span className="le-badge-outline">Max Savings ($60 Off)</span>
              </div>
              <div className="le-col-price">
                <span className="le-price-big">$17.99</span>
                <span className="le-unit">/pair</span>
              </div>
            </div>
          </div>

          <div className="le-size-guide">
            <div className="le-size-head">
              Size Guide
              <span style={{ fontWeight: 400, fontStyle: "italic", color: "#666" }}>
                {" "}
                (True to size)
              </span>
            </div>
            <div className="le-grid">
              <div className="le-grid-row le-head-row">
                <div>Size</div>
                <div>US</div>
                <div>UK</div>
                <div>EU</div>
              </div>
              <div className="le-grid-row">
                <div className="le-bold">XS / S</div>
                <div>2-6</div>
                <div>6-10</div>
                <div>34-38</div>
              </div>
              <div className="le-grid-row">
                <div className="le-bold">M / L</div>
                <div>7-11</div>
                <div>12-16</div>
                <div>40-44</div>
              </div>
              <div className="le-grid-row">
                <div className="le-bold">L / XL</div>
                <div>12-16</div>
                <div>16-20</div>
                <div>44-48</div>
              </div>
              <div className="le-grid-row" style={{ borderBottom: "none" }}>
                <div className="le-bold">2XL+</div>
                <div>18-24</div>
                <div>22-28</div>
                <div>50-56</div>
              </div>
            </div>
          </div>

          <div className="le-footer">
            <span className="le-icon">✈</span>
            Free Express Shipping on 3+ Pairs &nbsp;|&nbsp; 30-Day Money-Back
            Guarantee
          </div>
        </div>

        {/* Variant Selects */}
        <div className="variant-selects">
          <div className="product-form__input product-form__input--swatches">
            <label className="form__label">Color - {selectedColor}</label>
            <div className="color-swatches-container">
              {colors.map((color) => (
                <div key={color} className="color-swatch">
                  <input
                    type="radio"
                    id={`color-${color}`}
                    name="Color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    readOnly
                  />
                  <label htmlFor={`color-${color}`} className="color-swatch__button">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="product-form__input product-form__input--swatches">
            <label className="form__label">Size - {selectedSize}</label>
            <div className="size-swatches-container">
              {sizes.map((size) => (
                <div key={size} className="size-swatch">
                  <input
                    type="radio"
                    id={`size-${size}`}
                    name="Size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    readOnly
                  />
                  <label htmlFor={`size-${size}`} className="size-swatch__button">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="product-form__input product-form__input--swatches">
            <label className="form__label">Quantity - {selectedQuantity}</label>
            <div className="quantity-swatches-container">
              {quantities.map((qty) => (
                <div key={qty} className="quantity-swatch">
                  <input
                    type="radio"
                    id={`qty-${qty}`}
                    name="Quantity"
                    value={qty}
                    checked={selectedQuantity === qty}
                    onChange={() => setSelectedQuantity(qty)}
                    readOnly
                  />
                  <label htmlFor={`qty-${qty}`} className="quantity-swatch__button">
                    {qty}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="product-page-price">
          <div className={`price price--large ${priceInfo.originalPrice !== null ? 'price--on-sale price--show-badge' : ''}`}>
            <div className="price__container">
              <div className="price__sale">
                <span className="price-item price-item--sale price-item--last main-price accent-color-accent-1">
                  ${priceInfo.salePrice.toFixed(2)}
                </span>
                {priceInfo.originalPrice !== null && (
                  <span className="price__compare-price">
                    <s className="price-item price-item--regular main-comapre-price accent-color-accent-2">
                      ${priceInfo.originalPrice.toFixed(2)}
                    </s>
                  </span>
                )}
              </div>
            </div>
            {priceInfo.discountPercent !== null && (
              <span className="badge price__badge-sale color-accent-2">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="icon icon-discount color-foreground-text"
                  viewBox="0 0 12 12"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="nowrap">SAVE {priceInfo.discountPercent}%</span>
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="product-form__buttons product-form__buttons--uppercase">
          <button
            type="button"
            className="atc-button product-form__submit button button--full-width button--margin-x main-product-atc"
            onClick={handleAddToCart}
          >
            <span className="main-atc__label">
              <span className="main-atc__label__text">Add to cart</span>
            </span>
          </button>

          {/* PayPal Button */}
          <a
            href="/checkout?method=paypal"
            className="paypal-button button button--full-width"
          >
            <span className="paypal-button__content">
              <span className="paypal-button__text">Pay with</span>
              <img
                src="/paypal-logo.png"
                alt="PayPal"
                className="paypal-button__logo"
              />
            </span>
          </a>

          {/* Debit/Credit Card Button */}
          <a
            href="/checkout?method=card"
            className="card-payment-button button button--full-width"
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

          {/* Apple Pay Button */}
          <a
            href="/checkout?method=apple"
            className="apple-pay-button button button--full-width"
          >
            <span className="apple-pay-button__content">
              <span className="apple-pay-button__text">Pay with</span>
              <img
                src="/apple.png"
                alt="Apple Pay"
                className="apple-pay-button__logo"
              />
            </span>
          </a>
        </div>

        {/* Single Customer Review */}
        <div className="single-review-item">
          <div className="single-review-item__avatar">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="Sarah"
              width={60}
              height={60}
              className="single-review-item__avatar-img"
              unoptimized={true}
            />
          </div>
          <div className="single-review-item__content">
            <div className="single-review-item__text">
              <p>
                They feel like being wrapped in the softest blanket, but look
                like sleek, polished tights that smooth everything out. I
                basically live in them all winter — they&apos;re unbelievably
                soft and warm, and they instantly make any outfit look
                put-together while giving you a beautifully sculpted shape. At
                this point, I&apos;ve pretty much broken up with my jeans… I
                honestly don&apos;t see myself going back.
              </p>
            </div>
            <div className="single-review-item__author-and-stars">
              <p className="single-review-item__author">Sarah, 33</p>
              <span className="single-review-item__stars">★★★★★</span>
            </div>
          </div>
        </div>

        {/* Shipping & Returns Accordion */}
        <div className="shipping-returns-accordion">
          <details className="shipping-returns-accordion__details">
            <summary className="shipping-returns-accordion__summary">
              <div className="shipping-returns-accordion__summary-content">
                <span className="shipping-returns-accordion__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 11L12 14L22 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 className="shipping-returns-accordion__title">
                  Shipping & Returns
                </h2>
              </div>
              <svg
                className="shipping-returns-accordion__chevron"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 10 6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                  fill="currentColor"
                ></path>
              </svg>
            </summary>
            <div className="shipping-returns-accordion__content">
              <h5>Shipping & Delivery</h5>
              <ul>
                <li>
                  Free shipping on orders of 3 or more pairs of leggings.
                </li>
                <li>
                  In-stock orders are processed within 1-3 business days after
                  you place your order.
                </li>
                <li>
                  Estimated delivery time is 7-15 business days after shipment,
                  depending on your location.
                </li>
                <li>
                  You can track your package anytime via the &quot;Track My
                  Order&quot; page.
                </li>
              </ul>
              <h5>Returns & Exchanges</h5>
              <ul>
                <li>We offer 30-day hassle-free returns.</li>
                <li>
                  If you are not completely satisfied with your leggings, you
                  can return them within 30 days for a full refund.
                </li>
                <li>
                  If you have any questions about shipping or returns, our
                  customer support team is happy to help.
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

