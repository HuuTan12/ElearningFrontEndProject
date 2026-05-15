import React from "react";
import "../assets/sass/HeroBanner.scss";

const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      {/* YouTube Background */}
      <div className="hero-banner__video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/5tIvKfguZcE?autoplay=1&mute=1&controls=0&loop=1&playlist=5tIvKfguZcE&modestbranding=1&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay + Content */}
      <div className="hero-banner__overlay">
        <div className="hero-banner__content">
          {/* Left - Circle */}
          <div className="hero-banner__left">
            <div className="hero-banner__circle">
              <span className="hero-banner__circle-text">
                CHỌN LỘ TRÌNH CỦA BẠN
              </span>
              <button className="hero-banner__play-btn">
                <i className="fa fa-play" />
              </button>
            </div>
          </div>

          {/* Right - Text */}
          <div className="hero-banner__right">
            <h1 className="hero-banner__title">
              KHỞI ĐẦU
              <br />
              SỰ NGHIỆP
              <br />
              CỦA BẠN
            </h1>
            <p className="hero-banner__subtitle">
              Trở thành lập trình
              <br />
              chuyên nghiệp tại CyberSoft
            </p>
            <div className="hero-banner__buttons">
              <button className="hero-banner__btn hero-banner__btn--primary">
                Xem Khóa học
              </button>
              <button className="hero-banner__btn hero-banner__btn--outline">
                Tư vấn học
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
