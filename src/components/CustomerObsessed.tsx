import React from 'react';

export default function CustomerObsessed() {
  return (
    <section className="section-customer-obsessed section-main-padding">
      <div className="page-width">
        <div className="customer-obsessed-container">
          <h2 className="customer-obsessed-title">Our customers are obsessed.</h2>
          <div className="customer-gifs">
            <div className="gif-item">
              <img
                src="https://tinymintstore.com/cdn/shop/files/12_10_5.gif?v=1765317727&width=750"
                alt="Customer Review 1"
                className="customer-gif"
              />
            </div>
            <div className="gif-item">
              <img
                src="https://tinymintstore.com/cdn/shop/files/12_10_8.gif?v=1765318035&width=750"
                alt="Customer Review 2"
                className="customer-gif"
              />
            </div>
            <div className="gif-item">
              <img
                src="https://tinymintstore.com/cdn/shop/files/12_10_9.gif?v=1765318221&width=750"
                alt="Customer Review 3"
                className="customer-gif"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}