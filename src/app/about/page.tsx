import Link from "next/link";
import PagesLayout from "../layout-pages";

export default function AboutPage() {
  return (
    <PagesLayout>
      <main className="page-container">
        <div className="page-content">
          <h1>About US</h1>
          
          <div className="about-content">
            <p>
              Tinymintstore is a new international B2C team, we aims to provide
              the latest Various types of products for The United States.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to simplify the online shopping process and provide
              a stress-free shopping experience.
            </p>

            <h2>To our customers, we promise:</h2>
            <ul>
              <li>
                <strong>Low Prices:</strong> We work with manufacturers directly.
                We cut out any unnecessary costs to give you the no-frills prices
                you see!
              </li>
              <li>
                <strong>Quality Assurance:</strong> What you see is what you get!
                We manually quality check everything that we sell before it's
                being packed and shipped to you!
              </li>
              <li>
                <strong>Privacy:</strong> We implement a strict policy on
                controlling and limiting access to your personal information.
              </li>
            </ul>

            <h2>Best price and Quality products</h2>
            <p>
              We work directly with manufacturers and maintain our own warehouses
              to cut out unnecessary costs. This direct-to-customer model allows
              us to offer the best prices while maintaining high quality
              standards. Every product is carefully inspected before shipping to
              ensure you receive exactly what you ordered.
            </p>

            <h2>Payment Security and Privacy (PayPal and SSL Certificate)</h2>
            <p>
              Your security and privacy are our top priorities. We use SSL
              encryption to protect your data during transmission and secure
              electronic vaults to store sensitive information. We accept PayPal
              as a trusted payment gateway, ensuring your financial information is
              handled securely. We do not share your personal data with third
              parties, and we implement strict policies to control and limit
              access to your information.
            </p>
          </div>

          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </main>
    </PagesLayout>
  );
}

