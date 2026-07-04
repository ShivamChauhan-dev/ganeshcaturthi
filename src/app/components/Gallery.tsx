"use client";

import React from "react";
import Image from "next/image";

interface GalleryProps {
  lang: "en" | "hi";
  T: any;
}

export default function Gallery({ lang, T }: GalleryProps) {
  return (
    <section id="gallery" className="gallery-section section-container">
      <span className="section-subtitle">{T[lang].gallerySub}</span>
      <h2 className="section-title">{T[lang].galleryTitle}</h2>

      <div className="gallery-grid">
        <div className="gallery-item large">
          <Image src="/workshop_sculptor.png" alt="Sculptor work scene" fill className="gallery-img" />
          <div className="gallery-overlay">
            <span className="gallery-caption">{T[lang].gallery.img1}</span>
          </div>
        </div>
        <div className="gallery-item">
          <Image src="/collection_ganesha_one.png" alt="Decorative idol" fill className="gallery-img" />
          <div className="gallery-overlay">
            <span className="gallery-caption">{T[lang].gallery.img2}</span>
          </div>
        </div>
        <div className="gallery-item">
          <Image src="/collection_ganesha_two.png" alt="Eco Ganesha statue details" fill className="gallery-img" />
          <div className="gallery-overlay">
            <span className="gallery-caption">{T[lang].gallery.img3}</span>
          </div>
        </div>
        <div className="gallery-item">
          <Image src="/about_ganesha.png" alt="Ganesh Photo" fill className="gallery-img" />
          <div className="gallery-overlay">
            <span className="gallery-caption">{T[lang].gallery.img4}</span>
          </div>
        </div>
        <div className="gallery-item">
          <Image src="/collection_ganesha_two.png" alt="Ganesha idol work in progress" fill className="gallery-img" />
          <div className="gallery-overlay">
            <span className="gallery-caption">{T[lang].gallery.img5}</span>
          </div>
        </div>
        <div className="gallery-item large">
          <Image src="/delivery_ganesha.png" alt="Truck transport" fill className="gallery-img" />
          <div className="gallery-overlay">
            <span className="gallery-caption">{T[lang].gallery.img6}</span>
          </div>
        </div>
      </div>

      <div className="collection-center-cta">
        <a href="#contact" className="btn-secondary">{T[lang].galleryMoreBtn}</a>
      </div>
    </section>
  );
}
