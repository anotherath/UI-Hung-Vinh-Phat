"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  ExternalLink,
  CheckCircle2,
  Sliders,
  Loader2,
  RefreshCw
} from "lucide-react";
import {
  pb,
  getPbImageUrl,
  PbProductRecord,
  PbCategoryRecord,
  PbBrandRecord,
  PbQuoteRecord,
  PbSiteSettingsRecord
} from "@/lib/pocketbase";
import ProductsTab, { AdminProductItem } from "./components/ProductsTab";
import CategoriesTab, { AdminCategoryItem } from "./components/CategoriesTab";
import BrandsTab, { AdminBrandItem } from "./components/BrandsTab";
import QuotesTab, { AdminQuoteItem } from "./components/QuotesTab";
import CustomizationTab from "./components/CustomizationTab";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "brands" | "quotes" | "customization">("products");

  // Data States
  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [categoriesList, setCategoriesList] = useState<AdminCategoryItem[]>([]);
  const [brandsList, setBrandsList] = useState<AdminBrandItem[]>([]);
  const [quotes, setQuotes] = useState<AdminQuoteItem[]>([]);

  // Site Settings States
  const [siteSettingsId, setSiteSettingsId] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<string>("/images/steel_construction.jpg");
  const [aboutImage, setAboutImage] = useState<string>("/images/sanitary_ware.jpg");
  const [selectedHomeCatSlugs, setSelectedHomeCatSlugs] = useState<string[]>([]);
  const [selectedHomeProductIds, setSelectedHomeProductIds] = useState<string[]>([]);
  const [selectedHomeBrandSlugs, setSelectedHomeBrandSlugs] = useState<string[]>([]);

  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  // Auth Guard
  useEffect(() => {
    if (!pb.authStore.isValid || pb.authStore.record?.collectionName !== "_superusers") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    pb.authStore.clear();
    if (typeof window !== "undefined") {
      localStorage.removeItem("hvp_admin_auth");
    }
    router.push("/admin");
  };

  // Fetch all data from PocketBase
  const loadAllData = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      // 1. Fetch Categories
      const catRecords = await pb.collection("categories").getFullList<PbCategoryRecord>({
        requestKey: null
      });
      const mappedCats: AdminCategoryItem[] = catRecords.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        image: getPbImageUrl("categories", c.id, c.image) || "/images/steel_construction.jpg",
        description: c.description || ""
      }));
      setCategoriesList(mappedCats);

      // 2. Fetch Brands
      const brandRecords = await pb.collection("brands").getFullList<PbBrandRecord>({
        requestKey: null
      });
      const mappedBrands: AdminBrandItem[] = brandRecords.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        image: getPbImageUrl("brands", b.id, b.image) || "/images/logo.png",
        description: b.description || ""
      }));
      setBrandsList(mappedBrands);

      // 3. Fetch Products
      const prodRecords = await pb.collection("products").getFullList<PbProductRecord>({
        requestKey: null
      });
      const mappedProducts: AdminProductItem[] = prodRecords.map((p) => {
        const rawImgs = p.images || [];
        const productImages = rawImgs.map((img) => getPbImageUrl("products", p.id, img)).filter(Boolean);
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          categorySlug: p.categorySlug,
          categoryName: p.categoryName || p.categorySlug,
          brand: p.brand,
          price: p.price,
          unit: p.unit,
          image: productImages[0] || "/images/steel_construction.jpg",
          images: productImages,
          rawImages: rawImgs,
          description: p.description || ""
        };
      });
      setProducts(mappedProducts);

      // 4. Fetch Quotes
      const quoteRecords = await pb.collection("quotes").getFullList<PbQuoteRecord>({
        requestKey: null
      });

      const parseVietnameseDate = (dateStr?: string): number => {
        if (!dateStr) return 0;
        const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2}))?/);
        if (match) {
          const [_, day, month, year, hour = "0", min = "0"] = match;
          return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min)).getTime();
        }
        const timestamp = Date.parse(dateStr);
        return isNaN(timestamp) ? 0 : timestamp;
      };

      const mappedQuotes: AdminQuoteItem[] = quoteRecords
        .map((q) => ({
          id: q.id,
          customer: q.customer,
          phone: q.phone,
          items: q.items || "",
          note: q.note || "",
          status: q.status || "Chưa xử lý",
          date: q.date || ""
        }))
        .sort((a, b) => {
          const timeA = parseVietnameseDate(a.date);
          const timeB = parseVietnameseDate(b.date);
          if (timeA !== timeB) {
            return timeB - timeA; // Mới nhất lên đầu
          }
          return b.id.localeCompare(a.id);
        });

      setQuotes(mappedQuotes);

      // 5. Fetch Site Settings
      try {
        const settingsRes = await pb.collection("site_settings").getList<PbSiteSettingsRecord>(1, 1, {
          filter: 'key = "homepage_customization"'
        });
        const settingsRecord = settingsRes.items[0];
        if (settingsRecord) {
          setSiteSettingsId(settingsRecord.id);
          if (settingsRecord.heroImage) {
            setHeroImage(getPbImageUrl("site_settings", settingsRecord.id, settingsRecord.heroImage));
          }
          if (settingsRecord.aboutImage) {
            setAboutImage(getPbImageUrl("site_settings", settingsRecord.id, settingsRecord.aboutImage));
          }
          if (settingsRecord.selectedCategories && Array.isArray(settingsRecord.selectedCategories)) {
            setSelectedHomeCatSlugs(settingsRecord.selectedCategories);
          } else {
            setSelectedHomeCatSlugs(mappedCats.slice(0, 8).map((c) => c.slug));
          }
          if (settingsRecord.selectedProducts && Array.isArray(settingsRecord.selectedProducts)) {
            setSelectedHomeProductIds(settingsRecord.selectedProducts);
          } else {
            setSelectedHomeProductIds(mappedProducts.slice(0, 8).map((p) => p.slug || p.id));
          }
          if (settingsRecord.selectedBrands && Array.isArray(settingsRecord.selectedBrands)) {
            setSelectedHomeBrandSlugs(settingsRecord.selectedBrands);
          } else {
            setSelectedHomeBrandSlugs(mappedBrands.slice(0, 16).map((b) => b.slug));
          }
        }
      } catch (err) {
        // Fallback default selections if no settings record
        setSelectedHomeCatSlugs(mappedCats.slice(0, 8).map((c) => c.slug));
        setSelectedHomeProductIds(mappedProducts.slice(0, 8).map((p) => p.slug || p.id));
        setSelectedHomeBrandSlugs(mappedBrands.slice(0, 16).map((b) => b.slug));
      }
    } catch (err: any) {
      console.error("Lỗi tải dữ liệu từ PocketBase:", err);
      showNotification(`Lỗi kết nối máy chủ: ${err?.message || "Không thể tải dữ liệu"}`);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#081d18", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px" }}>
        <Loader2 size={32} color="#c6a15b" className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
        <div style={{ fontSize: "14.5px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
          Đang kết nối cơ sở dữ liệu PocketBase...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#081d18", color: "#ffffff", fontFamily: "sans-serif" }}>
      {/* Toast thông báo */}
      {toast && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", background: "#0b3b32", border: "1px solid #c6a15b", color: "#fff", padding: "10px 18px", borderRadius: "8px", zIndex: 9999, display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
          <CheckCircle2 size={16} color="#4ade80" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header
        style={{
          background: "#071713",
          borderBottom: "1px solid rgba(198, 161, 91, 0.25)",
          padding: "0 28px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#0a1714",
                border: "1px solid rgba(198, 161, 91, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <img src="/images/logo.png" alt="Logo Hưng Vinh Phát" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.2px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>HƯNG VINH PHÁT</span>
                <span style={{ color: "#c6a15b", fontWeight: 600, fontSize: "11px", background: "rgba(198, 161, 91, 0.15)", border: "1px solid rgba(198, 161, 91, 0.3)", padding: "1px 6px", borderRadius: "4px" }}>
                  ADMIN
                </span>
              </div>
              <div style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.5)" }}>
                Hệ thống Quản trị & Cơ sở dữ liệu PocketBase
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => loadAllData(true)}
            disabled={isRefreshing}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12.5px",
              color: "rgba(255, 255, 255, 0.8)",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "7px 12px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            title="Đồng bộ dữ liệu mới nhất"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} />
            <span>{isRefreshing ? "Đang đồng bộ..." : "Làm mới"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.8)",
              textDecoration: "none",
              padding: "7px 12px",
              background: "rgba(255, 255, 255, 0.06)",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <span>Xem Website</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#f87171",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              padding: "7px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            <LogOut size={14} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px" }}>
        {/* 4 Thẻ đếm nhanh */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "24px" }}>
          <div
            onClick={() => setActiveTab("products")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: activeTab === "products" ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Tổng sản phẩm</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#38bdf8" }}>{products.length}</div>
          </div>
          <div
            onClick={() => setActiveTab("categories")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: activeTab === "categories" ? "1px solid #4ade80" : "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Danh mục ngành hàng</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#4ade80" }}>{categoriesList.length}</div>
          </div>
          <div
            onClick={() => setActiveTab("brands")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: activeTab === "brands" ? "1px solid #facc15" : "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Thương hiệu đối tác</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#facc15" }}>{brandsList.length}</div>
          </div>
          <div
            onClick={() => setActiveTab("quotes")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: activeTab === "quotes" ? "1px solid #f43f5e" : "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Yêu cầu báo giá</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#f43f5e" }}>{quotes.length}</div>
          </div>
        </div>

        {/* Tab Chuyển Đổi */}
        <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px", marginBottom: "22px", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTab("products")}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "products" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "products" ? "#0a1714" : "#fff" }}
          >
            Quản Lý Sản Phẩm ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "categories" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "categories" ? "#0a1714" : "#fff" }}
          >
            Quản Lý Ngành Hàng ({categoriesList.length})
          </button>
          <button
            onClick={() => setActiveTab("brands")}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "brands" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "brands" ? "#0a1714" : "#fff" }}
          >
            Quản Lý Thương Hiệu ({brandsList.length})
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "quotes" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "quotes" ? "#0a1714" : "#fff" }}
          >
            Yêu Cầu Báo Giá ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab("customization")}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "customization" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "customization" ? "#0a1714" : "#fff", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <Sliders size={14} />
            <span>Tùy Chỉnh Giao Diện Web</span>
          </button>
        </div>

        {/* Render Tab Tương Ứng */}
        {activeTab === "products" && (
          <ProductsTab
            products={products}
            categoriesList={categoriesList}
            brandsList={brandsList}
            onRefresh={() => loadAllData(true)}
            onShowToast={showNotification}
          />
        )}

        {activeTab === "categories" && (
          <CategoriesTab
            categoriesList={categoriesList}
            onRefresh={() => loadAllData(true)}
            onShowToast={showNotification}
          />
        )}

        {activeTab === "brands" && (
          <BrandsTab
            brandsList={brandsList}
            onRefresh={() => loadAllData(true)}
            onShowToast={showNotification}
          />
        )}

        {activeTab === "quotes" && (
          <QuotesTab
            quotes={quotes}
            onRefresh={() => loadAllData(true)}
            onShowToast={showNotification}
          />
        )}

        {activeTab === "customization" && (
          <CustomizationTab
            siteSettingsId={siteSettingsId}
            initialHeroImage={heroImage}
            initialAboutImage={aboutImage}
            initialSelectedCategories={selectedHomeCatSlugs}
            initialSelectedProducts={selectedHomeProductIds}
            initialSelectedBrands={selectedHomeBrandSlugs}
            categoriesList={categoriesList}
            productsList={products}
            brandsList={brandsList}
            onRefresh={() => loadAllData(true)}
            onShowToast={showNotification}
          />
        )}
      </main>
    </div>
  );
}
