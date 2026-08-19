"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SAMPLE_PRODUCTS, COMPANY_INFO } from "@/data/companyData";
import { pb, getPbImageUrl, PbProductRecord } from "@/lib/pocketbase";
import ProductCard from "@/components/ProductCard";
import { Phone, SearchX, Loader2 } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

interface DisplayProduct {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  brand: string;
  price: string;
  unit: string;
  image: string;
  description: string;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const qParam = searchParams.get("q");

  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-redirect /products?category=xxx to /category/xxx if category query is present
  useEffect(() => {
    if (categoryParam) {
      router.replace(`/category/${categoryParam}`);
    }
  }, [categoryParam, router]);

  // Load products from PocketBase
  useEffect(() => {
    async function loadProducts() {
      try {
        const records = await pb.collection("products").getFullList<PbProductRecord>({
          requestKey: null
        });
        if (records && records.length > 0) {
          const mapped: DisplayProduct[] = records.map((p) => {
            const firstImg =
              p.images && p.images.length > 0
                ? getPbImageUrl("products", p.id, p.images[0])
                : "/images/steel_construction.jpg";
            return {
              id: p.id,
              name: p.name,
              slug: p.slug || p.id,
              categorySlug: p.categorySlug,
              categoryName: p.categoryName || p.categorySlug,
              brand: p.brand,
              price: p.price,
              unit: p.unit,
              image: firstImg,
              description: p.description || ""
            };
          });
          setProducts(mapped);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("Lỗi tải sản phẩm từ PocketBase:", err);
      }

      // Fallback nếu không có database
      const fallbackList: DisplayProduct[] = SAMPLE_PRODUCTS.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.id,
        categorySlug: p.categorySlug,
        categoryName: p.categoryName,
        brand: p.brand,
        price: p.price,
        unit: p.unit,
        image: p.image || "/images/steel_construction.jpg",
        description: p.description
      }));
      setProducts(fallbackList);
      setIsLoading(false);
    }

    loadProducts();
  }, []);

  // Filter products dynamically based on search term
  const filteredProducts = useMemo(() => {
    if (!qParam || !qParam.trim()) return products;
    const query = qParam.trim().toLowerCase();
    return products.filter((p) =>
      (p.name || "").toLowerCase().includes(query) ||
      (p.description || "").toLowerCase().includes(query) ||
      (p.brand || "").toLowerCase().includes(query) ||
      (p.categoryName || "").toLowerCase().includes(query) ||
      (p.categorySlug || "").toLowerCase().includes(query)
    );
  }, [qParam, products]);

  const isSearchMode = Boolean(qParam && qParam.trim());

  if (isLoading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <Loader2 size={32} color="#c6a15b" className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
        <div style={{ fontSize: "14px", color: "#66726d" }}>Đang tải danh sách sản phẩm...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Header Banner */}
      <section className="section" style={{ background: "#fafbf8", borderBottom: "1px solid #eee", padding: "52px 0 36px" }}>
        <div className="container">
          <div className="eyebrow">
            {isSearchMode ? "KẾT QUẢ TÌM KIẾM SẢN PHẨM" : "DANH MỤC VẬT LIỆU TOÀN DIỆN"}
          </div>
          <h1 style={{ fontSize: "36px", color: "var(--green)", margin: "8px 0 10px", fontWeight: 700 }}>
            {isSearchMode ? `Tìm kiếm: "${qParam}"` : "Tất Cả Sản Phẩm"}
          </h1>
          <p style={{ color: "#66726d", maxWidth: "720px", fontSize: "15px", lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
            {isSearchMode
              ? `Hiển thị các sản phẩm và vật liệu xây dựng phù hợp với từ khóa "${qParam}" từ tổng kho Hưng Vinh Phát.`
              : "Khám phá trọn bộ danh mục vật liệu xây dựng phần thô & thiết bị được Hưng Vinh Phát phân phối chính hãng kèm chứng nhận CO/CQ rõ ràng."}
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation Bar */}
      <Breadcrumb
        items={
          isSearchMode
            ? [{ label: "Tất cả sản phẩm", href: "/products" }, { label: `Tìm kiếm: "${qParam}"` }]
            : [{ label: "Tất cả sản phẩm" }]
        }
      />

      {/* Main Products Container */}
      <div className="container" style={{ paddingTop: "32px" }}>
        {/* Results Info Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ color: "#77827d", fontSize: "14.5px", fontWeight: 400 }}>
            {isSearchMode ? (
              <>Tìm thấy <strong style={{ color: "var(--green)", fontWeight: 500 }}>{filteredProducts.length}</strong> sản phẩm cho từ khóa "{qParam}"</>
            ) : (
              <>Hiển thị <strong style={{ color: "var(--green)", fontWeight: 500 }}>{filteredProducts.length}</strong> sản phẩm phù hợp</>
            )}
          </div>
        </div>

        {/* Products Grid or Minimalist Empty Search State */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              padding: "48px 20px",
              textAlign: "center",
              maxWidth: "680px",
              margin: "0 auto 40px"
            }}
          >
            <SearchX size={36} strokeWidth={1.25} style={{ color: "var(--gold)", marginBottom: "14px" }} />

            <h3 style={{ fontSize: "20px", color: "var(--dark)", fontWeight: 500, marginBottom: "8px" }}>
              Không tìm thấy sản phẩm cho từ khóa <span style={{ color: "var(--green)", fontWeight: 500 }}>"{qParam}"</span>
            </h3>
            <p style={{ color: "#77827d", fontSize: "14px", fontWeight: 400, margin: "0 auto 24px", lineHeight: 1.6 }}>
              Bạn có thể thử tìm kiếm từ khóa khác (như <em>thép, tôn, gạch, bồn cầu...</em>) hoặc gọi điện trực tiếp cho tư vấn viên Hưng Vinh Phát.
            </p>

            <div>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  background: "var(--green)",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Phone size={14} />
                <span>Gọi hotline tư vấn {COMPANY_INFO.phones[0]}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="products">
            {filteredProducts.map((product) => (
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center", color: "#66726d", fontWeight: 400 }}>Đang tải danh sách sản phẩm...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
