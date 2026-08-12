"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/data/companyData";
import ProductCard from "@/components/ProductCard";

export default function ProductSection() {

  const scrollLeft = () => {
    const track = document.getElementById("product-slider-track");
    if (track) {
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const track = document.getElementById("product-slider-track");
    if (track) {
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="section" id="products" style={{ background: "#fafafa" }}>
      <div className="container">
        {/* Section Header with Direct Scroll Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div className="eyebrow" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px", color: "var(--gold)" }}>
              DANH MỤC SẢN PHẨM
            </div>
            <h2 style={{ fontSize: "28px", marginTop: "6px", color: "var(--dark)", fontWeight: 500 }}>
              Vật liệu xây dựng & thiết bị
            </h2>
            <p style={{ color: "#66726d", fontSize: "14.5px", fontWeight: 400, margin: "4px 0 0" }}>
              Hưng Vinh Phát cung cấp đa dạng vật liệu và thiết bị cho mọi công trình.
            </p>
          </div>

          {/* Direct Prev / Next Buttons */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={scrollLeft}
              type="button"
              aria-label="Trượt sang trái"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "1px solid #e2e8e4",
                background: "#ffffff",
                color: "var(--green)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                outline: "none"
              }}
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollRight}
              type="button"
              aria-label="Trượt sang phải"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "1px solid var(--green)",
                background: "var(--green)",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(11, 59, 50, 0.15)",
                outline: "none"
              }}
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Snap-aligned Horizontal Scroll Track using shared ProductCard */}
        <div
          id="product-slider-track"
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            paddingBottom: "16px",
            width: "100%",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              priceText={`${product.price} đ/${product.unit}`}
              description={product.description}
              detailUrl={`/product/${product.id}`}
              style={{
                minWidth: "270px",
                maxWidth: "270px",
                scrollSnapAlign: "start",
                flexShrink: 0
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
