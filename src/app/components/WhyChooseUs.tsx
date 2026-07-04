"use client";

import React from "react";
import { Award, Leaf, Truck, Heart } from "lucide-react";

interface WhyChooseUsProps {
  lang: "en" | "hi";
  T: any;
}

export default function WhyChooseUs({ lang, T }: WhyChooseUsProps) {
  return (
    <section className="why-section section-container">
      <span className="section-subtitle">{T[lang].whySub}</span>
      <h2 className="section-title">{T[lang].whyTitle}</h2>

      <div className="why-grid">
        <div className="why-card">
          <div className="why-icon-box">
            <Award size={36} />
          </div>
          <h3 className="why-card-title">{T[lang].whyQualTitle}</h3>
          <p className="why-card-desc">
            {T[lang].whyQualDesc}
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">
            <Leaf size={36} />
          </div>
          <h3 className="why-card-title">{T[lang].whyEcoTitle}</h3>
          <p className="why-card-desc">
            {T[lang].whyEcoDesc}
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">
            <Truck size={36} />
          </div>
          <h3 className="why-card-title">{T[lang].whyDelivTitle}</h3>
          <p className="why-card-desc">
            {T[lang].whyDelivDesc}
          </p>
        </div>

        <div className="why-card">
          <div className="why-icon-box">
            <Heart size={36} />
          </div>
          <h3 className="why-card-title">{T[lang].whyPriceTitle}</h3>
          <p className="why-card-desc">
            {T[lang].whyPriceDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
