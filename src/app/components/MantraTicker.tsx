"use client";

import React from "react";

interface MantraTickerProps {
  lang: "en" | "hi";
}

export default function MantraTicker({ lang }: MantraTickerProps) {
  return (
    <div className="ticker-banner">
      <div className="ticker-track">
        {Array.from({ length: 4 }).map((_, idx) => (
          <React.Fragment key={idx}>
            <div className="ticker-item">
              <span>{lang === "en" ? "|| Ganpati Bappa Morya ||" : "॥ गणपति बप्पा मोरया ॥"}</span>
              <div className="ticker-dot" />
              <span>{lang === "en" ? "|| Mangal Murti Morya ||" : "॥ मंगल मूर्ति मोरया ॥"}</span>
              <div className="ticker-dot" />
              <span>{lang === "en" ? "|| Shree Siddhivinayak Namo Namah ||" : "|| श्री सिद्धिविनायक नमो नमः ||"}</span>
              <div className="ticker-dot" />
              <span>{lang === "en" ? "|| Ashtavinayak Namo Namah ||" : "|| अष्टविनायक नमो नमः ||"}</span>
              <div className="ticker-dot" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
