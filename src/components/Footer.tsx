"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY_INFO } from "@/data/companyData";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer>
      <div className="container foot">
        {/* Column 1: Logo (Rounded 4 Corners) & Company Info */}
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
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
          <p>Chất lượng tạo niềm tin – Đồng hành cùng công trình.</p>
          <p style={{ marginTop: "12px", color: "var(--gold)", fontSize: "13px" }}>
            MST: {COMPANY_INFO.mst} (Thành lập {COMPANY_INFO.foundedDate})
          </p>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h3>Liên hệ</h3>
          <p>Hotline: <a href={`tel:${COMPANY_INFO.phoneRaw[0]}`} style={{ color: "#fff", fontWeight: 700 }}>{COMPANY_INFO.phones[0]}</a></p>
          <p>Hotline 2: <a href={`tel:${COMPANY_INFO.phoneRaw[1]}`} style={{ color: "#fff", fontWeight: 700 }}>{COMPANY_INFO.phones[1]}</a></p>
          <p>Email: {COMPANY_INFO.email}</p>
          <p>Địa chỉ: {COMPANY_INFO.address}</p>
        </div>

        {/* Column 3: Product Categories */}
        <div>
          <h3>Danh mục</h3>
          <p><Link href="/category/sat-thep">Sắt & thép xây dựng</Link></p>
          <p><Link href="/category/ton-nhom">Tôn & nhôm Hoa Sen</Link></p>
          <p><Link href="/category/gach-men">Gạch men ốp lát</Link></p>
          <p><Link href="/category/thiet-bi-ve-sinh">Thiết bị vệ sinh</Link></p>
          <p><Link href="/category/gach-ngoi">Ngói & mái lợp</Link></p>
        </div>
      </div>

      {/* Copyright */}
      <div className="container copy">
        © {new Date().getFullYear()} {COMPANY_INFO.shortName}. All rights reserved.
      </div>
    </footer>
  );
}
