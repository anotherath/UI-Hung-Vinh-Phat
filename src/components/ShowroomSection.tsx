import React from "react";
import Link from "next/link";
import {
  pb,
  getPbImageUrl,
  PbBrandRecord,
  PbSiteSettingsRecord
} from "@/lib/pocketbase";

interface HomeBrandItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  targetUrl: string;
}

async function getHomeBrands(): Promise<HomeBrandItem[]> {
  try {
    // 1. Lấy danh sách thương hiệu được chọn trong settings
    const settingsRes = await pb.collection("site_settings").getList<PbSiteSettingsRecord>(1, 1, {
      filter: 'key = "homepage_customization"',
      requestKey: null
    });
    const settings = settingsRes.items[0];
    const selectedSlugs = settings?.selectedBrands || [];

    // 2. Lấy toàn bộ thương hiệu từ PocketBase
    const brandRecords = await pb.collection("brands").getFullList<PbBrandRecord>({
      requestKey: null
    });

    if (brandRecords && brandRecords.length > 0) {
      if (selectedSlugs.length > 0) {
        // Khớp theo đúng danh sách thương hiệu đã chọn và thứ tự trong settings (tối đa 16 cái)
        const matched = selectedSlugs
          .map((slug) => brandRecords.find((b) => b.slug === slug))
          .filter((b): b is PbBrandRecord => Boolean(b))
          .slice(0, 16)
          .map((b) => ({
            id: b.id,
            name: b.name,
            slug: b.slug,
            image: getPbImageUrl("brands", b.id, b.image) || "/images/logo.png",
            description: b.description || "Đối tác chiến lược Hưng Vinh Phát",
            targetUrl: `/brand/${b.slug}`
          }));

        if (matched.length > 0) {
          return matched;
        }
      }

      // Fallback lấy 16 thương hiệu đầu tiên từ PocketBase
      return brandRecords.slice(0, 16).map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        image: getPbImageUrl("brands", b.id, b.image) || "/images/logo.png",
        description: b.description || "Đối tác chiến lược Hưng Vinh Phát",
        targetUrl: `/brand/${b.slug}`
      }));
    }
  } catch (err) {
    console.error("Lỗi tải thương hiệu showroom từ PocketBase:", err);
  }

  return [];
}

export default async function ShowroomSection() {
  const brands = await getHomeBrands();

  if (brands.length === 0) return null;

  return (
    <section className="section" id="showroom" style={{ background: "#fff" }}>
      <div className="container">
        <div className="head" style={{ textAlign: "left", marginBottom: "28px" }}>
          <div className="eyebrow">SHOWROOM ONLINE</div>
          <h2>Chọn thương hiệu để xem sản phẩm</h2>
          <p>Bấm vào từng thương hiệu để mở danh sách sản phẩm tương ứng.</p>
        </div>

        <div className="brand-grid">
          {brands.map((item) => (
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
                <b>{item.name.toUpperCase()}</b>
                <span>{item.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
