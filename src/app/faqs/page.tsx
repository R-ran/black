import Link from "next/link";
import PagesLayout from "../layout-pages";

export default function FAQsPage() {
  const faqs = [
    {
      question: "DO I NEED TO HAVE AN ACCOUNT TO ORDER?",
      answer: (
        <>
          No, you can also place an order as a guest. But, there are some perks
          if you have an account with us:
          <ul>
            <li>Quick checkout process</li>
            <li>
              Easily view your order status and order history
            </li>
            <li>
              Receive updates detailing our new releases and special promotions
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
      answer:
        "We accept all major credit cards (VISA, Mastercard, Discover, AMEX) and PayPal payments.",
    },
    {
      question: "HOW SECURE IS MY ONLINE ORDER?",
      answer:
        "When purchasing online using your credit card, all of your information is entered into a SSL secure web page. Your information is then SSL-encrypted and sent directly to our credit card provider's network, where your card and transaction is authorized and approved. Your credit card information is not stored on our servers.",
    },
    {
      question: "ARE THERE ANY EXCHANGE RATES?",
      answer:
        "All of our transactions are based in US Dollars. If your credit card is based in another currency, your order total will be calculated in accordance with the daily exchange rate of the date your card issuer processes the transaction.",
    },
    {
      question: "HOW DO I SET MY SHIPPING ADDRESS?",
      answer:
        'Since our website and service are based on English, all the information that you typed in is required to be English input method, including punctuations. If certain letters of your address contain Non-English letters, you are advised to use the similar English ones instead. For example, you may change letter "？" to "c".',
    },
    {
      question: "CAN I CHANGE MY SHIPPING ADDRESS AFTER PLACING AN ORDER?",
      answer:
        "Please be advised that your shipping address cannot be revised after the order has been processed or shipped. Kindly update your shipping address to your residential address instead of your vacational address as we do not know how long the destination's customs department will have the package on hold.",
    },
    {
      question: "HOW LONG DOES SHIPPING TAKE & HOW CAN I TRACK MY PACKAGE?",
      answer:
        "The delivery time is based on the shipping option that you have chosen. Once the order has shipped, we will email your tracking number and tracking website. We are not responsible for delays caused by the customs department in your country.",
    },
    {
      question: "WHAT DO I DO IF I HAVE MISSING ITEMS IN MY ORDER?",
      answer: (
        <>
          If something is still missing, please contact us immediately at{" "}
          <a href="mailto:support@tinymintstore.com" className="contact-link">
            support@tinymintstore.com
          </a>
        </>
      ),
    },
  ];

  return (
    <PagesLayout>
      <main className="page-container">
        <div className="page-content">
          <h1>FAQS</h1>
          <div className="faq-section">
            <ol className="faq-list">
              {faqs.map((faq, index) => (
                <li key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <div className="faq-answer">
                    {typeof faq.answer === "string" ? (
                      <p>{faq.answer}</p>
                    ) : (
                      faq.answer
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="faq-contact">
            <p>
              IF YOU STILL HAVE ANY QUESTION, PLEASE CONTACT US DIRECTLY AT
              EMAIL:{" "}
              <a href="mailto:support@tinymintstore.com" className="contact-link">
                support@tinymintstore.com
              </a>
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

