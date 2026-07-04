"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

interface MurtiItem {
  id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6";
  category: "all" | "eco" | "small" | "medium" | "large";
  image: string;
}

interface CollectionProps {
  lang: "en" | "hi";
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredMurtis: MurtiItem[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6") => void;
  T: any;
}

export default function Collection({
  lang,
  activeCategory,
  setActiveCategory,
  filteredMurtis,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  T
}: CollectionProps) {
  return (
    <section id="collection" className="collection-section">
      <div className="section-container">
        <span className="section-subtitle">{T[lang].collectionSub}</span>
        <h2 className="section-title">{T[lang].collectionTitle}</h2>

        {/* Filtering Chips */}
        <div className="filter-container">
          <button 
            onClick={() => setActiveCategory("all")} 
            className={`filter-chip ${activeCategory === "all" ? "active" : ""}`}
          >
            {T[lang].filterAll}
          </button>
          <button 
            onClick={() => setActiveCategory("eco")} 
            className={`filter-chip ${activeCategory === "eco" ? "active" : ""}`}
          >
            {T[lang].filterEco}
          </button>
          <button 
            onClick={() => setActiveCategory("small")} 
            className={`filter-chip ${activeCategory === "small" ? "active" : ""}`}
          >
            {T[lang].filterSmall}
          </button>
          <button 
            onClick={() => setActiveCategory("medium")} 
            className={`filter-chip ${activeCategory === "medium" ? "active" : ""}`}
          >
            {T[lang].filterMedium}
          </button>
          <button 
            onClick={() => setActiveCategory("large")} 
            className={`filter-chip ${activeCategory === "large" ? "active" : ""}`}
          >
            {T[lang].filterLarge}
          </button>
        </div>

        {/* Collection Grid */}
        <div className="collection-grid">
          {filteredMurtis.map((item) => {
            const details = T[lang].products[item.id];
            const isWishlisted = wishlist.includes(item.id);
            return (
              <div key={item.id} className="collection-card" style={{ position: "relative" }}>
                {/* Wishlist Heart Button */}
                <button 
                  onClick={() => onToggleWishlist(item.id)} 
                  className={`wishlist-heart-btn ${isWishlisted ? "active" : ""}`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                <div className="card-img-wrapper">
                  {details.badge && <span className="card-badge">{details.badge}</span>}
                  <Image 
                    src={item.image} 
                    alt={details.title} 
                    fill
                    className="card-image"
                  />
                </div>
                <div className="card-info">
                  <h3 className="card-title">{details.title}</h3>
                  <div className="card-details">
                    <span className="card-size">{T[lang].cardSize}: {details.size}</span>
                    <span className="card-price">{details.price}</span>
                  </div>
                  <button 
                    onClick={() => onAddToCart(item.id)}
                    className="form-submit-btn"
                    style={{ padding: "10px 16px", fontSize: "0.95rem", marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                  >
                    <ShoppingBag size={16} />
                    {T[lang].cardBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="collection-center-cta">
          <a href="#contact" className="btn-secondary">{T[lang].customOrderBtn}</a>
        </div>
      </div>
    </section>
  );
}
