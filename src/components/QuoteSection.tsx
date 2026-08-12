"use client";

import React, { useState } from "react";
import { COMPANY_INFO } from "@/data/companyData";
import { PhoneCall, ShieldCheck, Truck, Clock } from "lucide-react";

export default function QuoteSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Cảm ơn bạn! Hưng Vinh Phát đã nhận yêu cầu và sẽ liên hệ tư vấn, gửi bảng báo giá chi tiết trong thời gian sớm nhất.");
    }, 400);
  };

  return (
    <section
      className="section quote"
      id="contact"
      style={{
        background: "linear-gradient(135deg, #0b3b32 0%, #06231d 100%)",
        color: "#fff",
        padding: "72px 0"
      }}
    >
      <div className="container quotegrid">
        {/* Left Content */}
        <div>
          <div className="eyebrow" style={{ color: "var(--gold)", letterSpacing: "2.5px", fontWeight: 600, fontSize: "11px" }}>
            NHẬN BÁO GIÁ DỰ ÁN
          </div>
          <h2 style={{ fontSize: "32px", margin: "8px 0 14px", color: "#fff", fontWeight: 500, lineHeight: 1.3 }}>
            Cần vật liệu cho công trình?
          </h2>
          <p style={{ color: "#d0dad5", fontSize: "15px", lineHeight: 1.7, maxWidth: "520px", fontWeight: 400 }}>
            Gửi danh sách sản phẩm hoặc nhu cầu của bạn. Hưng Vinh Phát sẽ tư vấn giải pháp và báo giá trực tiếp từ kho hàng nhanh chóng.
          </p>

          {/* Hotline Highlight Card */}
          <div
            style={{
              marginTop: "24px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(198, 161, 91, 0.3)",
              borderRadius: "10px",
              padding: "16px 20px",
              maxWidth: "500px"
            }}
          >
            <div style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px" }}>
              TƯ VẤN TRỰC TIẾP QUA HOTLINE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px", flexWrap: "wrap" }}>
              <PhoneCall size={20} strokeWidth={1.5} style={{ color: "var(--gold)" }} />
              <a href={`tel:${COMPANY_INFO.phoneRaw[0]}`} style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>
                {COMPANY_INFO.phones[0]}
              </a>
              <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>•</span>
              <a href={`tel:${COMPANY_INFO.phoneRaw[1]}`} style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>
                {COMPANY_INFO.phones[1]}
              </a>
            </div>
          </div>

          {/* Trust Highlights */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "24px", maxWidth: "500px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#e0e8e4", fontWeight: 400 }}>
              <ShieldCheck size={17} strokeWidth={1.5} style={{ color: "var(--gold)" }} />
              <span>Chính hãng 100% CO/CQ</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#e0e8e4", fontWeight: 400 }}>
              <Truck size={17} strokeWidth={1.5} style={{ color: "var(--gold)" }} />
              <span>Giao tận chân công trình</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#e0e8e4", fontWeight: 400 }}>
              <Clock size={17} strokeWidth={1.5} style={{ color: "var(--gold)" }} />
              <span>Báo giá trong 15 phút</span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "32px 28px",
            color: "#111111",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)"
          }}
        >
          <h3 style={{ fontSize: "20px", color: "var(--green)", marginBottom: "4px", fontWeight: 600 }}>
            Điền thông tin nhận báo giá
          </h3>
          <p style={{ fontSize: "13.5px", color: "#66726d", marginBottom: "22px", fontWeight: 400 }}>
            Vui lòng để lại họ tên và số điện thoại, chuyên viên Hưng Vinh Phát sẽ liên hệ ngay.
          </p>

          <form onSubmit={handleQuoteSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 500, color: "#333d38", marginBottom: "6px" }}>
                Họ và tên *
              </label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "1px solid #dcdcdc",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 500, color: "#333d38", marginBottom: "6px" }}>
                Số điện thoại *
              </label>
              <input
                type="tel"
                required
                placeholder="0912 345 678"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "1px solid #dcdcdc",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 500, color: "#333d38", marginBottom: "6px" }}>
                Vật liệu hoặc sản phẩm cần tư vấn
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ: Thép Hòa Phát CB400, Tôn Hoa Sen 0.45mm, Gạch lát 80x80cm..."
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "1px solid #dcdcdc",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              />
            </div>

            {/* LUXURY GOLD CTA SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="quote-submit-btn"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #c6a15b 0%, #a88442 100%)",
                color: "#ffffff",
                padding: "14px 22px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14.5px",
                border: "none",
                cursor: isSubmitting ? "wait" : "pointer",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                boxShadow: "0 8px 24px rgba(198, 161, 91, 0.35)",
                transition: "all 0.3s ease"
              }}
            >
              <span>{isSubmitting ? "Đang Gửi Yêu Cầu..." : "GỬI YÊU CẦU BÁO GIÁ"}</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
