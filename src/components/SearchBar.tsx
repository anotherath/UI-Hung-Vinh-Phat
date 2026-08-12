"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, ChevronRight, Tag } from "lucide-react";
import { SAMPLE_PRODUCTS, PRODUCT_CATEGORIES, BRANDS } from "@/data/companyData";

interface SearchBarProps {
  onClose: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = query.trim()
    ? SAMPLE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredBrands = query.trim()
    ? BRANDS.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(10, 23, 20, 0.7)",
        backdropFilter: "blur(8px)",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          border: "1px solid var(--border-subtle)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Field */}
        <div style={{ display: "flex", alignItems: "center", padding: "1.2rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", gap: "1rem" }}>
          <Search size={22} color="var(--green)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập tên sản phẩm, thương hiệu (VD: Hòa Phát, Hoa Sen, Gạch Lustra, Tuslo)..."
            autoFocus
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "1.05rem",
              fontFamily: "inherit",
              fontWeight: 300,
              color: "var(--dark)"
            }}
          />
          <button onClick={onClose} style={{ color: "var(--muted)", padding: "0.3rem" }}>
            <X size={20} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: "450px", overflowY: "auto", padding: "1.2rem 1.5rem" }}>
          {!query.trim() ? (
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "0.8rem", fontWeight: 500 }}>
                GỢI Ý TÌM KIẾM NHANH
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setQuery(cat.name)}
                    style={{
                      padding: "0.4rem 0.9rem",
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "20px",
                      fontSize: "0.82rem",
                      color: "var(--dark)"
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
                {BRANDS.slice(0, 5).map((brand) => (
                  <button
                    key={brand.slug}
                    onClick={() => setQuery(brand.name)}
                    style={{
                      padding: "0.4rem 0.9rem",
                      backgroundColor: "var(--gold-light)",
                      border: "1px solid var(--border-gold)",
                      borderRadius: "20px",
                      fontSize: "0.82rem",
                      color: "var(--gold-dark)"
                    }}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Brands Matched */}
              {filteredBrands.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold-dark)", marginBottom: "0.6rem", fontWeight: 500 }}>
                    THƯƠNG HIỆU PHÙ HỢP ({filteredBrands.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {filteredBrands.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/products?brand=${encodeURIComponent(b.name)}`}
                        onClick={onClose}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.6rem 0.9rem",
                          borderRadius: "8px",
                          backgroundColor: "var(--surface)",
                          fontSize: "0.9rem"
                        }}
                      >
                        <div>
                          <strong style={{ color: "var(--green)", fontWeight: 500 }}>{b.name}</strong>
                          <span style={{ fontSize: "0.8rem", color: "var(--muted)", marginLeft: "0.6rem" }}>{b.tagline}</span>
                        </div>
                        <ChevronRight size={16} color="var(--muted)" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Matched */}
              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--green)", marginBottom: "0.6rem", fontWeight: 500 }}>
                  SẢN PHẨM PHÙ HỢP ({filteredProducts.length})
                </div>
                {filteredProducts.length === 0 ? (
                  <div style={{ padding: "2rem 0", textAlign: "center", color: "var(--muted)", fontSize: "0.9rem" }}>
                    Không tìm thấy sản phẩm khớp với từ khóa "{query}". Bạn có thể gọi hotline để được tư vấn trực tiếp!
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products?search=${encodeURIComponent(p.name)}`}
                        onClick={onClose}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "0.7rem",
                          borderRadius: "8px",
                          border: "1px solid var(--border-subtle)",
                          transition: "background 0.2s"
                        }}
                      >
                        <div style={{ width: "50px", height: "50px", borderRadius: "6px", overflow: "hidden", position: "relative", backgroundColor: "var(--surface)" }}>
                          <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--dark)" }}>{p.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--muted)", display: "flex", gap: "0.8rem" }}>
                            <span>Thương hiệu: {p.brand}</span>
                            <span>| {p.categoryName}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} color="var(--green)" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: "0.9rem 1.5rem", backgroundColor: "var(--surface)", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "var(--muted)" }}>
          <span>Nhấn ESC hoặc click ngoài để đóng</span>
          <Link href="/products" onClick={onClose} style={{ color: "var(--green)", fontWeight: 500 }}>
            Xem tất cả catalogue sản phẩm →
          </Link>
        </div>
      </div>
    </div>
  );
}
