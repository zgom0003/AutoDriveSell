import "./ContactUs.css";

export default function ContactUsPage() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>

      <div className="contact-info">
        <div className="contact-item">
          <h2>Email</h2>
          <p>support@ads.com</p>
        </div>

        <div className="contact-item">
          <h2>Phone</h2>
          <p>+1 123 456 7890</p>
        </div>

        <div className="contact-item">
          <h2>Location</h2>
          <p>123 Main Street, Melbourne, VIC 3000, Australia</p>
        </div>
      </div>
    </div>
  );
}
