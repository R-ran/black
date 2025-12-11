import Link from "next/link";
import PagesLayout from "../layout-pages";

export default function ShippingDeliveryPage() {
  return (
    <PagesLayout>
      <main className="page-container">
        <div className="page-content">
          <h1>Shipping & Delivery</h1>
          <div className="policy-content">
            <p>
              The time for order delivery is divided into two parts:
            </p>
            <p>
              <strong>Processing time:</strong> Order verification, tailoring,
              quality, check and packaging. All orders are usually sent to our
              manufacturer for dispatch within 72 hours after the order is placed
              and payment is received.
            </p>
            <p>
              <strong>Shipping time:</strong> This refers to the time it takes
              for items to be shipped from our warehouse to the destination.
            </p>

            <h2>USA & Canada</h2>
            <p>
              Standard Secured Shipping & Insurance takes 2-4 Weeks for
              delivery (IF YOUR ITEM IS IN STOCK)
            </p>

            <h2>AUSTRALIA & New Zealand</h2>
            <p>
              Standard Secured Shipping & Insurance takes 2-4 Weeks for
              delivery (IF YOUR ITEM IS IN STOCK)
            </p>

            <h2>U.K & EUROPE</h2>
            <p>
              Standard Secured Shipping & Insurance takes 2-4 Weeks for
              delivery (IF YOUR ITEM IS IN STOCK)
            </p>

            <h2>Others Countries</h2>
            <p>
              Standard Secured Shipping & Insurance takes 2-5 Weeks for
              delivery (IF YOUR ITEM IS IN STOCK)
            </p>

            <h2>Insured Shipping</h2>
            <p>
              If item is lost in delivery or arrives damaged, we will send you
              a replacement item with no extra cost to you provided sufficient
              proof is provided.
            </p>

            <h2>Priority Insured Shipping</h2>
            <p>
              Your Delivery is put at the top of our Orders List each day which
              we send to our manufacturers. Depending on the order volume we're
              receiving, expect time may remain similar/equal to Standard
              Shipping times. Your item is also Insured.
            </p>

            <p>
              <strong>
                **Some product might shipped out separately and arrive on
                difference time because we have warehouse from difference
                location.**
              </strong>
            </p>

            <h2>Tracking Information</h2>
            <p>
              Tracking Numbers frequently take a few days to a week to update
              and display correct tracking information. Please use a 3rd party
              website such as{" "}
              <a
                href="https://17track.net"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                https://17track.net
              </a>{" "}
              to track your order.
            </p>

            <h2>Notes on Delays</h2>
            <p>
              Note that for some countries, shipping may take longer than
              estimated.
            </p>
            <p>
              Depending volume of orders we are receiving, your shipment may take
              longer than usual. Rest assured, we are working hard to get
              everything out ASAP. We know it may be frustrating to wait longer
              than expected for your order, but the one thing we don't want to
              do is sacrifice is the quality of our products. Thanks for
              understanding.
            </p>

            <h2>Changes Request</h2>
            <p>
              If you need to make changes to your order, please email us within
              24 hours of placing your order at{" "}
              <a href="mailto:support@tinymintstore.com" className="contact-link">
                support@tinymintstore.com
              </a>{" "}
              and we will be happy to make the required changes. If your order
              has already been shipped we will not be able to change it
              unfortunately. Please make sure to check you have selected the
              right size and color to avoid disappointment.
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

