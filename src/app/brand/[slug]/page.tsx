import React from "react";
import { notFound } from "next/navigation";
import { BRANDS, SAMPLE_PRODUCTS, COMPANY_INFO } from "@/data/companyData";
import {
  pb,
  getPbImageUrl,
  PbBrandRecord,
  PbProductRecord
} from "@/lib/pocketbase";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { Phone } from "lucide-react";

export const dynamic = "force-dynamic";

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface DisplayBrandDetail {
  id?: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

interface DisplayBrandProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: string;
  unit: string;
  image: string;
  description: string;
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;

  try {
    const brands = await pb.collection("brands").getFullList<PbBrandRecord>({ requestKey: null });
    const brand = brands.find((b) => b.slug === slug || b.id === slug);
    if (brand) {
      return {
        title: `${brand.name} - Thương Hiệu Phân Phối Chính Hãng | Hưng Vinh Phát`,
        description: `${brand.description || "Thương hiệu đối tác chiến lược của Hưng Vinh Phát."} Hotline: ${COMPANY_INFO.phones[0]}.`
      };
    }
  } catch (err) {
    // fallback
  }

  const fallbackBrand = BRANDS.find((b) => b.slug === slug);
  if (!fallbackBrand) {
    return {
      title: "Thương hiệu đối tác | Hưng Vinh Phát"
    };
  }

  return {
    title: `${fallbackBrand.name} - Thương Hiệu Phân Phối Chính Hãng | Hưng Vinh Phát`,
    description: `${fallbackBrand.description} Hotline: ${COMPANY_INFO.phones[0]}.`
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;

  let currentBrand: DisplayBrandDetail | null = null;
  let brandProducts: DisplayBrandProduct[] = [];

  try {
    // 1. Lấy thông tin thương hiệu từ PocketBase
    const brandRecords = await pb.collection("brands").getFullList<PbBrandRecord>({
      requestKey: null
    });
    const foundBrand = brandRecords.find((b) => b.slug === slug || b.id === slug);

    if (foundBrand) {
      currentBrand = {
        id: foundBrand.id,
        name: foundBrand.name,
        slug: foundBrand.slug,
        image: getPbImageUrl("brands", foundBrand.id, foundBrand.image) || "/images/logo.png",
        description: foundBrand.description || ""
      };

      // 2. Lấy danh sách sản phẩm thuộc thương hiệu từ PocketBase
      const prodRecords = await pb.collection("products").getFullList<PbProductRecord>({
        requestKey: null
      });

      const brandKeywords = [foundBrand.name.toLowerCase(), foundBrand.slug.toLowerCase()];
      brandProducts = prodRecords
        .filter((p) => {
          const pBrand = (p.brand || "").toLowerCase();
          return brandKeywords.some((k) => pBrand.includes(k) || k.includes(pBrand));
        })
        .map((p) => {
          const firstImg =
            p.images && p.images.length > 0
              ? getPbImageUrl("products", p.id, p.images[0])
              : "/images/steel_construction.jpg";
          return {
            id: p.id,
            name: p.name,
            slug: p.slug || p.id,
            brand: p.brand,
            price: p.price,
            unit: p.unit,
            image: firstImg,
            description: p.description || ""
          };
        });
    }
  } catch (err) {
    console.error("Lỗi tải thông tin thương hiệu từ PocketBase:", err);
  }

  // Fallback nếu không tìm thấy trong PocketBase
  if (!currentBrand) {
    const fallbackBrand = BRANDS.find((b) => b.slug === slug);
    if (!fallbackBrand) {
      notFound();
    }
    currentBrand = {
      name: fallbackBrand.name,
      slug: fallbackBrand.slug,
      image: fallbackBrand.image || "/images/logo.png",
      description: fallbackBrand.description
    };
    brandProducts = SAMPLE_PRODUCTS.filter(
      (p) => p.brand.toLowerCase().includes(fallbackBrand.name.toLowerCase()) || fallbackBrand.name.toLowerCase().includes(p.brand.toLowerCase())
    ).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.id,
      brand: p.brand,
      price: p.price,
      unit: p.unit,
      image: p.image || "/images/steel_construction.jpg",
      description: p.description
    }));
  }

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Header Banner - Giống 100% giao diện Category Banner */}
      <section
        style={{
          minHeight: "280px",
          background: `linear-gradient(90deg, rgba(11, 59, 50, 0.92) 0%, rgba(18, 63, 54, 0.85) 100%), url('${currentBrand.image}') center/cover`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "50px 0"
        }}
      >
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--gold)", fontSize: "11px", fontWeight: 600, letterSpacing: "2.5px" }}>
            THƯƠNG HIỆU ĐỐI TÁC
          </div>
          <h1 style={{ fontSize: "36px", color: "#fff", margin: "8px 0 12px", fontWeight: 700, lineHeight: 1.25 }}>
            {currentBrand.name}
          </h1>
          <p style={{ fontSize: "15px", color: "#e0e8e4", maxWidth: "700px", lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
            {currentBrand.description}
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation Bar */}
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Thương hiệu", href: "/brands" },
          { label: currentBrand.name }
        ]}
      />

      {/* Main Products Grid Container */}
      <div className="container" style={{ paddingTop: "36px" }}>
        <div style={{ marginBottom: "24px", color: "#77827d", fontSize: "14.5px", fontWeight: 400 }}>
          Hiển thị <strong style={{ color: "var(--green)", fontWeight: 500 }}>{brandProducts.length}</strong> sản phẩm phù hợp
        </div>

        {brandProducts.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "10px", padding: "48px 24px", textAlign: "center", border: "1px solid #e8ece9" }}>
            <h3 style={{ fontSize: "20px", color: "var(--dark)", marginBottom: "8px", fontWeight: 500 }}>
              Thương hiệu {currentBrand.name} đang được cập nhật thêm sản phẩm
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
            {brandProducts.map((product) => (
              <ProductCard
                key={product.id || product.slug}
                image={product.image}
                name={product.name}
                priceText={`${product.price} đ/${product.unit}`}
                description={product.description}
                detailUrl={`/product/${product.slug || product.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
