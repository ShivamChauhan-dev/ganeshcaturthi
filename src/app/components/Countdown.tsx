"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

interface CountdownProps {
  lang: "en" | "hi";
  T: any;
}

export default function Countdown({ lang, T }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Ganesh Chaturthi 2026 date: September 14, 2026
    const targetDate = new Date("2026-09-14T00:00:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format numbers to always have two digits
  const formatNum = (num: number) => {
    return String(num).padStart(2, "0");
  };

  return (
    <section className="countdown-section section-container">
      <div className="countdown-grid">
        <div className="countdown-image-container">
          <div className="countdown-img-frame">
            <Image 
              src="/hero_ganesha.png" 
              alt="Lord Ganesha decorative statue" 
              width={320} 
              height={320}
              style={{ objectFit: "contain" }}
              className="countdown-image"
            />
          </div>
        </div>

        <div className="countdown-content">
          <span className="section-subtitle" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={16} /> {T[lang].countdownDateLabel}
          </span>
          <h2 className="about-title" style={{ textAlign: "left", margin: "10px 0" }}>
            {T[lang].countdownTitle}
          </h2>
          <p className="countdown-subtitle" style={{ color: "var(--color-text-light)", marginBottom: "30px", fontSize: "1.1rem" }}>
            {T[lang].countdownSubtitle}
          </p>

          <div className="countdown-timer-container">
            <div className="timer-box">
              <span className="timer-value">{isMounted ? formatNum(timeLeft.days) : "--"}</span>
              <span className="timer-label">{T[lang].countdownDays}</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-box">
              <span className="timer-value">{isMounted ? formatNum(timeLeft.hours) : "--"}</span>
              <span className="timer-label">{T[lang].countdownHours}</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-box">
              <span className="timer-value">{isMounted ? formatNum(timeLeft.minutes) : "--"}</span>
              <span className="timer-label">{T[lang].countdownMinutes}</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-box">
              <span className="timer-value">{isMounted ? formatNum(timeLeft.seconds) : "--"}</span>
              <span className="timer-label">{T[lang].countdownSeconds}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
