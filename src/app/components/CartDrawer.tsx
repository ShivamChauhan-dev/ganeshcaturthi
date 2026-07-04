"use client";

import React from "react";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6";
  image: string;
  quantity: number;
  priceVal: number;
}

interface CartDrawerProps {
  lang: "en" | "hi";
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cart: CartItem[];
  updateQuantity: (id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6", change: number) => void;
  removeFromCart: (id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6") => void;
  calculateSubtotal: () => number;
  getCartItemsCount: () => number;
  setIsCheckoutOpen: (open: boolean) => void;
  T: any;
}

export default function CartDrawer({
  lang,
  isCartOpen,
  setIsCartOpen,
  cart,
  updateQuantity,
  removeFromCart,
  calculateSubtotal,
  getCartItemsCount,
  setIsCheckoutOpen,
  T
}: CartDrawerProps) {
  return (
    <>
      <div 
        className={`cart-overlay ${isCartOpen ? "open" : ""}`} 
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <div className="cart-title-box">
            <ShoppingBag size={20} />
            <span>{T[lang].cartTitle}</span>
            <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              ({getCartItemsCount()} {T[lang].itemsCount})
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            style={{ background: "none", border: "none", color: "var(--color-white)", cursor: "pointer", display: "flex", alignItems: "center" }}
            aria-label="Close cart drawer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p className="cart-empty-msg">{T[lang].cartEmpty}</p>
          ) : (
            cart.map((item) => {
              const details = T[lang].products[item.id];
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <Image src={item.image} alt={details.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{details.title}</h4>
                    <span className="cart-item-meta">{T[lang].cardSize}: {details.size}</span>
                    
                    <div className="cart-item-actions">
                      <div className="cart-qty-ctrl">
                        <button onClick={() => updateQuantity(item.id, -1)} className="cart-qty-btn">
                          <Minus size={14} />
                        </button>
                        <span className="cart-qty-val">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="cart-qty-btn">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="cart-item-price">
                        ₹{(item.priceVal * item.quantity).toLocaleString("en-IN")}
                      </span>
                      <button onClick={() => removeFromCart(item.id)} className="cart-remove-btn" aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>{T[lang].cartSubtotal}:</span>
              <span style={{ color: "var(--color-maroon)", fontSize: "1.3rem" }}>
                ₹{calculateSubtotal().toLocaleString("en-IN")}
              </span>
            </div>
            <button 
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="form-submit-btn"
              style={{ padding: "14px" }}
            >
              {T[lang].checkoutBtn}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
