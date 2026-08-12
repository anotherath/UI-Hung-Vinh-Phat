"use client";

import React from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/data/companyData";
import { Phone } from "lucide-react";

interface BrandCardItem {
  name: string;
  sub: string;
  img: string;
  categorySlug: string;
}

const SHOWROOM_BRANDS: BrandCardItem[] = [
  { name: "Hoa Sen", sub: "Tôn mạ • Thép • Ống thép • Gạch • Ngói", img: "/images/roofing_aluminum.jpg", categorySlug: "ton-nhom" },
  { name: "Hòa Phát", sub: "Sắt • Thép xây dựng • Ống thép", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" },
  { name: "Lustile", sub: "Gạch ốp lát Porcelain cao cấp", img: "/images/ceramic_tiles.jpg", categorySlug: "gach-men" },
  { name: "Tuslo", sub: "Thiết bị nhà tắm & vệ sinh cao cấp", img: "/images/sanitary_ware.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Lustime", sub: "Ngói tráng men siêu nhẹ", img: "/images/roof_tiles.jpg", categorySlug: "gach-ngoi" },
  { name: "Trường Thành", sub: "Nhôm hệ • Nhôm định hình • Phụ kiện", img: "/images/plastic_panel.jpg", categorySlug: "ton-nhom" },
  { name: "Lustra", sub: "Gạch men cẩm thạch Ấn Độ", img: "/images/wood_material.jpg", categorySlug: "gach-men" },
  { name: "Đức Việt", sub: "Sắt • Thép xây dựng móng", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" },
  { name: "Olympic", sub: "Tôn mạ màu • Tấm lợp cách nhiệt", img: "/images/roofing_aluminum.jpg", categorySlug: "ton-nhom" },
  { name: "Vtec", sub: "Tôn mạ • Vật liệu lợp mái", img: "/images/hero_bright_architecture.jpg", categorySlug: "ton-nhom" },
  { name: "Ngân Hoa", sub: "Ống nhựa & Phụ kiện cấp thoát nước", img: "/images/plastic_panel.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Nam Dương", sub: "Ống nhựa & Phụ kiện nhựa", img: "/images/plastic_panel.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Việt Xô", sub: "Nhựa • Ống & phụ kiện công trình", img: "/images/plastic_panel.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Việt Đức", sub: "Thép xây dựng • Thép cuộn", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" },
  { name: "VAS", sub: "Thép xây dựng • Thép móng công trình", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" }
];

import Breadcrumb from "@/components/Breadcrumb";

export default function CategoriesPage() {
  return (
    <div style={{ backgroundColor: "#fafafa", paddingBottom: "5rem" }}>
      {/* Breadcrumb Navigation Bar */}
      <Breadcrumb items={[{ label: "Danh mục sản phẩm" }]} />
      
      {/* 1. Header Banner - BOLD H1 */}
      <section style={{ backgroundColor: "#fafbf8", padding: "52px 0 36px", borderBottom: "1px solid #eee" }}>
        <div className="container">
          <div className="eyebrow" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px", color: "var(--gold)" }}>
            SHOWROOM ONLINE
          </div>
          <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--green)", margin: "8px 0 10px" }}>
            Chọn thương hiệu để xem sản phẩm
          </h1>
          <p style={{ fontSize: "15px", color: "#66726d", maxWidth: "760px", lineHeight: 1.7, fontWeight: 400 }}>
            Bấm vào từng thương hiệu để mở danh mục sản phẩm tương ứng và nhận báo giá trực tiếp từ kho Hưng Vinh Phát.
          </p>
        </div>
      </section>

      {/* 2. DIRECT BRAND CARDS SHOWCASE */}
      <section style={{ padding: "52px 0", backgroundColor: "#fafafa" }}>
        <div className="container">
          
          {/* Brand Grid Showcase */}
          <div className="brand-grid">
            {SHOWROOM_BRANDS.map((item) => (
              <Link
                key={item.name}
                href={`/category/${item.categorySlug}`}
                className="brand-card"
              >
                {/* Clean Product Photo Banner */}
                <div
                  className="brand-img"
                  style={{
                    backgroundImage: `url('${item.img}')`
                  }}
                ></div>

                {/* Card Title & Subtitle */}
                <div className="brand-body">
                  <b style={{ fontSize: "15.5px", color: "var(--dark)", textTransform: "uppercase", fontWeight: 500, letterSpacing: "0.5px" }}>
                    {item.name}
                  </b>
                  <span style={{ fontSize: "12px", color: "#77827d", marginTop: "5px", fontWeight: 400, lineHeight: 1.45 }}>
                    {item.sub}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Support Callout Box */}
          <div
            className="categories-callout-box"
            style={{
              marginTop: "40px",
              padding: "24px 30px",
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #e8ece8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.02)"
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--dark)", marginBottom: "3px" }}>
                Bạn cần tìm thương hiệu hoặc quy cách chưa có trong danh mục?
              </div>
              <div style={{ fontSize: "13px", color: "#66726d", fontWeight: 400 }}>
                Hưng Vinh Phát hỗ trợ đặt hàng quy cách riêng trực tiếp từ nhà máy theo hợp đồng lớn.
              </div>
            </div>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
              style={{
                background: "var(--green)",
                color: "#ffffff",
                padding: "10px 18px",
                borderRadius: "6px",
                fontSize: "13.5px",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0
              }}
            >
              <Phone size={15} />
              <span>Gọi Hotline {COMPANY_INFO.phones[0]}</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
