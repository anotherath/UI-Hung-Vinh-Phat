"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  KeyRound,
  ArrowLeft
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  // Authentication State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (password === "123456" || password.length >= 4) {
        if (typeof window !== "undefined") {
          localStorage.setItem("hvp_admin_auth", "true");
        }
        router.push("/admin/dashboard");
      } else {
        setErrorMsg("Mật khẩu không đúng (Mật khẩu dùng thử: 123456).");
      }
    }, 400);
  };

  const handleAutoFill = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setUsername("admin@hungvinhphat.vn");
    setPassword("123456");
    setErrorMsg("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#081d18",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-main, sans-serif)"
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          background: "radial-gradient(circle at 50% 30%, #0d382f 0%, #081d18 70%)"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "rgba(11, 59, 50, 0.45)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(198, 161, 91, 0.3)",
            borderRadius: "16px",
            padding: "36px 32px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)"
          }}
        >
          {/* Back to public website button */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "13px",
              marginBottom: "24px",
              textDecoration: "none",
              transition: "color 0.2s"
            }}
          >
            <ArrowLeft size={16} />
            <span>Về trang chủ</span>
          </Link>

          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(198, 161, 91, 0.15)",
                border: "1px solid rgba(198, 161, 91, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
                color: "#c6a15b"
              }}
            >
              <Lock size={26} />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
              Đăng Nhập Quản Trị
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.7)" }}>
              Hệ thống quản lý vật liệu xây dựng Hưng Vinh Phát
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#fca5a5",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                marginBottom: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "rgba(255, 255, 255, 0.9)", marginBottom: "6px" }}>
                Tên đăng nhập / Email
              </label>
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255, 255, 255, 0.4)" }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@hungvinhphat.vn"
                  style={{
                    width: "100%",
                    padding: "11px 14px 11px 42px",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "rgba(255, 255, 255, 0.9)", marginBottom: "6px" }}>
                Mật khẩu
              </label>
              <div style={{ position: "relative" }}>
                <KeyRound size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255, 255, 255, 0.4)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "11px 42px 11px 42px",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255, 255, 255, 0.5)", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", fontSize: "13px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "rgba(255, 255, 255, 0.8)" }}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ accentColor: "#c6a15b" }} />
                Ghi nhớ đăng nhập
              </label>
              <button
                type="button"
                onClick={handleAutoFill}
                style={{
                  background: "rgba(198, 161, 91, 0.15)",
                  border: "1px solid rgba(198, 161, 91, 0.3)",
                  color: "#c6a15b",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "11.5px",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                ⚡ Điền nhanh admin
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #c6a15b 0%, #d4b472 100%)",
                color: "#0a1714",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: isLoading ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 20px rgba(198, 161, 91, 0.3)"
              }}
            >
              {isLoading ? <span>Đang xác thực...</span> : <><span>Đăng nhập Admin</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
            <ShieldCheck size={15} color="#c6a15b" />
            <span>Cổng thông tin quản trị nội bộ • Hưng Vinh Phát</span>
          </div>
        </div>
      </div>
    </div>
  );
}
