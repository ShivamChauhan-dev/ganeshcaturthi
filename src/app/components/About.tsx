"use client";

import React from "react";
import Image from "next/image";

interface AboutProps {
  lang: "en" | "hi";
  T: any;
}

export default function About({ lang, T }: AboutProps) {
  return (
    <section id="about" className="about-section section-container">
      <div className="about-grid">
        <div className="about-text-content">
          <span className="about-subtitle">{T[lang].aboutSub}</span>
          <h2 className="about-title">{T[lang].aboutTitle}</h2>
          <p className="about-description">
            {T[lang].aboutDesc}
          </p>
          <a href="#collection" className="btn-primary">{T[lang].heroCtaSecondary}</a>
        </div>

        <div className="about-img-container">
          <div className="about-img-frame">
            <div className="about-img-inner">
              <Image 
                src="/about_ganesha.png" 
                alt="Ganesha Idol inside traditional arch frame" 
                fill
                className="about-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
