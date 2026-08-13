"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  RotateCcw, 
  Home, 
  PhoneCall, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ShieldAlert,
  ArrowLeft
} from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log error to monitoring service / console
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  const handleCopyDigest = () => {
    const textToCopy = `Error: ${error.message}\nDigest: ${error.digest || "N/A"}\nURL: ${typeof window !== "undefined" ? window.location.href : ""}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "75vh", backgroundColor: "#fafbf9", padding: "60px 0 80px" }}>
      <div className="container" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Main Error Box */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #ebf0ec",
            boxShadow: "0 10px 30px rgba(11, 59, 50, 0.05)",
            padding: "48px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Top Error Accent Bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: "linear-gradient(90deg, #d32f2f, var(--gold, #c6a15b))"
            }}
          />

          {/* Warning Badge Icon */}
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              backgroundColor: "rgba(211, 47, 47, 0.08)",
              color: "#d32f2f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 4px 14px rgba(211, 47, 47, 0.12)"
            }}
          >
            <AlertTriangle size={34} />
          </div>

          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(211, 47, 47, 0.06)",
              color: "#c62828",
              border: "1px solid rgba(211, 47, 47, 0.2)",
              borderRadius: "50px",
              padding: "4px 14px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "14px"
            }}
          >
            <ShieldAlert size={14} />
            <span>SỰ CỐ XỬ LÝ HỆ THỐNG</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: 700,
              color: "#18221f",
              margin: "0 0 12px"
            }}
          >
            Đã Xảy Ra Lỗi Trong Quá Trình Tải Trang
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#62706b",
              maxWidth: "560px",
              margin: "0 auto 30px",
              lineHeight: 1.6
            }}
          >
            Hệ thống tạm thời không thể hoàn tất yêu cầu này. Quý khách vui lòng thử tải lại trang hoặc liên hệ bộ phận hỗ trợ kỹ thuật <strong>{COMPANY_INFO.shortName}</strong> nếu sự cố tiếp diễn.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "32px"
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
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(11, 59, 50, 0.22)",
                transition: "all 0.2s ease"
              }}
            >
              <RotateCcw size={16} />
              <span>Thử Tải Lại Trang</span>
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
                padding: "12px 22px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <Home size={16} />
              <span>Về Trang Chủ</span>
            </Link>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--gold, #c6a15b)",
                color: "#111",
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(198, 161, 91, 0.25)"
              }}
            >
              <PhoneCall size={16} />
              <span>Hotline Báo Lỗi</span>
            </a>
          </div>

          {/* Technical Diagnostics Accordion */}
          <div
            style={{
              borderTop: "1px solid #eef2ef",
              paddingTop: "20px",
              textAlign: "left"
            }}
          >
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: "none",
                border: "none",
                color: "#72807b",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 0"
              }}
            >
              <span>{showDetails ? "Ẩn thông tin kỹ thuật" : "Hiển thị thông tin kỹ thuật dành cho lập trình viên"}</span>
              {showDetails ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {showDetails && (
              <div
                style={{
                  marginTop: "12px",
                  backgroundColor: "#161d1a",
                  color: "#d8e2dc",
                  borderRadius: "8px",
                  padding: "16px",
                  fontSize: "12.5px",
                  fontFamily: "monospace",
                  lineHeight: 1.5,
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", borderBottom: "1px solid #2d3833", paddingBottom: "6px" }}>
                  <span style={{ color: "#c6a15b", fontWeight: 600 }}>Thông Tin Sự Cố</span>
                  <button
                    onClick={handleCopyDigest}
                    style={{
                      background: "#26332e",
                      border: "none",
                      color: "#fff",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    {copied ? <Check size={12} color="#4caf50" /> : <Copy size={12} />}
                    <span>{copied ? "Đã sao chép" : "Sao chép mã lỗi"}</span>
                  </button>
                </div>

                <div style={{ wordBreak: "break-word", marginBottom: "6px" }}>
                  <strong>Lỗi:</strong> {error.message || "Unknown error occurred"}
                </div>
                {error.digest && (
                  <div style={{ color: "#95a59f" }}>
                    <strong>Digest ID:</strong> {error.digest}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Support hotline bar */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "13px",
            color: "#74827d"
          }}
        >
          {COMPANY_INFO.name} — Hotline kỹ thuật & bán hàng:{" "}
          <a
            href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
            style={{ color: "var(--green, #0b3b32)", fontWeight: 600, textDecoration: "underline" }}
          >
            {COMPANY_INFO.phones[0]}
          </a>
        </div>

      </div>
    </div>
  );
}
