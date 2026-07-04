"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Truck, Sparkles, Leaf } from "lucide-react";

interface ServicesProps {
  lang: "en" | "hi";
  T: any;
}

export default function Services({ lang, T }: ServicesProps) {
  return (
    <section id="services" className="services-section section-container">
      <div className="services-grid">
        <div>
          <span className="section-subtitle">{T[lang].servicesSub}</span>
          <h2 className="about-title" style={{ textAlign: "left" }}>{T[lang].servicesTitle}</h2>
          
          <div className="services-list">
            <div className="service-item">
              <div className="service-icon-box">
                <Calendar size={24} />
              </div>
              <div className="service-info">
                <h3 className="service-name">{T[lang].srvBookingTitle}</h3>
                <p className="service-desc">{T[lang].srvBookingDesc}</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon-box">
                <Truck size={24} />
              </div>
              <div className="service-info">
                <h3 className="service-name">{T[lang].srvDelivTitle}</h3>
                <p className="service-desc">{T[lang].srvDelivDesc}</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon-box">
                <Sparkles size={24} />
              </div>
              <div className="service-info">
                <h3 className="service-name">{T[lang].srvInstTitle}</h3>
                <p className="service-desc">{T[lang].srvInstDesc}</p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon-box">
                <Leaf size={24} />
              </div>
              <div className="service-info">
                <h3 className="service-name">{T[lang].srvVisarjanTitle}</h3>
                <p className="service-desc">{T[lang].srvVisarjanDesc}</p>
              </div>
            </div>
          </div>

          <a href="#collection" className="btn-primary">{T[lang].navCollection}</a>
        </div>

        <div className="services-img-container">
          <div className="services-graphic-wrapper">
              <Image 
                src="/delivery_ganesha.png" 
                alt="Delivery mini-truck transporting Ganesha idols safely" 
                fill
                className="services-image"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
