"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="vi">
      <head>
        <title>Sự Cố Hệ Thống | Hưng Vinh Phát</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          backgroundColor: "#f7f9f7",
          color: "#1a2522",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}
      >
        <div
          style={{
            maxWidth: "520px",
            width: "90%",
            margin: "20px auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e1e7e3",
            boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
            padding: "40px 28px",
            textAlign: "center"
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              color: "#d32f2f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}
          >
            <AlertTriangle size={30} />
          </div>

          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 10px", color: "#0b3b32" }}>
            Hưng Vinh Phát - Sự Cố Tải Hệ Thống
          </h1>

          <p style={{ fontSize: "14px", color: "#5d6d67", lineHeight: 1.6, margin: "0 0 24px" }}>
            Đã xảy ra lỗi nghiêm trọng khi khởi tạo giao diện hệ thống. Quý khách vui lòng thử tải lại trang.
          </p>

          <button
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#0b3b32",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              cursor: "pointer"
            }}
          >
            <RotateCcw size={16} />
            <span>Tải Lại Ứng Dụng</span>
          </button>
        </div>
      </body>
    </html>
  );
}
