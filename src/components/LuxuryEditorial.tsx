import Image from "next/image";

export default function LuxuryEditorial() {
  return (
    <div className="lp-original-section">
      <div className="lp-original-layout">
        {/* 左侧文案 */}
        <div className="lp-original-copy">
          <div className="lp-original-copy-label">THE ORIGINAL, NOT A DUPE</div>
          <h2 className="lp-original-copy-title">
            Don&apos;t Settle for Flimsy Lookalikes
          </h2>

          <div className="lp-original-copy-body">
            <p>
              This is the original fleece-lined shaping legging with a built-in
              waist-defining band — made to keep you warm, supported, and
              smoothed in all the right places.
            </p>
            <p>
              Over 200,000 customers trust our fit. Dupes may look similar on
              your screen, but they cut corners on fabric quality, thoughtful
              shaping, and durable construction — so they never feel as soft,
              sculpt as smoothly, or last as long as the real thing.
            </p>
          </div>
        </div>

        {/* 右侧 4 个卖点 */}
        <div className="lp-original-features">
          <div className="lp-feature-label">
            Here&apos;s what makes ours different:
          </div>

          <div className="lp-feature-list">
            <div className="lp-feature-item">
              <div className="lp-feature-icon">
                <Image
                  src="/yuan1.avif"
                  alt="Smoothing high-rise waistband"
                  width={80}
                  height={80}
                  className="lp-feature-icon-img"
                  unoptimized={true}
                />
              </div>
              <div className="lp-feature-text">
                <p className="lp-feature-text-title">
                  Smoothing high-rise waistband
                </p>
                <p className="lp-feature-text-body">
                  A smoothing high-rise waistband that defines your waist and
                  lies flat under clothes.
                </p>
              </div>
            </div>

            <div className="lp-feature-item">
              <div className="lp-feature-icon">
                <Image
                  src="/yuan2.avif"
                  alt="Cloud-soft fleece lining"
                  width={80}
                  height={80}
                  className="lp-feature-icon-img"
                  unoptimized={true}
                />
              </div>
              <div className="lp-feature-text">
                <p className="lp-feature-text-title">Cloud-soft fleece lining</p>
                <p className="lp-feature-text-body">
                  Cloud-soft fleece lining that keeps you cozy without the bulk.
                </p>
              </div>
            </div>

            <div className="lp-feature-item">
              <div className="lp-feature-icon">
                <Image
                  src="/yuan3.avif"
                  alt="Gentle leg sculpting"
                  width={80}
                  height={80}
                  className="lp-feature-icon-img"
                  unoptimized={true}
                />
              </div>
              <div className="lp-feature-text">
                <p className="lp-feature-text-title">Gentle leg sculpting</p>
                <p className="lp-feature-text-body">
                  Gentle leg sculpting that hugs without squeezing.
                </p>
              </div>
            </div>

            <div className="lp-feature-item">
              <div className="lp-feature-icon">
                <Image
                  src="/yuan4.avif"
                  alt="Snag-resistant, durable fabric"
                  width={80}
                  height={80}
                  className="lp-feature-icon-img"
                  unoptimized={true}
                />
              </div>
              <div className="lp-feature-text">
                <p className="lp-feature-text-title">
                  Snag-resistant, durable fabric
                </p>
                <p className="lp-feature-text-body">
                  Snag-resistant, durable fabric that holds up to everyday wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

