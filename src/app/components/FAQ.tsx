"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQProps {
  lang: "en" | "hi";
  T: any;
}

export default function FAQ({ lang, T }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = T[lang].faqsList;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section-container" style={{ paddingTop: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="section-subtitle">{T[lang].faqSub}</span>
        <h2 className="section-title" style={{ marginTop: "10px" }}>{T[lang].faqTitle}</h2>
      </div>

      <div className="faq-list" style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
        {faqs.map((faq: any, i: number) => (
          <div 
            key={i} 
            className="faq-item" 
            style={{ 
              border: "1px solid rgba(138, 21, 21, 0.1)", 
              borderRadius: "var(--radius-md)", 
              backgroundColor: "var(--color-white)", 
              overflow: "hidden", 
              transition: "var(--transition-normal)" 
            }}
          >
            <button 
              onClick={() => toggle(i)} 
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                width: "100%", 
                padding: "20px 24px", 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                textAlign: "left", 
                color: "var(--color-maroon)", 
                fontWeight: "600", 
                fontSize: "1.1rem", 
                fontFamily: "var(--font-hindi)" 
              }}
            >
              <span>{faq.q}</span>
              {openIndex === i ? <Minus size={18} style={{ color: "var(--color-gold)", flexShrink: 0 }} /> : <Plus size={18} style={{ color: "var(--color-gold)", flexShrink: 0 }} />}
            </button>
            {openIndex === i && (
              <div 
                style={{ 
                  padding: "0 24px 20px 24px", 
                  color: "var(--color-text-light)", 
                  fontSize: "0.95rem", 
                  lineHeight: "1.7" 
                }}
              >
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
