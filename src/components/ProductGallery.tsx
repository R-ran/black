"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const productImages = [
  {
    id: 1,
    src: "https://tinymintstore.com/cdn/shop/files/013.jpg?v=1764530603&width=1946",
    alt: "Product image 1",
  },
  {
    id: 2,
    src: "https://tinymintstore.com/cdn/shop/files/TAN.jpg?v=1764530603&width=1946",
    alt: "Product image 2",
  },
  {
    id: 3,
    src: "https://tinymintstore.com/cdn/shop/files/LIGHT.jpg?v=1764530603&width=1946",
    alt: "Product image 3",
  },
  {
    id: 4,
    src: "https://tinymintstore.com/cdn/shop/files/BRONZE.jpg?v=1764530603&width=1946",
    alt: "Product image 4",
  },
  {
    id: 5,
    src: "https://tinymintstore.com/cdn/shop/files/DEEP.jpg?v=1764530603&width=1946",
    alt: "Product image 5",
  },
  {
    id: 6,
    src: "https://tinymintstore.com/cdn/shop/files/011.jpg?v=1764530603&width=1946",
    alt: "Product image 6",
  },
  {
    id: 7,
    src: "https://tinymintstore.com/cdn/shop/files/012.jpg?v=1764530603&width=1946",
    alt: "Product image 7",
  },
  {
    id: 8,
    src: "https://tinymintstore.com/cdn/shop/files/014.png?v=1764530603&width=1946",
    alt: "Product image 8",
  },
  {
    id: 9,
    src: "https://tinymintstore.com/cdn/shop/files/fleece_leggings_11.jpg?v=1764530603&width=1946",
    alt: "Product image 9",
  },
];

export default function ProductGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailScrollIndex, setThumbnailScrollIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 750);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const thumbnailsPerView = isMobile ? 3 : 5; // 移动端3个，桌面端5个
  const thumbnailSize = isMobile ? 60 : 80;
  const thumbnailGap = isMobile ? 4 : 8;

  // 当currentIndex改变时，自动滚动缩略图
  useEffect(() => {
    const maxScrollIndex = Math.max(0, productImages.length - thumbnailsPerView);
    const targetScrollIndex = Math.min(
      Math.max(0, currentIndex - Math.floor(thumbnailsPerView / 2)),
      maxScrollIndex
    );
    setThumbnailScrollIndex(targetScrollIndex);
  }, [currentIndex, thumbnailsPerView]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // 自动滚动缩略图，确保选中的缩略图可见
    const maxScrollIndex = Math.max(0, productImages.length - thumbnailsPerView);
    const targetScrollIndex = Math.min(
      Math.max(0, index - Math.floor(thumbnailsPerView / 2)),
      maxScrollIndex
    );
    setThumbnailScrollIndex(targetScrollIndex);
  };

  const scrollThumbnails = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setThumbnailScrollIndex((prev) => Math.max(0, prev - 1));
    } else {
      const maxScrollIndex = Math.max(
        0,
        productImages.length - thumbnailsPerView
      );
      setThumbnailScrollIndex((prev) => Math.min(prev + 1, maxScrollIndex));
    }
  };

  const thumbnailTransform = `translateX(-${thumbnailScrollIndex * (thumbnailSize + thumbnailGap)}px)`;

  return (
    <div className="product__media-wrapper">
      <div
        id="MediaGallery-template--19873962786987__main"
        className="media-gallery"
        role="region"
        aria-label="Gallery Viewer"
      >
        <div className="product-carousel">
          {/* Main Image Display */}
          <div className="product-carousel__main">
            <div className="product-media-container media-type-image media-fit-contain global-media-settings gradient constrain-height">
              <div className="product__media media media--transparent">
                <Image
                  src={productImages[currentIndex].src}
                  alt={productImages[currentIndex].alt}
                  width={1946}
                  height={1946}
                  className="product__media-img"
                  priority={currentIndex === 0}
                  unoptimized={true}
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              className="product-carousel__arrow product-carousel__arrow--prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="icon icon-caret"
                viewBox="0 0 10 6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                  fill="currentColor"
                  transform="rotate(90 5 3)"
                ></path>
              </svg>
            </button>
            <button
              className="product-carousel__arrow product-carousel__arrow--next"
              onClick={goToNext}
              aria-label="Next image"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="icon icon-caret"
                viewBox="0 0 10 6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                  fill="currentColor"
                  transform="rotate(-90 5 3)"
                ></path>
              </svg>
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="product-carousel__thumbnails-wrapper">
            {thumbnailScrollIndex > 0 && (
              <button
                className="product-carousel__thumbnail-arrow product-carousel__thumbnail-arrow--prev"
                onClick={() => scrollThumbnails("prev")}
                aria-label="Scroll thumbnails left"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 10 6"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                    fill="currentColor"
                    transform="rotate(90 5 3)"
                  ></path>
                </svg>
              </button>
            )}
            <div className="product-carousel__thumbnails-container">
              <div
                className="product-carousel__thumbnails"
                style={{
                  transform: thumbnailTransform,
                }}
              >
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    className={`product-carousel__thumbnail ${
                      index === currentIndex
                        ? "product-carousel__thumbnail--active"
                        : ""
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={80}
                      height={80}
                      className="product-carousel__thumbnail-img"
                      unoptimized={true}
                    />
                  </button>
                ))}
              </div>
            </div>
            {thumbnailScrollIndex <
              productImages.length - thumbnailsPerView && (
              <button
                className="product-carousel__thumbnail-arrow product-carousel__thumbnail-arrow--next"
                onClick={() => scrollThumbnails("next")}
                aria-label="Scroll thumbnails right"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 10 6"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                    fill="currentColor"
                    transform="rotate(-90 5 3)"
                  ></path>
                </svg>
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="product-carousel__dots">
            {productImages.map((_, index) => (
              <button
                key={index}
                className={`product-carousel__dot ${
                  index === currentIndex ? "product-carousel__dot--active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

