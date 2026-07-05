"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

interface ReviewsProps {
  lang: "en" | "hi";
  T: any;
}

export default function Reviews({ lang, T }: ReviewsProps) {
  const reviews = T[lang].reviewsList;

  return (
    <section className="reviews-section section-container">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span className="section-subtitle">{T[lang].reviewsSub}</span>
        <h2 className="section-title" style={{ marginTop: "10px" }}>{T[lang].reviewsTitle}</h2>
      </div>

      <div className="reviews-grid">
        {reviews.map((rev: any, idx: number) => (
          <div key={idx} className="review-card">
            <div className="review-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            
            <p className="review-text">"{rev.text}"</p>
            
            <div className="review-user">
              <div className="review-avatar">
                {rev.name.charAt(0)}
              </div>
              <div className="review-meta">
                <h4 className="review-name">{rev.name}</h4>
                <p className="review-loc">{rev.location}</p>
                <div className="verified-badge">
                  <CheckCircle2 size={12} fill="currentColor" style={{ color: "#4caf50" }} />
                  <span>{T[lang].verifiedPurchaser}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
