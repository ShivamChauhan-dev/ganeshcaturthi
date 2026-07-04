"use client";

import React from "react";
import { Phone, MapPin, MessageCircle } from "lucide-react";

interface FooterProps {
  lang: "en" | "hi";
  T: any;
}

export default function Footer({ lang, T }: FooterProps) {
  return (
    <footer id="contact" className="footer">
      <div className="section-container" style={{ padding: "0 24px" }}>
        <div className="footer-grid">
          <div className="footer-info">
            <div className="footer-logo">
              <svg viewBox="0 0 100 100" width="40" height="40" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 12 L55 22 L45 22 Z" strokeWidth="2" fill="#d4af37" />
                <path d="M40 22 L60 22 L50 32 Z" strokeWidth="1.5" />
                <path d="M50 32 Q50 48 50 48" strokeWidth="3" stroke="#fff" />
                <path d="M50 48 Q40 55 40 68 Q40 78 50 78 Q58 78 58 68 Q58 58 51 54" />
                <circle cx="50" cy="78" r="3" fill="#fff" stroke="none" />
              </svg>
              <span className="footer-logo-text">{T[lang].heroTitleHi} {T[lang].heroTitleSub}</span>
            </div>
            <p className="footer-desc">
              {T[lang].footerDesc}
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Chat on WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">{T[lang].footerLinks}</h3>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">{T[lang].navHome}</a></li>
              <li><a href="#about" className="footer-link">{T[lang].navAbout}</a></li>
              <li><a href="#collection" className="footer-link">{T[lang].navCollection}</a></li>
              <li><a href="#gallery" className="footer-link">{T[lang].navGallery}</a></li>
              <li><a href="#services" className="footer-link">{T[lang].navServices}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">{T[lang].footerContact}</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Phone size={20} />
                <div>
                  <p style={{ fontWeight: 600, color: "var(--color-gold)" }}>{T[lang].footerPhoneLabel}</p>
                  <a href="tel:+919876543210" style={{ color: "#dfd0c6" }}>+91 98765 43210</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <MessageCircle size={20} />
                <div>
                  <p style={{ fontWeight: 600, color: "var(--color-gold)" }}>{T[lang].footerWhatsappLabel}</p>
                  <a href="https://wa.me/919876543210?text=Hello" target="_blank" rel="noopener noreferrer" style={{ color: "#dfd0c6" }}>+91 98765 43210</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <MapPin size={20} />
                <div>
                  <p style={{ fontWeight: 600, color: "var(--color-gold)" }}>{T[lang].footerAddressLabel}</p>
                  <p style={{ color: "#dfd0c6" }}>{T[lang].footerAddressVal}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{T[lang].footerCopyright}</p>
          <p>{T[lang].footerDevBy}</p>
        </div>
      </div>
    </footer>
  );
}
