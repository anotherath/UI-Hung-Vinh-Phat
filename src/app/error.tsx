"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

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
      <div style={{ maxWidth: "460px", width: "100%" }}>
        {/* Biểu tượng cảnh báo nhẹ nhàng */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px"
          }}
        >
          <AlertCircle size={28} />
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
          Đã xảy ra lỗi
        </h1>

        {/* Mô tả ngắn */}
        <p
          style={{
            fontSize: "14.5px",
            color: "#63706b",
            lineHeight: 1.6,
            margin: "0 0 28px"
          }}
        >
          Hệ thống gặp sự cố trong quá trình xử lý yêu cầu. Vui lòng thử tải lại trang hoặc quay về trang chủ.
        </p>

        {/* Nút hành động */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >
          <button
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--green, #0b3b32)",
              color: "#ffffff",
              border: "none",
              padding: "11px 22px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "opacity 0.2s"
            }}
          >
            <RotateCcw size={16} />
            <span>Thử Lại</span>
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f2f5f3",
              color: "#1a2522",
              border: "1px solid #d5ddd7",
              padding: "11px 22px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background-color 0.2s"
            }}
          >
            <Home size={16} />
            <span>Về Trang Chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
