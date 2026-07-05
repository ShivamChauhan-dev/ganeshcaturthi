"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, X, MessageCircle } from "lucide-react";

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
  // Modal view details state
  const [selectedMurtiId, setSelectedMurtiId] = useState<"m1" | "m2" | "m3" | "m4" | "m5" | "m6" | null>(null);

  const openDetails = (id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6") => {
    setSelectedMurtiId(id);
  };

  const closeDetails = () => {
    setSelectedMurtiId(null);
  };

  const selectedMurti = filteredMurtis.find(m => m.id === selectedMurtiId);
  const selectedDetails = selectedMurtiId ? T[lang].products[selectedMurtiId] : null;

  // Generate WhatsApp Order link
  const getWhatsAppLink = (title: string, size: string) => {
    const text = lang === "hi"
      ? `नमस्ते श्री गणेश मूर्ति भंडार, मैं निम्नलिखित इको-फ्रेंडली गणपति मूर्ति बुक करना चाहता हूँ:\nनाम: ${title}\nआकार: ${size}\nकृपया उपलब्धता और बुकिंग की जानकारी साझा करें।`
      : `Hello Shree Ganesh Murti Bhandar, I would like to book the following Ganesha idol:\nName: ${title}\nSize: ${size}\nPlease share booking availability and details.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
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

                  <div className="card-img-wrapper" onClick={() => openDetails(item.id)} style={{ cursor: "pointer" }}>
                    {details.badge && <span className="card-badge">{details.badge}</span>}
                    <Image 
                      src={item.image} 
                      alt={details.title} 
                      fill
                      className="card-image"
                    />
                  </div>
                  <div className="card-info">
                    <h3 className="card-title" onClick={() => openDetails(item.id)} style={{ cursor: "pointer" }}>{details.title}</h3>
                    <div className="card-details">
                      <span className="card-size">{T[lang].cardSize}: {details.size}</span>
                      <span className="card-price">{details.price}</span>
                    </div>
                    
                    <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                      <button 
                        onClick={() => onAddToCart(item.id)}
                        className="form-submit-btn"
                        style={{ padding: "10px 16px", fontSize: "0.9rem", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        <ShoppingBag size={14} />
                        {T[lang].cardBtn}
                      </button>
                      <a 
                        href={getWhatsAppLink(details.title, details.size)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-btn"
                        style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }}
                        aria-label="Order on WhatsApp"
                      >
                        <MessageCircle size={16} fill="currentColor" />
                      </a>
                    </div>
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

      {/* DETAILED PRODUCT OVERLAY MODAL */}
      {selectedMurtiId && selectedMurti && selectedDetails && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "750px" }}>
            <div className="modal-header">
              <h3 className="modal-title">{T[lang].productDetailTitle}</h3>
              <button onClick={closeDetails} className="modal-close-btn" aria-label="Close modal">
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: "24px" }}>
              <div className="detail-modal-grid">
                <div className="detail-modal-image-box">
                  <Image src={selectedMurti.image} alt={selectedDetails.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="detail-modal-info">
                  <h4 className="detail-modal-title">{selectedDetails.title}</h4>
                  
                  <div className="detail-badge-group">
                    {selectedDetails.badge && <span className="detail-badge-item">{selectedDetails.badge}</span>}
                    <span className="detail-badge-item" style={{ backgroundColor: "rgba(76, 175, 80, 0.1)", border: "1px solid #4caf50", color: "#388e3c" }}>
                      {T[lang].badgeEcoCertified}
                    </span>
                  </div>

                  <div className="detail-modal-price">
                    <span>{selectedDetails.price}</span>
                    <span style={{ fontSize: "0.85rem", color: "#4caf50", fontWeight: "600" }}>{T[lang].inStock}</span>
                  </div>

                  {/* Size Comparison Guide */}
                  <div className="detail-guide-box">
                    <h5 className="detail-guide-title">{T[lang].sizeGuideTitle}</h5>
                    <p className="detail-guide-text">
                      <strong>{T[lang].cardSize}: {selectedDetails.size}</strong>. {selectedDetails.sizeGuideDesc}
                    </p>
                  </div>

                  {/* Eco-Friendly Proof */}
                  <div className="detail-guide-box" style={{ borderTop: "none", paddingTop: "0" }}>
                    <h5 className="detail-guide-title">{T[lang].ecoProofTitle}</h5>
                    <p className="detail-guide-text">
                      {T[lang].ecoProofDesc}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                    <button 
                      onClick={() => {
                        onAddToCart(selectedMurtiId);
                        closeDetails();
                      }}
                      className="form-submit-btn"
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                    >
                      <ShoppingBag size={18} />
                      {T[lang].cardBtn}
                    </button>
                    
                    <a 
                      href={getWhatsAppLink(selectedDetails.title, selectedDetails.size)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-btn"
                      style={{ flex: 1.2, gap: "8px" }}
                    >
                      <MessageCircle size={18} fill="currentColor" />
                      {T[lang].orderOnWhatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
