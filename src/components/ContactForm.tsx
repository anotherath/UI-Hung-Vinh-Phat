"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { COMPANY_INFO, PRODUCT_CATEGORIES } from "@/data/companyData";
import { pb } from "@/lib/pocketbase";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "",
    quantity: "",
    location: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      await pb.collection("quotes").create({
        customer: formData.name.trim(),
        phone: formData.phone.trim(),
        items: formData.category ? `${formData.category}${formData.quantity ? ` - Số lượng: ${formData.quantity}` : ""}` : (formData.message || "Yêu cầu tư vấn"),
        note: `Địa điểm: ${formData.location || "N/A"}. Ghi chú: ${formData.message || "N/A"}`,
        status: "Chưa xử lý",
        date: formattedDate
      });
    } catch (err) {
      console.error("Lỗi gửi báo giá qua PocketBase:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "18px",
        padding: "2.5rem",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
        position: "relative"
      }}
    >
      {submitted ? (
        <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
          <div style={{ background: "var(--green-light)", color: "var(--green)", width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 500, color: "var(--green)", marginBottom: "0.6rem" }}>
            Gửi Yêu Cầu Báo Giá Thành Công!
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", maxWidth: "480px", margin: "0 auto 1.5rem", fontWeight: 300 }}>
            Cảm ơn Quý Khách <strong>{formData.name}</strong>. Đội ngũ chuyên viên Hưng Vinh Phát sẽ gọi điện tư vấn và gửi bảng giá ưu đãi trực tiếp tới SĐT <strong>{formData.phone}</strong> trong thời gian sớm nhất.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", phone: "", category: "", quantity: "", location: "", message: "" });
            }}
            className="btn-secondary"
          >
            Gửi thêm yêu cầu tư vấn khác
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.8rem" }}>
            <span className="eyebrow">TƯ VẤN BÁO GIÁ NHANH</span>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--green)", marginBottom: "0.4rem" }}>
              Nhận Báo Giá Vật Liệu Cho Công Trình
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", fontWeight: 300 }}>
              Điền thông tin bên dưới để nhận tư vấn chủng loại, báo giá tốt nhất & điều kiện giao nhận tận nơi.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }} className="form-grid">
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 400, color: "var(--dark)", marginBottom: "0.4rem" }}>
                Họ và Tên Quý Khách <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Nguyễn Văn A"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-subtle)",
                  outline: "none",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  backgroundColor: "var(--surface)"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 400, color: "var(--dark)", marginBottom: "0.4rem" }}>
                Số Điện Thoại Liên Hệ <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="VD: 0914.214.xxx"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-subtle)",
                  outline: "none",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  backgroundColor: "var(--surface)"
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }} className="form-grid">
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 400, color: "var(--dark)", marginBottom: "0.4rem" }}>
                Nhóm Vật Liệu Quan Tâm
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-subtle)",
                  outline: "none",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  backgroundColor: "var(--surface)",
                  color: "var(--dark)"
                }}
              >
                <option value="">-- Chọn loại sản phẩm --</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 400, color: "var(--dark)", marginBottom: "0.4rem" }}>
                Địa Điểm Giao Hàng / Công Trình
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="VD: TP. Hưng Yên, Hà Nội..."
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-subtle)",
                  outline: "none",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  backgroundColor: "var(--surface)"
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 400, color: "var(--dark)", marginBottom: "0.4rem" }}>
              Nội Dung Ghi Chú Yêu Cầu (Khối lượng, quy cách...)
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="VD: Tôi cần báo giá 10 tấn thép cây D16 Hòa Phát và 200m2 gạch ốp lát..."
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border-subtle)",
                outline: "none",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                backgroundColor: "var(--surface)",
                resize: "vertical"
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <ShieldCheck size={16} color="var(--green)" /> Thông tin được bảo mật 100%
            </div>
            <button type="submit" className="btn-primary" style={{ padding: "0.85rem 2.2rem" }}>
              <Send size={16} /> Gửi Yêu Cầu Báo Giá
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
