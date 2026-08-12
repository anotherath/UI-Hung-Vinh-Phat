"use client";

import React, { useState, useEffect } from "react";
import { COMPANY_INFO } from "@/data/companyData";
import { MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Pulse Keyframe Animation */}
      <style jsx global>{`
        @keyframes zaloPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 104, 255, 0.6);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(0, 104, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 104, 255, 0);
          }
        }
      `}</style>

      {/* Floating Action Container — Zalo Only */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "flex-end"
        }}
      >
        {/* Floating Official Zalo Button */}
        <a
          href={COMPANY_INFO.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "linear-gradient(135deg, #0068FF 0%, #0052cc 100%)",
            color: "#ffffff",
            padding: "10px 18px 10px 14px",
            borderRadius: "30px",
            boxShadow: "0 8px 24px rgba(0, 104, 255, 0.4)",
            textDecoration: "none",
            fontSize: "13.5px",
            fontWeight: 600,
            animation: "zaloPulse 2s infinite",
            transition: "all 0.25s ease"
          }}
          title="Chat Zalo báo giá trực tiếp"
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <MessageCircle size={20} color="#0068FF" />
          </div>
          <span>Liên hệ Zalo</span>
        </a>
      </div>
    </>
  );
}
