"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface HeroProps {
  lang: "en" | "hi";
  isMounted: boolean;
  onOpenBooking: () => void;
  T: any;
}

export default function Hero({
  lang,
  isMounted,
  onOpenBooking,
  T
}: HeroProps) {
  return (
    <section id="home" className="hero-section">
      {/* Floating Marigold Petals Animation */}
      <div className="hero-bg-flowers">
        {isMounted && Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className="hero-flower-petal"
            style={{
              left: `${Math.random() * 95}%`,
              width: `${12 + Math.random() * 20}px`,
              height: `${12 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 10}s`,
              backgroundColor: i % 2 === 0 ? "#ff9800" : "#ffc107",
              borderRadius: "50% 0 50% 50%",
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      <div className="hero-grid">
        <div className="hero-content">
          <span className="hero-badge">
            <Sparkles size={14} className="mr-1" style={{ color: "var(--color-gold)", display: "inline" }} /> {T[lang].heroBadge}
          </span>
          <h1 className="hero-title-hi">{T[lang].heroTitleHi}<br />{T[lang].heroTitleSub}</h1>
          <h2 className="hero-title-en">{T[lang].heroTitleEn}</h2>
          <p className="hero-description">
            {T[lang].heroDesc}
          </p>
          <div className="hero-cta-group">
            <button onClick={onOpenBooking} className="btn-primary">{T[lang].heroCtaPrimary}</button>
            <a href="#collection" className="btn-secondary">{T[lang].heroCtaSecondary}</a>
          </div>
        </div>

        <div className="hero-image-container">
          {/* Empty placeholder to let the background Ganesha outline from hero_bg show through cleanly */}
        </div>
      </div>
    </section>
  );
}
