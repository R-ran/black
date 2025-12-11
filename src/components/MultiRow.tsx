export default function MultiRow() {
  const sections = [
    {
      title: "Cozy, chic, and snatched — all winter long",
      content: (
        <>
          <p>WINTER ESSENTIAL</p>
          <h2>Cozy, chic, and snatched — all winter long</h2>
          <p>
            <br />
            Meet the fleece-lined shaping leggings that do it all:
            <br />
            they keep you warm, smooth, snatched at the waist, and subtly lifted
            in the back —
            <br />
            while still looking like a sleek second skin, not bulky winter pants.
            <br />
          </p>
          <h3>4 inclusive shades, XS–3XL</h3>
          <ul>
            <li>
              4 easy, wearable shades designed to flatter a wide range of skin
              tones
            </li>
            <li>
              XS–3XL sizing, thoughtfully cut to fit and flatter real bodies —
              curves, hips, and all
            </li>
          </ul>
        </>
      ),
      reverse: true,
      image: "https://tinymintstore.com/cdn/shop/files/12_10_2.gif?v=1765315732&width=1500",
    },
    {
      title: "One Seam, Zero Lines",
      content: (
        <>
          <h2>One Seam, Zero Lines</h2>
          <p>
            The kind of legging that makes your legs look longer the second you
            pull it on.
          </p>
          <p>
            <br />
            A single clean seam runs from waist to ankle, lying flat against your
            skin so there are
            <br />
            no choppy panels and no bulky stitch lines showing through. Under
            sweaters, dresses, or
            <br />
            even thin tops, you get smooth, uninterrupted curves that disappear
            under your outfit —
            <br />
            so everything you wear looks sharper, sleewer, and more put-together.
            <br />
          </p>
        </>
      ),
      reverse: false,
      image: "/seam-image.avif",
    },
    {
      title: "Snatched Waist, Lifted Booty — Not Squeezed",
      content: (
        <>
          <h2>Snatched Waist, Lifted Booty — Not Squeezed</h2>
          <p>The waistband is where the magic happens.</p>
          <p>
            <br />
            Our high-compression waistband gently pulls in your midsection for a
            defined, snatched
            <br />
            waistline, while the sculpting knit subtly lifts and shapes your butt
            for a naturally
            <br />
            perkier, more rounded look. No digging, no pinching, no rolling — just
            a smoother tummy
            <br />
            and a lifted silhouette from every angle.
            <br />
          </p>
          <p>
            <br />
            It feels like shapewear designed for real life: clean lines, secure
            support, and all-day
            <br />
            comfort you can actually breathe, walk, sit, and live in.
            <br />
          </p>
          <p>
            <br />
            You don&apos;t have to choose between &quot;held in,&quot;
            &quot;lifted,&quot; and &quot;comfortable.&quot; With these, you get
            all three.
            <br />
          </p>
        </>
      ),
      reverse: true,
      image: "https://tinymintstore.com/cdn/shop/files/2.gif?v=1764179779&width=1500",
    },
    {
      title: "Warm, Not Bulky",
      content: (
        <>
          <h2>Warm, Not Bulky</h2>
          <p>Soft, quiet warmth on the inside; clean, sleek lines on the outside.</p>
          <p>
            <br />
            A baby-soft fleece lining wraps your legs in cozy comfort, while the
            smooth, high-stretch
            <br />
            outer knit keeps bulk low so your legs still look slim and elongated.
            From chilly coffee
            <br />
            runs and school drop-offs to office days, date nights, and couch time,
            you stay wrapped
            <br />
            in warmth while your coats, boots, and everyday outfits still look
            streamlined and
            <br />
            photo-ready.
            <br />
          </p>
          <p>
            <br />
            These are the leggings you reach for on the coldest days — not just
            because they keep you
            <br />
            warm, but because they make every winter outfit look better, too.
            <br />
          </p>
        </>
      ),
      reverse: false,
      image: "https://tinymintstore.com/cdn/shop/files/12_10.gif?v=1765315736&width=1500",
    },
  ];

  return (
    <div className="multirow gradient color-background-1 content-for-grouping">
      <div className="multirow__inner page-width">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`image-with-text image-with-text--mobile-normal isolate collapse-padding same-colors ${
              section.image ? (section.reverse ? "image-with-text__grid--reverse" : "") : ""
            }`}
          >
            {section.image ? (
              <div className={`image-with-text__grid grid grid--gapless grid--1-col grid--2-col-tablet ${
                section.reverse ? "image-with-text__grid--reverse" : ""
              }`}>
                {section.reverse ? (
                  <>
                    <div className="image-with-text__media-item image-with-text__media-item--medium image-with-text__media-item--middle grid__item">
                      <div className="image-with-text__media image-with-text__media--medium gradient color-background-1 global-media-settings media">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="multirow-image"
                        />
                      </div>
                    </div>
                    <div className="image-with-text__text-item grid__item">
                      <div className="image-with-text__content image-with-text__content--middle image-with-text__content--desktop-left image-with-text__content--mobile-left image-with-text__content--medium content-container multirow-content-wider">
                        <div className="image-with-text__text rte body multirow-text-smaller">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="image-with-text__text-item grid__item">
                      <div className="image-with-text__content image-with-text__content--middle image-with-text__content--desktop-left image-with-text__content--mobile-left image-with-text__content--medium content-container multirow-content-wider">
                        <div className="image-with-text__text rte body multirow-text-smaller">
                          {section.content}
                        </div>
                      </div>
                    </div>
                    <div className="image-with-text__media-item image-with-text__media-item--medium image-with-text__media-item--middle grid__item">
                      <div className="image-with-text__media image-with-text__media--medium gradient color-background-1 global-media-settings media">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="multirow-image"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="image-with-text__grid grid grid--gapless grid--1-col grid--2-col-tablet">
                <div className="image-with-text__media-item image-with-text__media-item--medium image-with-text__media-item--middle grid__item">
                  <div className="image-with-text__media image-with-text__media--medium gradient color-background-1 global-media-settings media"></div>
                </div>
                <div className="image-with-text__text-item grid__item">
                  <div className="image-with-text__content image-with-text__content--middle image-with-text__content--desktop-left image-with-text__content--mobile-left image-with-text__content--medium content-container">
                    <div className="image-with-text__text rte body">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

