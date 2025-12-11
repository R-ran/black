"use client";

export default function ImageSlider() {
  return (
    <div className="section-image-slider color-background-1 content-for-grouping">
      <div className="page-width">
        <div className="title-wrapper-with-link title-wrapper--self-padded-mobile title-wrapper--no-top-margin">
          <h2 className="title inline-richtext h2">
            Our customers are obsessed.
          </h2>
        </div>
      </div>
      <div className="page-width">
        <div className="image-slider-container">
          <div className="image-slide-grid">
            <div className="image-slide">
              <img
                src="https://tinymintstore.com/cdn/shop/files/12_10_5.gif?v=1765317727&width=750"
                alt="Customer Review 1"
                className="image-slide__image"
              />
            </div>
            <div className="image-slide">
              <img
                src="https://tinymintstore.com/cdn/shop/files/12_10_8.gif?v=1765318035&width=750"
                alt="Customer Review 2"
                className="image-slide__image"
              />
            </div>
            <div className="image-slide">
              <img
                src="https://tinymintstore.com/cdn/shop/files/12_10_9.gif?v=1765318221&width=750"
                alt="Customer Review 3"
                className="image-slide__image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

