"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

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
          backgroundColor: "#fafbf9",
          color: "#1a2522",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh"
        }}
      >
        <div style={{ maxWidth: "440px", width: "90%", textAlign: "center", padding: "20px" }}>
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

          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 10px", color: "#1a2522" }}>
            Đã xảy ra lỗi hệ thống
          </h1>

          <p style={{ fontSize: "14.5px", color: "#63706b", lineHeight: 1.6, margin: "0 0 24px" }}>
            Hệ thống gặp sự cố khi tải giao diện. Quý khách vui lòng thử tải lại trang.
          </p>

          <button
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#0b3b32",
              color: "#ffffff",
              padding: "11px 22px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              cursor: "pointer"
            }}
          >
            <RotateCcw size={16} />
            <span>Tải Lại Trang</span>
          </button>
        </div>
      </body>
    </html>
  );
}
