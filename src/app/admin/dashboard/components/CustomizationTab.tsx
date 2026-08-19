"use client";

import React, { useState } from "react";
import {
  Upload,
  X,
  Save,
  Loader2
} from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { AdminCategoryItem } from "./CategoriesTab";
import { AdminProductItem } from "./ProductsTab";
import { AdminBrandItem } from "./BrandsTab";

interface CustomizationTabProps {
  siteSettingsId: string | null;
  initialHeroImage: string;
  initialAboutImage: string;
  initialSelectedCategories: string[];
  initialSelectedProducts: string[];
  initialSelectedBrands: string[];
  categoriesList: AdminCategoryItem[];
  productsList: AdminProductItem[];
  brandsList: AdminBrandItem[];
  onRefresh: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

export default function CustomizationTab({
  siteSettingsId,
  initialHeroImage,
  initialAboutImage,
  initialSelectedCategories,
  initialSelectedProducts,
  initialSelectedBrands,
  categoriesList,
  productsList,
  brandsList,
  onRefresh,
  onShowToast
}: CustomizationTabProps) {
  const [heroImagePreview, setHeroImagePreview] = useState<string>(initialHeroImage);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);

  const [aboutImagePreview, setAboutImagePreview] = useState<string>(initialAboutImage);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);

  const [selectedHomeCatSlugs, setSelectedHomeCatSlugs] = useState<string[]>(initialSelectedCategories);
  const [selectedHomeProductIds, setSelectedHomeProductIds] = useState<string[]>(initialSelectedProducts);
  const [selectedHomeBrandSlugs, setSelectedHomeBrandSlugs] = useState<string[]>(initialSelectedBrands);

  const [isSaving, setIsSaving] = useState(false);

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroImageFile(file);
    setHeroImagePreview(URL.createObjectURL(file));
  };

  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAboutImageFile(file);
    setAboutImagePreview(URL.createObjectURL(file));
  };

  const handleToggleHomeCategory = (slug: string) => {
    if (selectedHomeCatSlugs.includes(slug)) {
      setSelectedHomeCatSlugs(selectedHomeCatSlugs.filter((s) => s !== slug));
    } else {
      if (selectedHomeCatSlugs.length >= 8) {
        onShowToast("Mục Danh mục chỉ được chọn tối đa 8 ngành hàng.");
        return;
      }
      setSelectedHomeCatSlugs([...selectedHomeCatSlugs, slug]);
    }
  };

  const handleToggleHomeProduct = (idOrSlug: string) => {
    if (selectedHomeProductIds.includes(idOrSlug)) {
      setSelectedHomeProductIds(selectedHomeProductIds.filter((pid) => pid !== idOrSlug));
    } else {
      if (selectedHomeProductIds.length >= 8) {
        onShowToast("Mục Sản phẩm chỉ được chọn tối đa 8 sản phẩm.");
        return;
      }
      setSelectedHomeProductIds([...selectedHomeProductIds, idOrSlug]);
    }
  };

  const handleToggleHomeBrand = (slug: string) => {
    if (selectedHomeBrandSlugs.includes(slug)) {
      setSelectedHomeBrandSlugs(selectedHomeBrandSlugs.filter((s) => s !== slug));
    } else {
      if (selectedHomeBrandSlugs.length >= 16) {
        onShowToast("Mục Showroom chỉ được chọn tối đa 16 thương hiệu.");
        return;
      }
      setSelectedHomeBrandSlugs([...selectedHomeBrandSlugs, slug]);
    }
  };

  const handleSaveCustomization = async () => {
    setIsSaving(true);
    try {
      if (heroImageFile || aboutImageFile) {
        const formData = new FormData();
        formData.append("key", "homepage_customization");
        formData.append("selectedCategories", JSON.stringify(selectedHomeCatSlugs));
        formData.append("selectedProducts", JSON.stringify(selectedHomeProductIds));
        formData.append("selectedBrands", JSON.stringify(selectedHomeBrandSlugs));

        if (heroImageFile) {
          formData.append("heroImage", heroImageFile);
        }
        if (aboutImageFile) {
          formData.append("aboutImage", aboutImageFile);
        }

        if (siteSettingsId) {
          await pb.collection("site_settings").update(siteSettingsId, formData);
        } else {
          await pb.collection("site_settings").create(formData);
        }
      } else {
        const payload = {
          key: "homepage_customization",
          selectedCategories: selectedHomeCatSlugs,
          selectedProducts: selectedHomeProductIds,
          selectedBrands: selectedHomeBrandSlugs
        };
        if (siteSettingsId) {
          await pb.collection("site_settings").update(siteSettingsId, payload);
        } else {
          await pb.collection("site_settings").create(payload);
        }
      }

      onShowToast("Đã lưu thành công cấu hình giao diện website lên máy chủ!");
      await onRefresh();
    } catch (err: any) {
      console.error("Lỗi lưu cấu hình giao diện:", err);
      alert(`Lỗi lưu cấu hình: ${err?.message || "Không thể kết nối máy chủ"}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "22px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "14px" }}>
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
          Tùy Chỉnh Giao Diện Trang Chủ
        </h3>
        <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.5)" }}>
          Cấu hình ảnh banner và lựa chọn các mục hiển thị trên từng section của website
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* MỤC 1: ẢNH HERO SECTION */}
        <div style={{ background: "rgba(11, 59, 50, 0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "20px" }}>
          <div style={{ marginBottom: "12px" }}>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#c6a15b", margin: "0 0 4px" }}>
              1. Hình Ảnh Banner Hero Section
            </h4>
            <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)" }}>
              Tải ảnh banner chính hiển thị ở đầu trang chủ
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
              <Upload size={14} />
              <span>Tải ảnh mới từ máy tính</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleHeroImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {heroImagePreview && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ position: "relative", width: "180px", height: "100px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
                <img src={heroImagePreview} alt="Banner Hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => {
                    setHeroImageFile(null);
                    setHeroImagePreview("");
                  }}
                  style={{ position: "absolute", top: "4px", right: "4px", width: "20px", height: "20px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
                  title="Xóa ảnh này"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MỤC 2: SECTION DANH MỤC */}
        <div style={{ background: "rgba(11, 59, 50, 0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "10px", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#c6a15b", margin: "0 0 4px" }}>
                2. Section DANH MỤC (Giải pháp vật liệu toàn diện)
              </h4>
              <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)" }}>
                Từ phần thô đến hoàn thiện, lựa chọn phù hợp cho từng công trình • Chọn tối đa 8 ngành hàng ({selectedHomeCatSlugs.length}/8)
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setSelectedHomeCatSlugs(categoriesList.slice(0, 8).map((c) => c.slug))}
                style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff", fontSize: "11.5px", cursor: "pointer" }}
              >
                Chọn tối đa 8 mục
              </button>
              <button
                type="button"
                onClick={() => setSelectedHomeCatSlugs([])}
                style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff", fontSize: "11.5px", cursor: "pointer" }}
              >
                Bỏ chọn tất cả
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {categoriesList.map((c) => {
              const isChecked = selectedHomeCatSlugs.includes(c.slug);
              return (
                <div
                  key={c.id || c.slug}
                  onClick={() => handleToggleHomeCategory(c.slug)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: isChecked ? "rgba(198, 161, 91, 0.15)" : "rgba(0,0,0,0.25)",
                    border: isChecked ? "1px solid #c6a15b" : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    style={{ accentColor: "#c6a15b", cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  <div style={{ width: "28px", height: "28px", borderRadius: "4px", overflow: "hidden", background: "#0a1714", flexShrink: 0 }}>
                    <img src={c.image || "/images/steel_construction.jpg"} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: isChecked ? 600 : 400, color: isChecked ? "#fff" : "rgba(255,255,255,0.7)" }}>
                    {c.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* MỤC 3: SECTION SẢN PHẨM */}
        <div style={{ background: "rgba(11, 59, 50, 0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "10px", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#c6a15b", margin: "0 0 4px" }}>
                3. Section DANH MỤC SẢN PHẨM (Vật liệu xây dựng & thiết bị)
              </h4>
              <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)" }}>
                Hưng Vinh Phát cung cấp đa dạng vật liệu và thiết bị cho mọi công trình • Chọn tối đa 8 sản phẩm ({selectedHomeProductIds.length}/8)
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setSelectedHomeProductIds(productsList.slice(0, 8).map((p) => p.slug || p.id))}
                style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff", fontSize: "11.5px", cursor: "pointer" }}
              >
                Chọn tối đa 8 mục
              </button>
              <button
                type="button"
                onClick={() => setSelectedHomeProductIds([])}
                style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff", fontSize: "11.5px", cursor: "pointer" }}
              >
                Bỏ chọn tất cả
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
            {productsList.map((p) => {
              const itemKey = p.slug || p.id;
              const isChecked = selectedHomeProductIds.includes(itemKey) || selectedHomeProductIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => handleToggleHomeProduct(itemKey)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: isChecked ? "rgba(198, 161, 91, 0.15)" : "rgba(0,0,0,0.25)",
                    border: isChecked ? "1px solid #c6a15b" : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    style={{ accentColor: "#c6a15b", cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  <div style={{ width: "32px", height: "32px", borderRadius: "4px", overflow: "hidden", background: "#0a1714", flexShrink: 0 }}>
                    <img src={p.image || "/images/steel_construction.jpg"} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: "12.5px", fontWeight: isChecked ? 600 : 400, color: isChecked ? "#fff" : "rgba(255,255,255,0.7)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#4ade80" }}>
                      {p.price} đ/{p.unit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MỤC 4: SECTION SHOWROOM ONLINE */}
        <div style={{ background: "rgba(11, 59, 50, 0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "10px", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#c6a15b", margin: "0 0 4px" }}>
                4. Section SHOWROOM ONLINE (Chọn thương hiệu để xem sản phẩm)
              </h4>
              <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)" }}>
                Bấm vào từng thương hiệu để mở danh sách sản phẩm tương ứng • Chọn tối đa 16 thương hiệu ({selectedHomeBrandSlugs.length}/16)
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setSelectedHomeBrandSlugs(brandsList.slice(0, 16).map((b) => b.slug))}
                style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff", fontSize: "11.5px", cursor: "pointer" }}
              >
                Chọn tối đa 16 mục
              </button>
              <button
                type="button"
                onClick={() => setSelectedHomeBrandSlugs([])}
                style={{ padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff", fontSize: "11.5px", cursor: "pointer" }}
              >
                Bỏ chọn tất cả
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
            {brandsList.map((b) => {
              const isChecked = selectedHomeBrandSlugs.includes(b.slug);
              return (
                <div
                  key={b.id || b.slug}
                  onClick={() => handleToggleHomeBrand(b.slug)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    background: isChecked ? "rgba(198, 161, 91, 0.15)" : "rgba(0,0,0,0.25)",
                    border: isChecked ? "1px solid #c6a15b" : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    style={{ accentColor: "#c6a15b", cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  <div style={{ width: "28px", height: "28px", borderRadius: "4px", overflow: "hidden", background: "#0a1714", border: "1px solid rgba(198, 161, 91, 0.3)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={b.image || "/images/logo.png"} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: isChecked ? 600 : 400, color: isChecked ? "#fff" : "rgba(255,255,255,0.7)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {b.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* MỤC 5: ẢNH VỀ HƯNG VINH PHÁT */}
        <div style={{ background: "rgba(11, 59, 50, 0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "20px" }}>
          <div style={{ marginBottom: "12px" }}>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#c6a15b", margin: "0 0 4px" }}>
              5. Hình Ảnh Section "VỀ HƯNG VINH PHÁT"
            </h4>
            <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)" }}>
              Đặt chất lượng công trình lên hàng đầu • Hàng chính hãng, giá cạnh tranh, giao tận chân công trình
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
              <Upload size={14} />
              <span>Tải ảnh mới từ máy tính</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAboutImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {aboutImagePreview && (
            <div style={{ marginTop: "14px" }}>
              <div style={{ position: "relative", width: "180px", height: "100px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
                <img src={aboutImagePreview} alt="Ảnh Về Hưng Vinh Phát" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => {
                    setAboutImageFile(null);
                    setAboutImagePreview("");
                  }}
                  style={{ position: "absolute", top: "4px", right: "4px", width: "20px", height: "20px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
                  title="Xóa ảnh này"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Nút lưu cuối trang */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSaveCustomization}
            style={{
              padding: "11px 26px",
              background: "linear-gradient(135deg, #c6a15b 0%, #d4b472 100%)",
              color: "#0a1714",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: isSaving ? "wait" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(198, 161, 91, 0.3)"
            }}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                <span>Đang lưu cấu hình...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Lưu Cấu Hình Giao Diện</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
