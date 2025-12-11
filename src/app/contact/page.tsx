import Link from "next/link";
import PagesLayout from "../layout-pages";

export default function ContactPage() {
  return (
    <PagesLayout>
      <main className="page-container">
        <div className="page-content">
          <h1>Contact Us</h1>
          
          <div className="contact-content">
            <div className="contact-section">
              <h2>Order Status:</h2>
              <p>
                Please visit{" "}
                <a
                  href="https://www.17track.net/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  https://www.17track.net/en
                </a>{" "}
                to track it online.
              </p>
            </div>

            <div className="contact-section">
              <h2>Other Questions:</h2>
              <p>
                You might find the answer to your question on our FAQ Help
                Center, Or leave your message directly in this contact form!
              </p>
              <p>
                Our office hours are 9 am-5 pm EST - we respond to most emails
                within a business day, but if you don't get a response from us,
                please check your spam bin!
              </p>
              <p>
                Be patient my friend, we are doing our best to get back to you
                as fast as possible! Please do not send multiple emails as this
                could delay our response time.
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@tinymintstore.com" className="contact-link">
                  support@tinymintstore.com
                </a>
              </p>
            </div>
          </div>

          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </main>
    </PagesLayout>
  );
}

