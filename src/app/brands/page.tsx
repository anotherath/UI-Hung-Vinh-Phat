import React from "react";
import Link from "next/link";
import { COMPANY_INFO, BRANDS } from "@/data/companyData";
import { pb, getPbImageUrl, PbBrandRecord } from "@/lib/pocketbase";
import { Phone } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export const dynamic = "force-dynamic";

interface DisplayBrand {
  id?: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  targetUrl: string;
}

async function getBrands(): Promise<DisplayBrand[]> {
  try {
    const brandRecords = await pb.collection("brands").getFullList<PbBrandRecord>({
      requestKey: null
    });

    if (brandRecords && brandRecords.length > 0) {
      return brandRecords.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        image: getPbImageUrl("brands", b.id, b.image) || "/images/logo.png",
        description: b.description || "Đối tác chiến lược Hưng Vinh Phát",
        targetUrl: `/brand/${b.slug}`
      }));
    }
  } catch (err) {
    console.error("Lỗi tải thương hiệu từ PocketBase:", err);
  }

  // Fallback
  return BRANDS.map((b) => ({
    name: b.name,
    slug: b.slug,
    image: b.image || "/images/logo.png",
    description: b.description,
    targetUrl: `/brand/${b.slug}`
  }));
}

export default async function BrandsPage() {
  const brandsList = await getBrands();

  return (
    <div style={{ backgroundColor: "#fafafa", paddingBottom: "5rem" }}>
      {/* 1. Header Banner */}
      <section style={{ backgroundColor: "#fafbf8", padding: "52px 0 36px", borderBottom: "1px solid #eee" }}>
        <div className="container">
          <div className="eyebrow" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px", color: "var(--gold)" }}>
            SHOWROOM ONLINE
          </div>
          <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--green)", margin: "8px 0 10px" }}>
            Thương Hiệu & Đối Tác Chiến Lược
          </h1>
          <p style={{ fontSize: "15px", color: "#66726d", maxWidth: "760px", lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
            Khám phá các thương hiệu vật liệu xây dựng và thiết bị uy tín hàng đầu được phân phối chính hãng kèm chứng nhận CO/CQ bởi Hưng Vinh Phát.
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation Bar */}
      <Breadcrumb items={[{ label: "Thương hiệu đối tác" }]} />

      {/* 2. DIRECT BRAND CARDS SHOWCASE */}
      <section style={{ padding: "52px 0", backgroundColor: "#fafafa" }}>
        <div className="container">
          {/* Brand Grid Showcase */}
          <div className="brand-grid">
            {brandsList.map((item) => (
              <Link
                key={item.id || item.slug}
                href={item.targetUrl}
                className="brand-card"
              >
                <div
                  className="brand-img"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                ></div>

                <div className="brand-body">
                  <b style={{ fontSize: "15.5px", color: "var(--dark)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.5px" }}>
                    {item.name}
                  </b>
                  <span style={{ fontSize: "12px", color: "#77827d", marginTop: "5px", fontWeight: 400, lineHeight: 1.45 }}>
                    {item.description}
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
