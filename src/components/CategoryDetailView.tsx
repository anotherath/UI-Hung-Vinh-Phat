"use client";

import React from "react";
import { ProductCategory, Product, COMPANY_INFO } from "@/data/companyData";
import ProductCard from "@/components/ProductCard";
import { Phone } from "lucide-react";

import Breadcrumb from "@/components/Breadcrumb";

interface CategoryDetailViewProps {
  category: ProductCategory;
  categoryProducts: Product[];
}

export default function CategoryDetailView({ category, categoryProducts }: CategoryDetailViewProps) {

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Breadcrumb Navigation Bar */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #eeeeee" }}>
        <Breadcrumb
          items={[
            { label: "Danh mục", href: "/categories" },
            { label: category.name }
          ]}
        />
      </div>

      {/* Minimal Category Header Banner */}
      <section
        style={{
          minHeight: "280px",
          background: `linear-gradient(90deg, rgba(11, 59, 50, 0.92) 0%, rgba(18, 63, 54, 0.85) 100%), url('${category.image}') center/cover`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "50px 0"
        }}
      >
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--gold)", fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px" }}>
            DANH MỤC SẢN PHẨM
          </div>
          <h1 style={{ fontSize: "36px", color: "#fff", margin: "8px 0 12px", fontWeight: 700, lineHeight: 1.25 }}>
            {category.name}
          </h1>
          <p style={{ fontSize: "15px", color: "#e0e8e4", maxWidth: "700px", lineHeight: 1.7, fontWeight: 400 }}>
            {category.description}
          </p>
        </div>
      </section>

      {/* Main Products Catalogue Container */}
      <div className="container" style={{ paddingTop: "36px" }}>
        
        {/* Subheader Info */}
        <div style={{ marginBottom: "24px", color: "#77827d", fontSize: "14.5px", fontWeight: 400 }}>
          Hiển thị <strong style={{ color: "var(--green)", fontWeight: 500 }}>{categoryProducts.length}</strong> sản phẩm phù hợp
        </div>

        {/* Category Products Grid using shared ProductCard */}
        {categoryProducts.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "48px 24px", textAlign: "center", border: "1px solid #e8ece9" }}>
            <h3 style={{ fontSize: "20px", color: "var(--dark)", marginBottom: "8px", fontWeight: 500 }}>
              Danh mục {category.name} đang được cập nhật thêm sản phẩm
            </h3>
            <p style={{ color: "#77827d", marginBottom: "20px", fontWeight: 400 }}>
              Liên hệ hotline Hưng Vinh Phát để nhận tư vấn quy cách & báo giá trực tiếp từ kho hàng.
            </p>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
              className="btn primary"
              style={{ fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Phone size={15} />
              <span>Gọi hotline tư vấn {COMPANY_INFO.phones[0]}</span>
            </a>
          </div>
        ) : (
          <div className="products">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                priceText={`${product.price} đ/${product.unit}`}
                description={product.description}
                detailUrl={`/product/${product.id}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
