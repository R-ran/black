"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

const colors = ["Light", "Tan", "Bronze", "Deep"];
const sizes = ["XS/S", "M/L", "L/XL", "2XL/3XL"];
const quantities = ["1 Pair", "2 Pairs", "3 Pairs", "5 Pairs"];

// 生成所有组合
const generateAllCombinations = () => {
  const combinations: string[] = [];
  colors.forEach((color) => {
    sizes.forEach((size) => {
      quantities.forEach((quantity) => {
        combinations.push(`${color} / ${size} / ${quantity}`);
      });
    });
  });
  return combinations;
};

const allCombinations = generateAllCombinations();

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

export default function StickyProductBar() {
  const [selectedOption, setSelectedOption] = useState("Tan / XS/S / 2 Pairs");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const { addToCart } = useCart();

  // 解析选中的选项
  const [selectedColor, selectedSize, selectedQuantity] = selectedOption.split(" / ");
  
  // 计算价格
  const priceInfo = calculatePrice(selectedQuantity);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 当下拉菜单打开时，滚动到选中的项
  useEffect(() => {
    if (isDropdownOpen && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isDropdownOpen]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

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
    <div className="sticky-product-bar">
      <div className="sticky-product-bar__container">
        {/* Left Section: Thumbnail and Price */}
        <div className="sticky-product-bar__left">
          {/* Product Thumbnail */}
          <div className="sticky-product-bar__thumbnail">
            <Image
              src={getImageByColor(selectedColor)}
              alt="Product thumbnail"
              width={80}
              height={80}
              className="sticky-product-bar__thumbnail-img"
              unoptimized={true}
            />
          </div>

          {/* Price Section */}
          <div className="sticky-product-bar__price-section">
            <div className="sticky-product-bar__price">
              <span className="sticky-product-bar__current-price">
                ${priceInfo.salePrice.toFixed(2)}
              </span>
              {priceInfo.originalPrice !== null && (
                <span className="sticky-product-bar__original-price">
                  ${priceInfo.originalPrice.toFixed(2)}
                </span>
              )}
              {priceInfo.discountPercent !== null && (
                <span className="sticky-product-bar__discount-badge">
                  SAVE {priceInfo.discountPercent}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Selector and Add to Cart */}
        <div className="sticky-product-bar__right">
          {/* Dropdown Selector */}
          <div className="sticky-product-bar__selector" ref={dropdownRef}>
            <button
              type="button"
              className="sticky-product-bar__dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Select product options"
            >
              <span className="sticky-product-bar__dropdown-text">
                {selectedOption}
              </span>
              <svg
                className={`sticky-product-bar__dropdown-arrow ${
                  isDropdownOpen ? "sticky-product-bar__dropdown-arrow--open" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="sticky-product-bar__dropdown-menu">
                <div className="sticky-product-bar__dropdown-list">
                  {allCombinations.map((option, index) => (
                    <button
                      key={index}
                      ref={option === selectedOption ? selectedItemRef : null}
                      type="button"
                      className={`sticky-product-bar__dropdown-item ${
                        option === selectedOption
                          ? "sticky-product-bar__dropdown-item--selected"
                          : ""
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            className="sticky-product-bar__add-to-cart"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

