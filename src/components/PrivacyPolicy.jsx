import React from "react";

function PrivacyPolicy() {
  return (
    <section className="bg-gray-50 text-gray-800 py-10 px-5">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>

        <p className="mb-6">
          At <strong>Builder Reviews</strong>, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard your data when you visit or use our website.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-6">
          We may collect the following types of information:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <strong>Personal Information:</strong> Includes your name, email address, and
            any other information you provide when signing up for our newsletter, leaving
            a review, or contacting us.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with our
            website, such as your IP address, browser type, and pages visited.
          </li>
          <li>
            <strong>Cookies:</strong> Data collected through cookies to enhance your user
            experience. Learn more in our Cookies section.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-6">
          The information we collect is used to:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Provide and improve our services.</li>
          <li>Send newsletters, updates, or promotional materials.</li>
          <li>Analyze user behavior to enhance website functionality.</li>
          <li>Respond to your inquiries and feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <p className="mb-6">
          We do not sell or rent your personal information to third parties. However, we
          may share your information with:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <strong>Service Providers:</strong> Third-party vendors that assist us in
            operating our website or delivering services.
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law or to protect our
            legal rights.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
        <p className="mb-6">
          Cookies are small text files stored on your device that help us analyze website
          traffic and enhance user experience. You can disable cookies in your browser
          settings, but this may affect website functionality.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p className="mb-6">
          We implement reasonable security measures to protect your personal information.
          However, no method of transmission over the internet is entirely secure, and we
          cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p className="mb-6">
          You have the right to:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Access the personal data we hold about you.</li>
          <li>Request corrections to your data.</li>
          <li>Request the deletion of your personal information.</li>
          <li>
            Opt out of receiving promotional communications by clicking "unsubscribe" in
            our emails.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
        <p className="mb-6">
          Our website may contain links to third-party websites. We are not responsible
          for the privacy practices or content of these sites. Please review their
          privacy policies before providing your data.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. Changes will be posted on
          this page with the updated date.
        </p>

        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p className="mb-6">
          If you have any questions about this Privacy Policy or how we handle your
          personal information, please contact us at:
        </p>
        <p className="mb-2">
          <strong>Email:</strong> support@builderreviews.com
        </p>
        <p className="mb-2">
          <strong>Address:</strong> 123 Builder Lane, Construction City, CC 12345
        </p>

        <p className="text-center mt-10">
          <em>Last Updated: February 15, 2025</em>
        </p>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
