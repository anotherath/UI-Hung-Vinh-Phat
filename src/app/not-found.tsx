import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { 
  Home, 
  Search, 
  PhoneCall, 
  ArrowLeft, 
  Layers, 
  Package, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  Building2
} from "lucide-react";
import { COMPANY_INFO, PRODUCT_CATEGORIES } from "@/data/companyData";

export const metadata: Metadata = {
  title: "404 - Không tìm thấy trang | Hưng Vinh Phát",
  description: "Trang quý khách đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ mới. Vui lòng quay lại trang chủ hoặc xem danh mục vật liệu xây dựng Hưng Vinh Phát.",
  robots: "noindex, nofollow"
};

export default function NotFound() {
  return (
    <div style={{ minHeight: "75vh", backgroundColor: "#fbfcfb", padding: "60px 0 80px" }}>
      <div className="container" style={{ maxWidth: "920px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Main 404 Hero Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e7ece8",
            boxShadow: "0 10px 30px rgba(11, 59, 50, 0.06)",
            padding: "48px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle decorative background bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: "linear-gradient(90deg, var(--green, #0b3b32), var(--gold, #c6a15b))"
            }}
          />

          {/* Eyebrow Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(198, 161, 91, 0.12)",
              color: "#946f27",
              border: "1px solid rgba(198, 161, 91, 0.3)",
              borderRadius: "50px",
              padding: "5px 14px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "16px"
            }}
          >
            <HelpCircle size={14} />
            <span>MÃ LỖI 404 • KHÔNG TÌM THẤY LIÊN KẾT</span>
          </div>

          {/* 404 Number Graphic */}
          <div
            style={{
              fontSize: "clamp(64px, 12vw, 110px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1,
              color: "var(--green, #0b3b32)",
              margin: "4px 0 12px",
              fontFamily: "var(--font-main, sans-serif)",
              textShadow: "0 2px 8px rgba(11, 59, 50, 0.1)"
            }}
          >
            4<span style={{ color: "var(--gold, #c6a15b)" }}>0</span>4
          </div>

          {/* Headline & Explanation */}
          <h1
            style={{
              fontSize: "clamp(20px, 4vw, 26px)",
              fontWeight: 700,
              color: "#1a2522",
              margin: "0 0 12px"
            }}
          >
            Trang Quý Khách Đang Tìm Không Tồn Tại
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#63706b",
              maxWidth: "580px",
              margin: "0 auto 28px",
              lineHeight: 1.6
            }}
          >
            Địa chỉ URL có thể bị nhập sai, tài liệu sản phẩm đã được cập nhật sang danh mục mới hoặc tạm thời không khả dụng trên hệ thống <strong>{COMPANY_INFO.shortName}</strong>.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "36px"
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--green, #0b3b32)",
                color: "#ffffff",
                padding: "12px 22px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                boxShadow: "0 4px 14px rgba(11, 59, 50, 0.25)",
                transition: "all 0.2s ease"
              }}
            >
              <Home size={16} />
              <span>Về Trang Chủ</span>
            </Link>

            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--gold, #c6a15b)",
                color: "#1b1914",
                padding: "12px 22px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(198, 161, 91, 0.25)",
                transition: "all 0.2s ease"
              }}
            >
              <Package size={16} />
              <span>Danh Mục Sản Phẩm</span>
            </Link>

            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#f4f6f4",
                color: "#283834",
                border: "1px solid #dce2dd",
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <Building2 size={16} />
              <span>Hồ Sơ Doanh Nghiệp</span>
            </Link>
          </div>

          {/* Quick Categories Navigation */}
          <div
            style={{
              borderTop: "1px solid #eef2ef",
              paddingTop: "28px",
              textAlign: "left"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px"
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#4d5b57",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                Gợi ý danh mục vật liệu nổi bật:
              </span>
              <Link
                href="/categories"
                style={{
                  fontSize: "13px",
                  color: "var(--gold, #c6a15b)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                Xem tất cả danh mục <ArrowRight size={13} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "10px"
              }}
            >
              {PRODUCT_CATEGORIES.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "11px 14px",
                    borderRadius: "8px",
                    backgroundColor: "#f8faf8",
                    border: "1px solid #e3e8e4",
                    color: "#1e2e2a",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    transition: "all 0.15s ease"
                  }}
                >
                  <Layers size={16} color="var(--gold, #c6a15b)" style={{ flexShrink: 0 }} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Support & Contact Card */}
        <div
          style={{
            marginTop: "24px",
            backgroundColor: "rgba(11, 59, 50, 0.03)",
            border: "1px dashed #ced8d2",
            borderRadius: "12px",
            padding: "20px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(11, 59, 50, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--green, #0b3b32)",
                flexShrink: 0
              }}
            >
              <PhoneCall size={19} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a2522" }}>
                Cần hỗ trợ tìm kiếm sản phẩm hoặc báo giá công trình?
              </div>
              <div style={{ fontSize: "12.5px", color: "#616f6b" }}>
                Liên hệ trực tiếp tổng đài phòng kinh doanh Hưng Vinh Phát để được hỗ trợ tức thì.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "var(--green, #0b3b32)",
                color: "#ffffff",
                padding: "9px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600
              }}
            >
              <PhoneCall size={14} />
              <span>Hotline: {COMPANY_INFO.phones[0]}</span>
            </a>

            <a
              href={COMPANY_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#0068ff",
                color: "#ffffff",
                padding: "9px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600
              }}
            >
              <span>Chat Zalo</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
