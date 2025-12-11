export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "They feel like being wrapped in the softest blanket, but look like sleek, polished tights that smooth everything out. I basically live in them all winter — they're unbelievably soft and warm, and they instantly make any outfit look put-together while giving you a beautifully sculpted shape. At this point, I've pretty much broken up with my jeans… I honestly don't see myself going back.",
      author: "Sarah, 33",
    },
    {
      id: 2,
      text: "These leggings are buttery soft and crazy comfortable. Wore them on a cold, rainy winter day in upstate NY and stayed warm the whole time. I'm officially done with sheer tights—these \"sheer\" leggings are my new everyday staple.",
      author: "Linda Warre",
    },
    {
      id: 3,
      text: "By far the softest, coziest fleece tights I own. They look sheer but feel super warm. Super stretchy, zero itch, and so flattering. They're so good I'm already thinking about ordering another pair.",
      author: "Lauren Brown",
    },
    {
      id: 4,
      text: "I'm honestly obsessed with these. They're the perfect winter leggings—fuzzy and warm on the inside, smooth and chic on the outside, and they don't look bulky at all. I've been wearing them with boots and sweaters nonstop.",
      author: "Ashley Johns",
    },
  ];

  return (
    <div className="review-items-container">
      <div className="slideshow-component slider-mobile-gutter">
        <div className="slideshow banner grid grid--1-col slider slider--everywhere">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="slideshow__slide grid__item grid--1-col slider__slide"
            >
              <div className="review-item review-item--top">
                <div className="review-item__image media media--transparent"></div>
                <div className="review-item__right">
                  <div className="review-item__text">
                    <p>{testimonial.text}</p>
                  </div>
                  <div className="review-item__author-and-stars">
                    <p className="review-item__author">{testimonial.author}</p>
                    <span className="review-item__stars">★★★★★</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

