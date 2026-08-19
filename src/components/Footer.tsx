"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY_INFO, PRODUCT_CATEGORIES, BRANDS } from "@/data/companyData";
import { pb, PbCategoryRecord, PbBrandRecord } from "@/lib/pocketbase";

interface FooterLinkItem {
  id?: string;
  name: string;
  slug: string;
}

export default function Footer() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<FooterLinkItem[]>([]);
  const [brands, setBrands] = useState<FooterLinkItem[]>([]);

  useEffect(() => {
    async function loadFooterData() {
      try {
        const [catRes, brandRes] = await Promise.all([
          pb.collection("categories").getFullList<PbCategoryRecord>({ requestKey: null }),
          pb.collection("brands").getFullList<PbBrandRecord>({ requestKey: null })
        ]);

        if (catRes && catRes.length > 0) {
          setCategories(catRes.slice(0, 7).map((c) => ({ id: c.id, name: c.name, slug: c.slug })));
        }
        if (brandRes && brandRes.length > 0) {
          setBrands(brandRes.slice(0, 7).map((b) => ({ id: b.id, name: b.name, slug: b.slug })));
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu Footer từ PocketBase:", err);
      }
    }

    loadFooterData();
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const displayCategories = categories.length > 0
    ? categories
    : PRODUCT_CATEGORIES.slice(0, 7).map((c) => ({ name: c.name, slug: c.slug }));

  const displayBrands = brands.length > 0
    ? brands
    : BRANDS.slice(0, 7).map((b) => ({ name: b.name, slug: b.slug }));

  return (
    <footer>
      <div
        className="container foot"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "36px",
          alignItems: "start"
        }}
      >
        {/* Cột 1: Thông tin công ty & MST */}
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", textDecoration: "none" }}>
            <div style={{ position: "relative", width: "54px", height: "54px", flexShrink: 0, borderRadius: "10px", overflow: "hidden" }}>
              <img
                src="/images/logo.png"
                alt="Logo Hưng Vinh Phát"
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }}
              />
            </div>
            <span style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>
              HƯNG VINH PHÁT
            </span>
          </Link>

          <p style={{ color: "var(--gold)", fontWeight: 600, marginBottom: "4px" }}>
            Vật liệu xây dựng & thiết bị Hoa Sen
          </p>
          <p style={{ fontSize: "13.5px", color: "#c0c8c5", lineHeight: 1.6 }}>
            Chất lượng tạo niềm tin – Đồng hành cùng công trình.
          </p>
          <p style={{ marginTop: "12px", color: "var(--gold)", fontSize: "13px" }}>
            MST: {COMPANY_INFO.mst} (Thành lập {COMPANY_INFO.foundedDate})
          </p>
        </div>

        {/* Cột 2: Thông tin liên hệ */}
        <div>
          <h3>Liên hệ</h3>
          <p>Hotline: <a href={`tel:${COMPANY_INFO.phoneRaw[0]}`} style={{ color: "#fff", fontWeight: 700 }}>{COMPANY_INFO.phones[0]}</a></p>
          <p>Hotline 2: <a href={`tel:${COMPANY_INFO.phoneRaw[1]}`} style={{ color: "#fff", fontWeight: 700 }}>{COMPANY_INFO.phones[1]}</a></p>
          <p>Email: <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: "#c0c8c5" }}>{COMPANY_INFO.email}</a></p>
          <p style={{ fontSize: "13px", color: "#c0c8c5", lineHeight: 1.5 }}>Địa chỉ: {COMPANY_INFO.address}</p>
        </div>

        {/* Cột 3: Danh mục ngành hàng động từ PocketBase */}
        <div>
          <h3>Ngành hàng</h3>
          {displayCategories.map((cat) => (
            <p key={cat.slug} style={{ marginBottom: "8px" }}>
              <Link
                href={`/category/${cat.slug}`}
                style={{ color: "#c0c8c5", textDecoration: "none", fontSize: "13.5px", transition: "color 0.2s" }}
              >
                {cat.name}
              </Link>
            </p>
          ))}
        </div>

        {/* Cột 4: Thương hiệu đối tác động từ PocketBase */}
        <div>
          <h3>Thương hiệu</h3>
          {displayBrands.map((brand) => (
            <p key={brand.slug} style={{ marginBottom: "8px" }}>
              <Link
                href={`/brand/${brand.slug}`}
                style={{ color: "#c0c8c5", textDecoration: "none", fontSize: "13.5px", transition: "color 0.2s" }}
              >
                {brand.name}
              </Link>
            </p>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="container copy" style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "center", color: "#88928e", fontSize: "13px" }}>
        © {new Date().getFullYear()} {COMPANY_INFO.shortName}. All rights reserved.
      </div>
    </footer>
  );
}
