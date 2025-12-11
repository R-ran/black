"use client";

import { useState } from "react";
import Link from "next/link";
import PagesLayout from "../layout-pages";

export default function PrivacyChoicesPage() {
  const [shareAccountData, setShareAccountData] = useState(false);
  const [email, setEmail] = useState("");

  const handleOptOut = () => {
    // Handle opt-out logic here
    console.log("Opt out clicked", { shareAccountData, email });
    // You can add API call or other logic here
  };

  return (
    <PagesLayout>
      <main className="page-container">
        <div className="page-content">
          <h1>Your privacy choices</h1>
          <div className="policy-content">
            <p>
              We collect personal information from your interactions with us and
              our website (including cookies), and we may share this information
              with third parties, including advertising partners. This may be
              considered a "sale" or "sharing" of personal information or
              "targeted advertising" under U.S. state privacy laws. We use this
              information to show you relevant ads and to measure how effective
              our ads are. You can learn more in our{" "}
              <Link href="/privacy-policy" className="contact-link">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              Under U.S. state privacy laws, you may have the right to opt out
              of our sharing of personal information for targeted advertising.
              To opt out, please follow the instructions below.
            </p>
            <p>
              If you visit our website with the Global Privacy Control (GPC)
              opt-out preference signal enabled, we will treat this as a request
              to opt out of activities that we consider a "sale" or "sharing" of
              personal information or "targeted advertising" for that device
              and browser.
            </p>
            <p>
              Clicking "opt out" below will opt out the browser on the current
              device from sharing personal data. If you select the checkbox and
              enter your email address, we will also opt out the related customer
              account.
            </p>

            <div className="privacy-choices-form">
              <div className="privacy-checkbox-wrapper">
                <label className="privacy-checkbox-label">
                  <input
                    type="checkbox"
                    checked={shareAccountData}
                    onChange={(e) => setShareAccountData(e.target.checked)}
                    className="privacy-checkbox"
                  />
                  <span>Don't share data from my account (optional)</span>
                </label>
              </div>

              {shareAccountData && (
                <div className="privacy-email-wrapper">
                  <label htmlFor="privacy-email" className="privacy-email-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="privacy-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="privacy-email-input"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleOptOut}
                className="privacy-opt-out-button"
              >
                Opt out
              </button>
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
