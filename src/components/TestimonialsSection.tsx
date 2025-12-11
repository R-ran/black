export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      stars: "★★★★★",
      text: "These leggings are buttery soft and crazy comfortable. Wore them on a cold, rainy winter day in upstate NY and stayed warm the whole time. I'm officially done with sheer tights—these \"sheer\" leggings are my new everyday staple.",
      author: "Linda Warre",
      image: "https://tinymintstore.com/cdn/shop/files/10008_b0f88826-d754-44ad-aecf-105b92bfdd7c.jpg?v=1764255028&width=1420",
    },
    {
      id: 2,
      stars: "★★★★★",
      text: "By far the softest, coziest fleece tights I own. They look sheer but feel super warm. Super stretchy, zero itch, and so flattering. They're so good I'm already thinking about ordering another pair.",
      author: "Lauren Brown",
      image: "https://tinymintstore.com/cdn/shop/files/IMG_6138.jpg?v=1764255028&width=1420",
    },
    {
      id: 3,
      stars: "★★★★★",
      text: "I'm honestly obsessed with these. They're the perfect winter leggings—fuzzy and warm on the inside, smooth and chic on the outside, and they don't look bulky at all. I've been wearing them with boots and sweaters nonstop.",
      author: "Ashley Johns",
      image: "https://tinymintstore.com/cdn/shop/files/IMG_6164.jpg__PID_e98bdaa2-92f8-4598-b068-ecba4a3e72c7.jpg?v=1764255028&width=1420",
    },
  ];

  return (
    <div className="multicolumn color-background-1 gradient content-for-grouping">
      <div className="page-width section-testimonials-padding isolate">
        <div>
          <div className="title-wrapper-with-link title-wrapper--self-padded-mobile title-wrapper--no-top-margin">
            <h2 className="title h1">Winter Style, Solved.</h2>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="multicolumn-card content-container testimonial-card color-bg-overlay multicolumn--diff-bgs testimonial-card--has-author"
            >
              <div className="multicolumn-card__image-wrapper multicolumn-card__image-wrapper--full-width">
                <div className="media media--transparent media--square">
                  <img
                    src={testimonial.image}
                    alt={`Review by ${testimonial.author}`}
                    className="testimonial-image"
                  />
                </div>
              </div>
              <div className="multicolumn-card__info">
                <p
                  className="testimonial-card__stars"
                  style={{ "--stars-color": "#121212" } as React.CSSProperties}
                >
                  {testimonial.stars}
                </p>
                {/* Quote icon removed */}
                <div className="rte">
                  <p>{testimonial.text}</p>
                </div>
                <div className="testimonial-card__author-container">
                  <p className="testimonial-card__author">
                    <em>
                      <strong>{testimonial.author}</strong>
                    </em>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

