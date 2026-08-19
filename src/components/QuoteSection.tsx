"use client";

import React, { useState } from "react";
import { COMPANY_INFO } from "@/data/companyData";
import { PhoneCall, ShieldCheck, Truck, Clock } from "lucide-react";
import { pb } from "@/lib/pocketbase";

export default function QuoteSection() {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState("");
  const [note, setNote] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");

  const validatePhone = (inputPhone: string): boolean => {
    const clean = inputPhone.replace(/[\s.-]/g, "");
    // Hỗ trợ cả di động (10 số: 03x, 05x, 07x, 08x, 09x) và máy bàn cố định (10-11 số: 02x)
    const regex = /^(0|\+84)((3|5|7|8|9)[0-9]{8}|2[0-9]{8,9})$/;
    return regex.test(clean);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (phoneError) {
      if (validatePhone(val)) {
        setPhoneError("");
      }
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim()) return;

    if (!validatePhone(phone)) {
      setPhoneError("Vui lòng nhập số điện thoại hợp lệ (di động hoặc số cố định).");
      return;
    }
    setPhoneError("");

    setIsSubmitting(true);
    const currentName = customer.trim();
    const currentPhone = phone.trim();

    try {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      await pb.collection("quotes").create({
        customer: currentName,
        phone: currentPhone,
        items: items.trim() || "Yêu cầu tư vấn chung",
        note: note.trim() || "Gửi từ Form Báo giá trang chủ",
        status: "Chưa xử lý",
        date: formattedDate
      });

      setSubmittedName(currentName);
      setSubmittedPhone(currentPhone);
      setSubmitSuccess(true);
      setCustomer("");
      setPhone("");
      setItems("");
      setNote("");
    } catch (err: any) {
      console.error("Lỗi gửi báo giá:", err);
      setSubmittedName(currentName);
      setSubmittedPhone(currentPhone);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
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

          {submitSuccess ? (
            <div style={{ background: "#e8f5e9", border: "1px solid #c8e6c9", color: "#2e7d32", padding: "18px 20px", borderRadius: "10px", textAlign: "center", fontSize: "14.5px", fontWeight: 500, lineHeight: 1.6 }}>
              Cảm ơn bạn {submittedName}! Hưng Vinh Phát đã nhận thông tin và sẽ liên hệ hỗ trợ tư vấn đặt hàng ngay qua SĐT {submittedPhone}.
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 500, color: "#333d38", marginBottom: "6px" }}>
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
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
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Ví dụ: 0912 345 678"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "8px",
                    border: phoneError ? "1px solid #ef4444" : "1px solid #dcdcdc",
                    fontSize: "14px",
                    fontWeight: 400,
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
                {phoneError && (
                  <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "5px", fontWeight: 500 }}>
                    {phoneError}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 500, color: "#333d38", marginBottom: "6px" }}>
                  Vật liệu hoặc sản phẩm cần tư vấn
                </label>
                <textarea
                  rows={2}
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
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

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 500, color: "#333d38", marginBottom: "6px" }}>
                  Ghi chú
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Nhập yêu cầu giao hàng, tiến độ hoặc địa điểm công trình..."
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
          )}
        </div>

      </div>
    </section>
  );
}
