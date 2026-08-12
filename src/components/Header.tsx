"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Phone, Menu, X } from "lucide-react";
import { COMPANY_INFO } from "@/data/companyData";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setMobileMenuOpen(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/categories", label: "Thương hiệu" },
    { href: "/about", label: "Về chúng tôi" },
  ];

  return (
    <>
      {/* Top Bar — Sleek Single Horizontal Row */}
      <div
        className="top"
        style={{
          background: "#0b3b32",
          color: "#e0e8e4",
          fontSize: "13px",
          padding: "8px 0",
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <div
          className="container top-bar-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap"
          }}
        >
          {/* Left Company & Subtitle */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: 500, color: "#ffffff" }}>
              <span className="top-bar-prefix">Công ty SX TM & DV </span>
              <strong style={{ color: "#ffffff", fontWeight: 700 }}>HƯNG VINH PHÁT</strong>
            </span>
            <span className="top-bar-divider" style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
            <span className="top-bar-sub" style={{ color: "var(--gold)", fontWeight: 400 }}>
              Vật liệu xây dựng & thiết bị
            </span>
          </div>

          {/* Right Hotlines */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, whiteSpace: "nowrap" }}>
            <span className="top-bar-hotline-label" style={{ color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Phone size={13} strokeWidth={2} /> Hotline:
            </span>
            <span className="top-bar-hotline-icon" style={{ color: "var(--gold)", display: "none", alignItems: "center" }}>
              <Phone size={12} strokeWidth={2} />
            </span>
            <a href={`tel:${COMPANY_INFO.phoneRaw[0]}`} style={{ color: "#ffffff", fontWeight: 600 }}>
              {COMPANY_INFO.phones[0]}
            </a>
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
            <a href={`tel:${COMPANY_INFO.phoneRaw[1]}`} style={{ color: "#ffffff", fontWeight: 600 }}>
              {COMPANY_INFO.phones[1]}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header Nav */}
      <header>
        <div className="container nav">
          {/* Logo (Rounded 4 Corners) */}
          <Link href="/" className="logo" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ position: "relative", width: "54px", height: "54px", flexShrink: 0, borderRadius: "10px", overflow: "hidden" }}>
              <Image
                src="/images/logo.png"
                alt="Logo Hưng Vinh Phát"
                fill
                sizes="54px"
                style={{ objectFit: "contain", borderRadius: "10px" }}
                priority
              />
            </div>
            <span className="logo-text" style={{ fontSize: "19px", fontWeight: 800, color: "var(--dark)", letterSpacing: "-0.5px" }}>
              HƯNG VINH PHÁT
            </span>
          </Link>

          {/* Desktop Nav (Balanced Font Weight 500) */}
          <nav className="menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: pathname === link.href ? "var(--gold)" : "var(--dark)",
                  fontWeight: pathname === link.href ? 600 : 500
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar & Hotline Action Group */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Search Input Box */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center"
              }}
              className="search-box-header"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm..."
                style={{
                  padding: "7px 32px 7px 12px",
                  borderRadius: "20px",
                  border: "1px solid #dcdcdc",
                  fontSize: "13px",
                  outline: "none",
                  width: "160px",
                  transition: "all 0.2s ease",
                  fontWeight: 400
                }}
              />
              <button
                type="submit"
                aria-label="Tìm kiếm sản phẩm"
                style={{
                  position: "absolute",
                  right: "6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#777",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px"
                }}
              >
                <Search size={15} />
              </button>
            </form>

            {/* Header Call Button */}
            <a
              href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
              className="btn primary header-call-btn"
              style={{
                padding: "8px 14px",
                fontSize: "13px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                fontWeight: 600
              }}
            >
              <Phone size={14} />
              <span>Gọi báo giá</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px"
              }}
              aria-label="Toggle Navigation Menu"
              className="mobile-hamburger"
            >
              {mobileMenuOpen ? <X size={26} color="var(--dark)" /> : <Menu size={26} color="var(--dark)" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "#ffffff",
              borderTop: "1px solid #eee",
              padding: "16px 20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}
          >
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} style={{ marginTop: "4px" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm sản phẩm..."
                  style={{
                    width: "100%",
                    padding: "9px 36px 9px 14px",
                    borderRadius: "8px",
                    border: "1px solid #dcdcdc",
                    fontSize: "14px"
                  }}
                />
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", color: "#777" }}
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "15px",
                  fontWeight: pathname === link.href ? 600 : 500,
                  color: pathname === link.href ? "var(--gold)" : "var(--dark)",
                  padding: "8px 0",
                  borderBottom: "1px solid #f5f5f5"
                }}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
              className="btn primary"
              style={{
                textAlign: "center",
                marginTop: "8px",
                padding: "10px",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
            >
              <Phone size={15} />
              <span>Hotline: {COMPANY_INFO.phones[0]}</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
