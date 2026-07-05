"use client";

import React from "react";
import { Menu, X, Heart, ShoppingBag } from "lucide-react";

interface NavbarProps {
  lang: "en" | "hi";
  setLang: (lang: "en" | "hi") => void;
  wishlistCount: number;
  cartItemsCount: number;
  setIsCartOpen: (open: boolean) => void;
  setActiveCategory: (category: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  openBooking: () => void;
  T: any;
}

export default function Navbar({
  lang,
  setLang,
  wishlistCount,
  cartItemsCount,
  setIsCartOpen,
  setActiveCategory,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  T
}: NavbarProps) {
  return (
    <>
      {/* Top Discount Announcement Promo Banner */}
      <div className="announcement-bar">
        <div className="announcement-text">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline" }}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>{T[lang].announcementPromo}</span>
        </div>
      </div>

      <header className="navbar-wrapper">
        <div className="navbar-container">
          <a href="#home" className="logo-link">
            {/* Elegant SVG Ganesha Outline Logo */}
            <svg viewBox="0 0 100 100" width="45" height="45" fill="none" stroke="#8a1515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M50 12 L55 22 L45 22 Z" strokeWidth="2" fill="#d4af37" />
              <path d="M40 22 L60 22 L50 32 Z" strokeWidth="1.5" />
              <path d="M50 32 Q50 48 50 48" strokeWidth="3" stroke="#d4af37" />
              <path d="M44 38 Q50 41 56 38" stroke="#d4af37" strokeWidth="2" />
              <path d="M50 48 Q40 55 40 68 Q40 78 50 78 Q58 78 58 68 Q58 58 51 54" />
              <path d="M42 35 C28 32 23 48 38 50" />
              <path d="M58 35 C72 32 77 48 62 50" />
              <circle cx="50" cy="78" r="3" fill="#d4af37" stroke="none" />
            </svg>
            <div className="logo-text-wrapper">
              <span className="logo-main-text">{T[lang].heroTitleHi}</span>
              <span className="logo-sub-text">{T[lang].heroTitleSub}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link active">{T[lang].navHome}</a></li>
              <li><a href="#about" className="nav-link">{T[lang].navAbout}</a></li>
              <li><a href="#collection" className="nav-link">{T[lang].navCollection}</a></li>
              <li><a href="#gallery" className="nav-link">{T[lang].navGallery}</a></li>
              <li><a href="#services" className="nav-link">{T[lang].navServices}</a></li>
              <li><a href="#contact" className="nav-link">{T[lang].navContact}</a></li>
            </ul>
          </nav>

          {/* Actions: Switcher, Wishlist & Cart badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button 
              onClick={() => setLang(lang === "en" ? "hi" : "en")} 
              className="lang-switcher-btn"
              aria-label="Switch Language"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {lang === "en" ? "हिन्दी" : "English"}
            </button>

            {/* Wishlist Button */}
            <div className="nav-action-btn-wrapper">
              <button 
                onClick={() => setActiveCategory("all")} 
                style={{ background: "none", border: "none", color: "var(--color-maroon)", cursor: "pointer", display: "flex", alignItems: "center" }}
                aria-label="View Wishlist"
              >
                <Heart size={24} fill={wishlistCount > 0 ? "currentColor" : "none"} />
                {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
              </button>
            </div>

            {/* Shopping Cart Button */}
            <div className="nav-action-btn-wrapper">
              <button 
                onClick={() => setIsCartOpen(true)}
                style={{ background: "none", border: "none", color: "var(--color-maroon)", cursor: "pointer", display: "flex", alignItems: "center" }}
                aria-label="View Shopping Cart"
              >
                <ShoppingBag size={24} />
                {cartItemsCount > 0 && <span className="nav-badge">{cartItemsCount}</span>}
              </button>
            </div>
          </div>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="menu-toggle-btn"
            aria-label="Open navigation menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="mobile-nav-close"
          aria-label="Close navigation menu"
        >
          <X size={28} />
        </button>
        <ul className="mobile-nav-links">
          <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navHome}</a></li>
          <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navAbout}</a></li>
          <li><a href="#collection" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navCollection}</a></li>
          <li><a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navGallery}</a></li>
          <li><a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navServices}</a></li>
          <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link">{T[lang].navContact}</a></li>
        </ul>
        
        {/* Language switcher in mobile drawer */}
        <button 
          onClick={() => {
            setLang(lang === "en" ? "hi" : "en");
            setIsMobileMenuOpen(false);
          }} 
          className="lang-switcher-btn"
          style={{ marginTop: "32px", width: "100%", justifyContent: "center" }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline" }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {lang === "en" ? "हिन्दी (Hindi)" : "English (अंग्रेजी)"}
        </button>

        <button 
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsCartOpen(true);
          }} 
          className="nav-cta-btn mobile-cta-btn"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          <ShoppingBag size={18} />
          {T[lang].cartTitle} ({cartItemsCount})
        </button>
      </div>
    </>
  );
}
