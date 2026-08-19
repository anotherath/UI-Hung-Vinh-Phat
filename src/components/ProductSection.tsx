import React from "react";
import {
  pb,
  getPbImageUrl,
  PbProductRecord,
  PbSiteSettingsRecord
} from "@/lib/pocketbase";
import { SAMPLE_PRODUCTS } from "@/data/companyData";
import ProductSlider, { HomeProductItem } from "@/components/ProductSlider";

async function getHomeProducts(): Promise<HomeProductItem[]> {
  try {
    // 1. Lấy danh sách sản phẩm được chọn từ settings
    const settingsRes = await pb.collection("site_settings").getList<PbSiteSettingsRecord>(1, 1, {
      filter: 'key = "homepage_customization"',
      requestKey: null
    });
    const settings = settingsRes.items[0];
    const selectedKeys = settings?.selectedProducts || [];

    // 2. Lấy toàn bộ sản phẩm từ PocketBase
    const prodRecords = await pb.collection("products").getFullList<PbProductRecord>({
      requestKey: null
    });

    if (prodRecords && prodRecords.length > 0) {
      if (selectedKeys.length > 0) {
        // Khớp theo đúng danh sách sản phẩm đã chọn và thứ tự trong settings
        const matched = selectedKeys
          .map((key) => prodRecords.find((p) => p.slug === key || p.id === key))
          .filter((p): p is PbProductRecord => Boolean(p))
          .slice(0, 8)
          .map((p) => {
            const firstImg =
              p.images && p.images.length > 0
                ? getPbImageUrl("products", p.id, p.images[0])
                : "/images/steel_construction.jpg";
            return {
              id: p.id,
              name: p.name,
              slug: p.slug,
              price: p.price,
              unit: p.unit,
              image: firstImg,
              description: p.description || "",
              detailUrl: `/product/${p.slug || p.id}`
            };
          });

        if (matched.length > 0) {
          return matched;
        }
      }

      // Fallback lấy tối đa 8 sản phẩm đầu tiên từ PocketBase
      return prodRecords.slice(0, 8).map((p) => {
        const firstImg =
          p.images && p.images.length > 0
            ? getPbImageUrl("products", p.id, p.images[0])
            : "/images/steel_construction.jpg";
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          unit: p.unit,
          image: firstImg,
          description: p.description || "",
          detailUrl: `/product/${p.slug || p.id}`
        };
      });
    }
  } catch (err) {
    console.error("Lỗi tải sản phẩm trang chủ từ PocketBase:", err);
  }

  // Fallback nếu không có kết nối
  return SAMPLE_PRODUCTS.slice(0, 8).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.id,
    price: p.price,
    unit: p.unit,
    image: p.image || "/images/steel_construction.jpg",
    description: p.description,
    detailUrl: `/product/${p.id}`
  }));
}

export default async function ProductSection() {
  const products = await getHomeProducts();

  return (
    <section className="section" id="products" style={{ background: "#fafafa" }}>
      <div className="container">
        <ProductSlider products={products} />
      </div>
    </section>
  );
}
