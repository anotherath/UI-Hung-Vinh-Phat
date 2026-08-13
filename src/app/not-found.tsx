import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Home, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Không tìm thấy trang | Hưng Vinh Phát",
  description: "Trang quý khách đang tìm kiếm không tồn tại hoặc đã bị thay đổi.",
  robots: "noindex, nofollow"
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        {/* Số 404 */}
        <div
          style={{
            fontSize: "clamp(72px, 12vw, 100px)",
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--green, #0b3b32)",
            marginBottom: "12px",
            letterSpacing: "-1px"
          }}
        >
          4<span style={{ color: "var(--gold, #c6a15b)" }}>0</span>4
        </div>

        {/* Tiêu đề */}
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#1a2522",
            margin: "0 0 10px"
          }}
        >
          Không tìm thấy trang
        </h1>

        {/* Mô tả */}
        <p
          style={{
            fontSize: "14.5px",
            color: "#63706b",
            lineHeight: 1.6,
            margin: "0 0 28px"
          }}
        >
          Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đã chuyển sang địa chỉ khác.
        </p>

        {/* Nút điều hướng */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap"
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
              padding: "11px 22px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.2s"
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
              backgroundColor: "rgba(198, 161, 91, 0.15)",
              color: "var(--gold, #c6a15b)",
              border: "1px solid rgba(198, 161, 91, 0.4)",
              padding: "11px 22px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background-color 0.2s"
            }}
          >
            <Package size={16} />
            <span>Xem Sản Phẩm</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
