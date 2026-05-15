import React from "react";
import "../assets/sass/Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        {/* Brand */}
        <div className="footer-brand">
          <h2>CyberSoft Academy</h2>
          <p>Học trực tuyến, nâng tầm kỹ năng, mở ra tương lai nghề nghiệp.</p>
        </div>

        {/* Newsletter / Contact Form */}
        <div className="footer-newsletter">
          <h3>Đăng ký tư vấn</h3>
          <form className="newsletter-form">
            <input type="text" placeholder="Họ và tên" required />
            <input type="email" placeholder="Email liên hệ" required />
            <input type="tel" placeholder="Điện thoại liên hệ" />
            <div className="recaptcha">
              <input type="checkbox" id="recaptcha" />{" "}
              <label htmlFor="recaptcha">I'm not a robot</label>
            </div>
            <button type="submit">Đăng ký tư vấn</button>
          </form>
        </div>

        {/* Social / Images */}
        <div className="footer-social">
          <h3>Hình ảnh &amp; Social</h3>
          <div className="social-cards">
            <img src="hinhanhlop8-DN.jpg" alt="Teacher 1" />
            <img src="public/download.jpg" alt="Teacher 2" />
            <img src="public/download (1).jpg" alt="Class" />
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2026 CyberSoft. Học hôm nay, thành công ngày mai.</p>
      </div>
    </footer>
  );
};

export default Footer;