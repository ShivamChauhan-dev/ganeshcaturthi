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

              <div style={{ backgroundColor: "rgba(212, 175, 55, 0.08)", border: "1px dashed var(--color-gold)", padding: "12px 16px", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "0.85rem", color: "var(--color-text-dark)", display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
                <p style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600", color: "var(--color-maroon)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--color-gold-dark)" }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  {T[lang].checkoutAdvanceTitle}
                </p>
                <p>{T[lang].checkoutAdvanceDesc}</p>
                <p style={{ color: "#4caf50", fontWeight: "600" }}>✓ {T[lang].deliveryGuarantee}</p>
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

              {/* UPI Payment Instructions */}
              <div style={{ backgroundColor: "rgba(138, 21, 21, 0.03)", border: "1px solid rgba(138, 21, 21, 0.08)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginTop: "16px", fontSize: "0.85rem", textAlign: "left" }}>
                <p style={{ fontWeight: 700, color: "var(--color-maroon)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="2" width="20" height="16" rx="2" ry="2" fill="none"/><path d="M12 18h.01"/></svg>
                  {T[lang].upiTitle}
                </p>
                <p style={{ color: "var(--color-text-light)", lineHeight: "1.5" }}>
                  {T[lang].upiDesc.replace("{amt}", (calculateSubtotal() * 0.5).toLocaleString("en-IN"))}
                </p>
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <span style={{ fontSize: "0.72rem", backgroundColor: "var(--color-gold)", color: "var(--color-maroon)", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>GPAY</span>
                  <span style={{ fontSize: "0.72rem", backgroundColor: "var(--color-gold)", color: "var(--color-maroon)", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>PHONEPE</span>
                  <span style={{ fontSize: "0.72rem", backgroundColor: "var(--color-gold)", color: "var(--color-maroon)", padding: "2px 8px", borderRadius: "4px", fontWeight: "700" }}>BHIM UPI</span>
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
