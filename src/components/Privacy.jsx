import { Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

export const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={1}>Privacy Policy</Title>

      <Paragraph>
        At Sherin Huts, we are committed to maintaining the trust and confidence
        of our customers. In this Privacy Policy, we’ve provided detailed
        information on when and why we collect your personal information, how we
        use it, and how we keep it secure.
      </Paragraph>

      <Title level={2}>Information Collection</Title>
      <Paragraph>
        We collect information about you when you place an order for food, make
        a reservation, or use our website or mobile app. Here are the types of
        information we gather:
      </Paragraph>
      <ul>
        <li>
          <Paragraph>
            Name and contact details (including your telephone number, email,
            and address when applicable for delivery or booking purposes).
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Details of your orders and transactions at the restaurant.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Information you enter on our website or mobile app or give us in any
            other way.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Payment information (we process payment information securely and do
            not store credit card details).
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Location data if you permit the app to access your location to
            enhance service delivery.
          </Paragraph>
        </li>
      </ul>

      <Title level={2}>Use of Your Information</Title>
      <Paragraph>
        We use the information you provide to fulfill your order, manage your
        bookings, enhance your user experience, and, if you agree, to contact
        you about other products and services we think may be of interest to
        you.
      </Paragraph>

      <Title level={2}>Data Sharing</Title>
      <Paragraph>
        We do not sell, rent or exchange our customer data with other companies
        and businesses for marketing purposes. However, we may share your
        information with third-party platforms that assist with processing your
        orders, such as payment processors, online booking, and delivery
        services.
      </Paragraph>

      <Title level={2}>Security</Title>
      <Paragraph>
        We take precautions to protect your information. When you submit
        sensitive information via the website or mobile app, your information is
        protected both online and offline.
      </Paragraph>

      <Title level={2}>Your Rights</Title>
      <Paragraph>
        You have the right to request a copy of the personal information we hold
        about you and to ask for it to be corrected or deleted. If you wish to
        raise a complaint on how we have handled your personal data, you can
        contact us to have the matter investigated.
      </Paragraph>

      <Paragraph>
        This policy is effective as of 07/05/2024. We may change this policy
        from time to time by updating this page. You should check this page from
        time to time to ensure that you are happy with any changes.
      </Paragraph>

      <Title level={2}>Children’s Privacy</Title>
      <Paragraph>
        Our services do not address anyone under the age of 13. We do not
        knowingly collect personally identifiable information from children
        under 13. In the case we discover that a child under 13 has provided us
        with personal information, we immediately delete this from our servers.
      </Paragraph>

      <Title level={2}>Consent</Title>
      <Paragraph>
        By using our website or mobile app, you hereby consent to our Privacy
        Policy and agree to its terms.
      </Paragraph>

      <Title level={2}>Contact Us</Title>
      <Paragraph>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us at [your contact information].
      </Paragraph>
    </div>
  );
};
