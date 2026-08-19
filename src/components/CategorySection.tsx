import React from "react";
import Link from "next/link";
import {
  pb,
  getPbImageUrl,
  PbCategoryRecord,
  PbSiteSettingsRecord
} from "@/lib/pocketbase";
import { PRODUCT_CATEGORIES } from "@/data/companyData";

interface HomeCategoryItem {
  id?: string;
  name: string;
  slug: string;
  image: string;
}

async function getHomeCategories(): Promise<HomeCategoryItem[]> {
  try {
    // 1. Lấy cấu hình ngành hàng được chọn trong settings
    const settingsRes = await pb.collection("site_settings").getList<PbSiteSettingsRecord>(1, 1, {
      filter: 'key = "homepage_customization"',
      requestKey: null
    });
    const settings = settingsRes.items[0];
    const selectedSlugs = settings?.selectedCategories || [];

    // 2. Lấy toàn bộ ngành hàng từ PocketBase
    const catRecords = await pb.collection("categories").getFullList<PbCategoryRecord>({
      requestKey: null
    });

    if (catRecords && catRecords.length > 0) {
      if (selectedSlugs.length > 0) {
        // Lấy theo đúng danh sách slug đã chọn và thứ tự trong settings
        const matched = selectedSlugs
          .map((slug) => catRecords.find((c) => c.slug === slug))
          .filter((c): c is PbCategoryRecord => Boolean(c))
          .slice(0, 8)
          .map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            image: getPbImageUrl("categories", c.id, c.image) || "/images/steel_construction.jpg"
          }));

        if (matched.length > 0) {
          return matched;
        }
      }

      // Nếu chưa cấu hình, fallback lấy tối đa 8 ngành hàng đầu tiên từ PocketBase
      return catRecords.slice(0, 8).map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        image: getPbImageUrl("categories", c.id, c.image) || "/images/steel_construction.jpg"
      }));
    }
  } catch (err) {
    console.error("Lỗi tải danh mục trang chủ từ PocketBase:", err);
  }

  // Fallback nếu không kết nối được database
  return PRODUCT_CATEGORIES.slice(0, 8).map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image || "/images/steel_construction.jpg"
  }));
}

export default async function CategorySection() {
  const categories = await getHomeCategories();

  return (
    <section className="section">
      <div className="container">
        <div className="head" style={{ textAlign: "left", marginBottom: "28px" }}>
          <div className="eyebrow">DANH MỤC</div>
          <h2>Giải pháp vật liệu toàn diện</h2>
          <p>Từ phần thô đến hoàn thiện, lựa chọn phù hợp cho từng công trình.</p>
        </div>

        <div className="categories" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="cat"
              style={{ backgroundImage: `url('${cat.image}')` }}
            >
              <div>{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
