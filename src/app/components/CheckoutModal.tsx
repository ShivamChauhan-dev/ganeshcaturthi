"use client";

import React from "react";
import { X, CheckCircle2 } from "lucide-react";

interface CartItem {
  id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6";
  image: string;
  quantity: number;
  priceVal: number;
}

interface CheckoutModalProps {
  lang: "en" | "hi";
  isCheckoutOpen: boolean;
  handleOrderSuccessClose: () => void;
  checkoutSuccess: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  formData: {
    name: string;
    phone: string;
    delivery: string;
    address: string;
    notes: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  orderId: string;
  cart: CartItem[];
  calculateSubtotal: () => number;
  T: any;
}

export default function CheckoutModal({
  lang,
  isCheckoutOpen,
  handleOrderSuccessClose,
  checkoutSuccess,
  handleSubmit,
  formData,
  handleInputChange,
  orderId,
  cart,
  calculateSubtotal,
  T
}: CheckoutModalProps) {
  if (!isCheckoutOpen) return null;

  // Dynamic formatting for the success text
  const getSuccessMessage = () => {
    return T[lang].successText
      .replace("{name}", formData.name)
      .replace("{phone}", formData.phone);
  };

  return (
    <div className="modal-overlay" onClick={handleOrderSuccessClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {!checkoutSuccess ? T[lang].modalTitle : T[lang].checkoutSuccessMsg}
          </h3>
          <button 
            onClick={handleOrderSuccessClose} 
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          {!checkoutSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{T[lang].labelName}</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder={T[lang].placeholderName} 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{T[lang].labelPhone}</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder={T[lang].placeholderPhone} 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{T[lang].labelDelivery}</label>
                <select 
                  name="delivery" 
                  value={formData.delivery} 
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="no">{T[lang].deliveryNo}</option>
                  <option value="yes">{T[lang].deliveryYes}</option>
                </select>
              </div>

              {formData.delivery === "yes" && (
                <div className="form-group">
                  <label className="form-label">{T[lang].labelAddress}</label>
                  <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    placeholder={T[lang].placeholderAddress} 
                    required 
                    className="form-textarea"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">{T[lang].labelNotes}</label>
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleInputChange} 
                  placeholder={T[lang].placeholderNotes} 
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="form-submit-btn">
                {T[lang].submitBtn}
              </button>
            </form>
          ) : (
            <div className="success-state">
              <div className="success-icon-box">
                <CheckCircle2 size={40} />
              </div>
              <h4 className="success-heading">{T[lang].successHeading}</h4>
              <p className="success-message" dangerouslySetInnerHTML={{ __html: getSuccessMessage() }} />
              
              {/* ORDER INVOICE RECEIPT */}
              <div className="checkout-success-container">
                <p style={{ fontWeight: 700, borderBottom: "1px solid rgba(138, 21, 21, 0.15)", paddingBottom: "8px", marginBottom: "8px", color: "var(--color-maroon)" }}>
                  {T[lang].checkoutConfirmText}
                </p>
                <div className="checkout-receipt-row">
                  <span><strong>{T[lang].orderIdLabel}:</strong></span>
                  <span><strong>{orderId}</strong></span>
                </div>
                <div className="checkout-receipt-row">
                  <span>{T[lang].deliveryOptionLabel}:</span>
                  <span>{formData.delivery === "yes" ? T[lang].deliveryOptionHome : T[lang].deliveryOptionSelf}</span>
                </div>
                
                <div style={{ margin: "8px 0" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-light)", marginBottom: "4px" }}>Items ordered:</p>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", padding: "2px 0" }}>
                      <span>{T[lang].products[item.id].title} (x{item.quantity})</span>
                      <span>₹{(item.priceVal * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                <div className="checkout-receipt-row" style={{ borderTop: "2px dashed rgba(138, 21, 21, 0.2)", borderBottom: "none", paddingTop: "8px", fontWeight: "bold", fontSize: "1rem" }}>
                  <span>{T[lang].cartSubtotal}:</span>
                  <span style={{ color: "var(--color-maroon)" }}>₹{calculateSubtotal().toLocaleString("en-IN")}</span>
                </div>
              </div>

              <p style={{ marginTop: "24px", fontWeight: "bold", color: "var(--color-gold-dark)", fontFamily: "var(--font-hindi)", fontSize: "1.25rem" }}>
                {T[lang].successBappa}
              </p>
              
              <button 
                onClick={handleOrderSuccessClose} 
                className="form-submit-btn" 
                style={{ marginTop: "24px", maxWidth: "200px" }}
              >
                {T[lang].successBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
