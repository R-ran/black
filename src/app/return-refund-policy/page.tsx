import Link from "next/link";
import PagesLayout from "../layout-pages";

export default function ReturnRefundPolicyPage() {
  return (
    <PagesLayout>
      <main className="page-container">
        <div className="page-content">
          <h1>Return & Refund Policy</h1>
          <div className="policy-content">
            <h2>Standard Returns Policy</h2>
            <p>
              You can return items within 30 days of receipt for a refund, free
              of charge. However, shipping charges are not refunded. Please
              note that this policy may vary during promotional periods, so we
              advise you to check the terms & conditions for specific
              promotions.
            </p>
            <p>
              For products purchased from other authorized retailers, please
              contact the retailer directly for return and refund inquiries.
            </p>

            <h2>Returns Process (excluding Black Friday and other Promotion)</h2>
            <p>
              To initiate a return, please contact us at{" "}
              <a href="mailto:support@tinymintstore.com" className="contact-link">
                support@tinymintstore.com
              </a>{" "}
              to request a return label. Please include your order number and
              specify the item(s) you wish to return.
            </p>

            <h2>Damaged Items</h2>
            <p>
              If you receive a damaged item, please send a photo of the damaged
              item along with your order number to{" "}
              <a href="mailto:support@tinymintstore.com" className="contact-link">
                support@tinymintstore.com
              </a>{" "}
              with the subject line "DAMAGED" within 14 days of receipt. We will
              process your claim promptly.
            </p>

            <h2>Items not received</h2>
            <p>
              If you have not received your full order, please contact us at{" "}
              <a href="mailto:support@tinymintstore.com" className="contact-link">
                support@tinymintstore.com
              </a>{" "}
              with the subject line "MISSING ITEM" along with your order number.
              We will investigate and resolve the issue as quickly as possible.
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

