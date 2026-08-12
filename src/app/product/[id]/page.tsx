"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SAMPLE_PRODUCTS } from "@/data/companyData";
import ProductCard from "@/components/ProductCard";
import { CheckCircle2, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);

  // Find product by id
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id || p.id.toLowerCase() === id.toLowerCase());

  if (!product) {
    notFound();
  }

  // Gallery images list (Main image + variations/specs)
  const galleryImages = [
    product.image,
    "/images/hero_bright_architecture.jpg",
    "/images/steel_construction.jpg",
    "/images/roofing_aluminum.jpg"
  ];

  const [activeImg, setActiveImg] = useState(galleryImages[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const currentIdx = galleryImages.indexOf(activeImg);

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (currentIdx - 1 + galleryImages.length) % galleryImages.length;
    setActiveImg(galleryImages[prevIdx]);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentIdx + 1) % galleryImages.length;
    setActiveImg(galleryImages[nextIdx]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, currentIdx]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 400);
  };

  // Related products
  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  const displayRelated = relatedProducts.length >= 4 
    ? relatedProducts 
    : [...relatedProducts, ...SAMPLE_PRODUCTS.filter(p => p.id !== product.id && !relatedProducts.includes(p))].slice(0, 4);

  return (
    <div style={{ backgroundColor: "#ffffff", padding: "40px 0 5rem" }}>
      <div className="container">
        
        {/* MAIN PRODUCT SHOWCASE (2-COLUMN GRID) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
            marginBottom: "56px"
          }}
          className="product-detail-grid"
        >
          
          {/* LEFT COLUMN: PRODUCT IMAGE GALLERY WITH CLICK-TO-ZOOM */}
          <div>
            {/* Main Featured Photo - Click to Open Lightbox */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: "#f7f9f8",
                border: "1px solid #e2e8e4",
                marginBottom: "14px",
                cursor: "zoom-in"
              }}
              className="featured-image-container"
              title="Click để phóng to xem ảnh sắc nét"
            >
              <img
                src={activeImg}
                alt={product.name}
                fetchPriority="high"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.3s ease"
                }}
              />
              {/* Zoom hint badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "rgba(0,0,0,0.65)",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 500,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(4px)"
                }}
              >
                <ZoomIn size={14} />
                <span>Phóng to ảnh ({currentIdx + 1}/{galleryImages.length})</span>
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", marginBottom: "28px" }}>
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(imgUrl)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: activeImg === imgUrl ? "2px solid var(--green)" : "1px solid #e2e8e4",
                    padding: 0,
                    cursor: "pointer",
                    background: "#f7f9f8",
                    opacity: activeImg === imgUrl ? 1 : 0.7,
                    transition: "all 0.2s ease"
                  }}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>

            {/* UNBOXED DESCRIPTION PARAGRAPH */}
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--dark)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                MÔ TẢ SẢN PHẨM
              </h3>
              <p style={{ fontSize: "15px", color: "#4a5550", lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
                {product.description}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO & PERFECTLY ALIGNED CONSULTATION FORM */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {/* Brand Name & Category Type */}
              <div style={{ fontSize: "12px", color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px" }}>
                THƯƠNG HIỆU: {product.brand} • LOẠI: {product.categoryName}
              </div>

              {/* Product Name H1 */}
              <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111111", margin: "0 0 16px", lineHeight: 1.25, letterSpacing: "-0.5px" }}>
                {product.name}
              </h1>

              {/* Price & Stock Line */}
              <div
                style={{
                  padding: "16px 0",
                  borderTop: "1px solid #edf1ee",
                  borderBottom: "1px solid #edf1ee",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#77827d", fontWeight: 500 }}>Giá niêm yết:</span>
                  <span style={{ fontSize: "32px", fontWeight: 800, color: "var(--green)" }}>
                    {product.price} đ
                  </span>
                  <span style={{ fontSize: "16px", color: "#555", fontWeight: 600 }}>/{product.unit}</span>
                </div>
              </div>
            </div>

            {/* PERFECTLY ALIGNED BORDERLESS CONSULTATION FORM */}
            <div style={{ marginTop: "8px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--dark)", marginBottom: "6px", letterSpacing: "-0.3px" }}>
                Liên Hệ Tư Vấn & Đặt Hàng Trực Tiếp
              </h3>
              <p style={{ fontSize: "13.5px", color: "#5a6660", marginBottom: "22px", fontWeight: 400, lineHeight: 1.6 }}>
                Vui lòng để lại họ tên và số điện thoại, chuyên viên Hưng Vinh Phát sẽ liên hệ hỗ trợ vận chuyển & tư vấn chiết khấu công trình ngay.
              </p>

              {submitSuccess ? (
                <div style={{ background: "#e8f5e9", border: "1px solid #c8e6c9", color: "#2e7d32", padding: "18px", borderRadius: "10px", textAlign: "center", fontSize: "14.5px", fontWeight: 600 }}>
                  <CheckCircle2 size={26} color="#2e7d32" style={{ margin: "0 auto 8px" }} />
                  Cảm ơn bạn {fullName}! Hưng Vinh Phát đã nhận thông tin và sẽ liên hệ hỗ trợ tư vấn đặt hàng ngay qua SĐT {phone}.
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Side-by-side Input Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#222", marginBottom: "6px" }}>
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nhập họ và tên..."
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          border: "1px solid #d0d7d3",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                          backgroundColor: "#fcfdfe",
                          transition: "all 0.2s ease"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#222", marginBottom: "6px" }}>
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại..."
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          border: "1px solid #d0d7d3",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                          backgroundColor: "#fcfdfe",
                          transition: "all 0.2s ease"
                        }}
                      />
                    </div>
                  </div>

                  {/* Note / Special Requirements Textarea */}
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#222", marginBottom: "6px" }}>
                      Ghi chú / Nhu cầu chi tiết (nếu có)
                    </label>
                    <textarea
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Nhập ghi chú chi tiết: Số lượng m², yêu cầu cắt quy cách, địa điểm công trình..."
                      style={{
                        width: "100%",
                        height: "90px",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid #d0d7d3",
                        fontSize: "14px",
                        outline: "none",
                        boxSizing: "border-box",
                        backgroundColor: "#fcfdfe",
                        fontFamily: "inherit",
                        resize: "none",
                        transition: "all 0.2s ease"
                      }}
                    />
                  </div>

                  {/* Metallic Gold Order Submit CTA Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="quote-submit-btn"
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #c6a15b 0%, #a88442 100%)",
                      color: "#ffffff",
                      padding: "15px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "15px",
                      border: "none",
                      cursor: isSubmitting ? "wait" : "pointer",
                      marginTop: "4px",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      boxShadow: "0 8px 24px rgba(198, 161, 91, 0.35)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <span>{isSubmitting ? "Đang Gửi..." : "GỬI YÊU CẦU TƯ VẤN ĐẶT HÀNG"}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS */}
        <div style={{ borderTop: "1px solid #eaeaea", paddingTop: "40px" }}>
          <div style={{ textAlign: "left", marginBottom: "24px" }}>
            <div className="eyebrow" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px", color: "var(--gold)" }}>
              DANH MỤC {product.categoryName.toUpperCase()}
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--dark)", margin: "6px 0 0" }}>
              Sản phẩm cùng loại bạn có thể quan tâm
            </h2>
          </div>

          <div className="products">
            {displayRelated.map((rel) => (
              <ProductCard
                key={rel.id}
                image={rel.image}
                name={rel.name}
                priceText={`${rel.price} đ/${rel.unit}`}
                description={rel.description}
                buttonText="Xem chi tiết"
                detailUrl={`/product/${rel.id}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX PHOTO VIEWER WITH LEFT/RIGHT NAVIGATION */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(8px)",
            cursor: "default"
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "#ffffff",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10001,
              transition: "all 0.2s ease"
            }}
            aria-label="Đóng xem ảnh"
          >
            <X size={24} />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrevImage}
            style={{
              position: "absolute",
              left: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "#ffffff",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10001,
              transition: "all 0.2s ease"
            }}
            aria-label="Xem ảnh trước"
            title="Ảnh trước (Trái)"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNextImage}
            style={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "#ffffff",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10001,
              transition: "all 0.2s ease"
            }}
            aria-label="Xem ảnh kế tiếp"
            title="Ảnh tiếp theo (Phải)"
          >
            <ChevronRight size={28} />
          </button>

          {/* Fullscreen Photo Showcase Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "88vw",
              maxHeight: "86vh",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
            }}
          >
            <img
              src={activeImg}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "86vh",
                display: "block",
                objectFit: "contain"
              }}
            />
            
            {/* Caption & Counter Bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                padding: "16px 24px",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>{product.name} — Hưng Vinh Phát</span>
              <span style={{ fontSize: "12.5px", background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "12px" }}>
                Ảnh {currentIdx + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
