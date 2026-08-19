"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, ChevronRight } from "lucide-react";
import { SAMPLE_PRODUCTS, PRODUCT_CATEGORIES, BRANDS } from "@/data/companyData";
import {
  pb,
  getPbImageUrl,
  PbProductRecord,
  PbCategoryRecord,
  PbBrandRecord
} from "@/lib/pocketbase";

interface SearchBarProps {
  onClose: () => void;
}

interface SearchProductItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryName: string;
  categorySlug: string;
  image: string;
  price: string;
  unit: string;
}

interface SearchBrandItem {
  id?: string;
  name: string;
  slug: string;
  tagline?: string;
}

interface SearchCategoryItem {
  id?: string;
  name: string;
  slug: string;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProductItem[]>([]);
  const [brands, setBrands] = useState<SearchBrandItem[]>([]);
  const [categories, setCategories] = useState<SearchCategoryItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRecords, brandRecords, catRecords] = await Promise.all([
          pb.collection("products").getFullList<PbProductRecord>({ requestKey: null }),
          pb.collection("brands").getFullList<PbBrandRecord>({ requestKey: null }),
          pb.collection("categories").getFullList<PbCategoryRecord>({ requestKey: null })
        ]);

        if (prodRecords && prodRecords.length > 0) {
          setProducts(
            prodRecords.map((p) => {
              const firstImg =
                p.images && p.images.length > 0
                  ? getPbImageUrl("products", p.id, p.images[0])
                  : "/images/steel_construction.jpg";
              return {
                id: p.id,
                name: p.name,
                slug: p.slug || p.id,
                brand: p.brand,
                categoryName: p.categoryName || p.categorySlug,
                categorySlug: p.categorySlug,
                image: firstImg,
                price: p.price,
                unit: p.unit
              };
            })
          );
        }

        if (brandRecords && brandRecords.length > 0) {
          setBrands(brandRecords.map((b) => ({ id: b.id, name: b.name, slug: b.slug, tagline: b.description })));
        }

        if (catRecords && catRecords.length > 0) {
          setCategories(catRecords.map((c) => ({ id: c.id, name: c.name, slug: c.slug })));
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu tìm kiếm:", err);
      }
    }

    loadData();
  }, []);

  const displayCategories = categories.length > 0
    ? categories
    : PRODUCT_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug }));

  const displayBrands = brands.length > 0
    ? brands
    : BRANDS.map((b) => ({ name: b.name, slug: b.slug, tagline: b.description }));

  const displayProducts = products.length > 0
    ? products
    : SAMPLE_PRODUCTS.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.id,
        brand: p.brand,
        categoryName: p.categoryName,
        categorySlug: p.categorySlug,
        image: p.image || "/images/steel_construction.jpg",
        price: p.price,
        unit: p.unit
      }));

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return displayProducts.filter((p) =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q) ||
      (p.categoryName || "").toLowerCase().includes(q)
    );
  }, [query, displayProducts]);

  const filteredBrands = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return displayBrands.filter((b) =>
      (b.name || "").toLowerCase().includes(q) ||
      (b.slug || "").toLowerCase().includes(q)
    );
  }, [query, displayBrands]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(10, 23, 20, 0.75)",
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
              fontWeight: 400,
              color: "var(--dark)"
            }}
          />
          <button onClick={onClose} style={{ color: "var(--muted)", padding: "0.3rem", background: "none", border: "none", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: "450px", overflowY: "auto", padding: "1.2rem 1.5rem" }}>
          {!query.trim() ? (
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "0.8rem", fontWeight: 600 }}>
                GỢI Ý TÌM KIẾM NHANH
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {displayCategories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setQuery(cat.name)}
                    style={{
                      padding: "0.4rem 0.9rem",
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "20px",
                      fontSize: "0.82rem",
                      color: "var(--dark)",
                      cursor: "pointer"
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
                {displayBrands.slice(0, 6).map((brand) => (
                  <button
                    key={brand.slug}
                    onClick={() => setQuery(brand.name)}
                    style={{
                      padding: "0.4rem 0.9rem",
                      backgroundColor: "var(--gold-light)",
                      border: "1px solid var(--border-gold)",
                      borderRadius: "20px",
                      fontSize: "0.82rem",
                      color: "var(--gold-dark)",
                      cursor: "pointer"
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
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold-dark)", marginBottom: "0.6rem", fontWeight: 600 }}>
                    THƯƠNG HIỆU PHÙ HỢP ({filteredBrands.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {filteredBrands.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/brand/${b.slug}`}
                        onClick={onClose}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.6rem 0.9rem",
                          borderRadius: "8px",
                          backgroundColor: "var(--surface)",
                          fontSize: "0.9rem",
                          textDecoration: "none"
                        }}
                      >
                        <div>
                          <strong style={{ color: "var(--green)", fontWeight: 600 }}>{b.name}</strong>
                          {b.tagline && (
                            <span style={{ fontSize: "0.8rem", color: "var(--muted)", marginLeft: "0.6rem" }}>
                              {b.tagline}
                            </span>
                          )}
                        </div>
                        <ChevronRight size={16} color="var(--muted)" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Matched */}
              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--green)", marginBottom: "0.6rem", fontWeight: 600 }}>
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
                        key={p.id || p.slug}
                        href={`/product/${p.slug || p.id}`}
                        onClick={onClose}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "0.7rem",
                          borderRadius: "8px",
                          border: "1px solid var(--border-subtle)",
                          textDecoration: "none",
                          transition: "background 0.2s"
                        }}
                      >
                        <div style={{ width: "50px", height: "50px", borderRadius: "6px", overflow: "hidden", position: "relative", backgroundColor: "var(--surface)", flexShrink: 0 }}>
                          <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--dark)" }}>{p.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--muted)", display: "flex", gap: "0.8rem", marginTop: "2px" }}>
                            <span>Thương hiệu: <strong style={{ color: "#c6a15b" }}>{p.brand}</strong></span>
                            <span>• {p.categoryName}</span>
                            <span style={{ color: "#16a34a", fontWeight: 600 }}>• {p.price} đ/{p.unit}</span>
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
          <Link href={`/products?q=${encodeURIComponent(query)}`} onClick={onClose} style={{ color: "var(--green)", fontWeight: 600, textDecoration: "none" }}>
            Xem toàn bộ kết quả tìm kiếm →
          </Link>
        </div>
      </div>
    </div>
  );
}
