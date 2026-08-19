"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Search,
  X,
  Upload,
  Pencil,
  Loader2
} from "lucide-react";
import { pb } from "@/lib/pocketbase";
import PaginationControl from "./PaginationControl";

export interface AdminProductItem {
  id: string; // PocketBase record id
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  brand: string;
  price: string;
  unit: string;
  image: string; // Ảnh đầu tiên trong images
  images?: string[]; // Danh sách full URLs
  rawImages?: string[]; // Tên file thực tế lưu trong PocketBase
  description: string;
}

interface ProductsTabProps {
  products: AdminProductItem[];
  categoriesList: { id: string; slug: string; name: string }[];
  brandsList: { id: string; slug: string; name: string }[];
  onRefresh: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

const ITEMS_PER_PAGE = 20;

export default function ProductsTab({
  products,
  categoriesList,
  brandsList,
  onRefresh,
  onShowToast
}: ProductsTabProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  // Existing images on server (khi chỉnh sửa sản phẩm)
  const [existingImages, setExistingImages] = useState<{ url: string; filename: string }[]>([]);
  const [deletedFilenames, setDeletedFilenames] = useState<string[]>([]);

  // Newly selected files from computer (thêm vào danh sách)
  const [newFiles, setNewFiles] = useState<{ file: File; previewUrl: string }[]>([]);

  useEffect(() => {
    if (categoriesList.length > 0 && !category) {
      setCategory(categoriesList[0].slug);
    }
  }, [categoriesList, category]);

  useEffect(() => {
    if (brandsList.length > 0 && !brand) {
      setBrand(brandsList[0].name);
    }
  }, [brandsList, brand]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleStartEdit = (p: AdminProductItem) => {
    setEditingId(p.id);
    setName(p.name);
    setSlug(p.slug || p.id);
    setCategory(p.categorySlug);
    setBrand(p.brand);
    setPrice(p.price);
    setUnit(p.unit || "kg");
    setDescription(p.description || "");

    // Load existing images
    const rawImgs = p.rawImages || [];
    const fullUrls = p.images || (p.image ? [p.image] : []);
    const mappedExisting = rawImgs.map((filename, idx) => ({
      filename,
      url: fullUrls[idx] || filename
    }));

    setExistingImages(mappedExisting);
    setDeletedFilenames([]);
    setNewFiles([]);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setPrice("");
    setUnit("");
    setDescription("");
    setExistingImages([]);
    setDeletedFilenames([]);
    setNewFiles([]);
    setShowAddForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const mapped = fileArray.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setNewFiles((prev) => [...prev, ...mapped]);
    e.target.value = "";
  };

  const handleRemoveExistingImage = (idxToRemove: number) => {
    const target = existingImages[idxToRemove];
    if (target) {
      if (target.filename) {
        setDeletedFilenames((prev) => [...prev, target.filename]);
      }
      setExistingImages((prev) => prev.filter((_, idx) => idx !== idxToRemove));
    }
  };

  const handleRemoveNewFile = (idxToRemove: number) => {
    setNewFiles((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) {
      alert("Vui lòng nhập đầy đủ tên và giá sản phẩm.");
      return;
    }

    const catObj = categoriesList.find((c) => c.slug === category);
    const finalSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-") || `sp-${Date.now()}`;

    setIsSubmitting(true);
    try {
      if (editingId) {
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("slug", finalSlug);
        formData.append("categorySlug", category || "sat-thep");
        formData.append("categoryName", catObj ? catObj.name : "Vật liệu xây dựng");
        formData.append("brand", brand || "Hưng Vinh Phát");
        formData.append("price", price.trim());
        formData.append("unit", unit.trim() || "kg");
        formData.append("description", description.trim());

        // 1. Thêm ảnh mới bằng modifier images+
        newFiles.forEach((item) => {
          formData.append("images+", item.file);
        });

        // 2. Xóa các ảnh cũ đã bỏ bằng modifier images-
        deletedFilenames.forEach((filename) => {
          formData.append("images-", filename);
        });

        await pb.collection("products").update(editingId, formData);
        onShowToast(`Đã cập nhật sản phẩm: ${name}`);
      } else {
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("slug", finalSlug);
        formData.append("categorySlug", category || "sat-thep");
        formData.append("categoryName", catObj ? catObj.name : "Vật liệu xây dựng");
        formData.append("brand", brand || "Hưng Vinh Phát");
        formData.append("price", price.trim());
        formData.append("unit", unit.trim() || "kg");
        formData.append("description", description.trim());

        newFiles.forEach((item) => {
          formData.append("images", item.file);
        });

        await pb.collection("products").create(formData);
        onShowToast(`Đã thêm mới sản phẩm: ${name}`);
      }

      await onRefresh();
      handleCancelForm();
    } catch (err: any) {
      console.error("Lỗi lưu sản phẩm vào PocketBase:", err);
      alert(`Lỗi lưu sản phẩm: ${err?.message || "Không thể kết nối máy chủ"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (!confirm(`Xác nhận xóa sản phẩm "${prodName}" khỏi cơ sở dữ liệu?`)) return;
    try {
      await pb.collection("products").delete(id);
      onShowToast(`Đã xóa sản phẩm: ${prodName}`);
      await onRefresh();
    } catch (err: any) {
      console.error("Lỗi xóa sản phẩm:", err);
      alert(`Lỗi xóa: ${err?.message || "Không thể thực hiện"}`);
    }
  };

  const filtered = products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.brand || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.categoryName || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const totalImageCount = existingImages.length + newFiles.length;

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
            Danh Sách Sản Phẩm ({filtered.length})
          </h3>
          <button
            type="button"
            onClick={() => {
              if (showAddForm) handleCancelForm();
              else setShowAddForm(true);
            }}
            style={{
              padding: "8px 16px",
              background: showAddForm ? "rgba(255, 255, 255, 0.12)" : "#c6a15b",
              color: showAddForm ? "#ffffff" : "#0a1714",
              border: showAddForm ? "1px solid rgba(255, 255, 255, 0.25)" : "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {showAddForm ? "Đóng Form" : "+ Thêm Sản Phẩm"}
          </button>
        </div>

        <div style={{ position: "relative", minWidth: "240px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên, thương hiệu, ngành hàng..."
            style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* FORM THÊM / SỬA */}
      {showAddForm && (
        <div style={{ background: "rgba(11, 59, 50, 0.45)", border: "1px solid rgba(198, 161, 91, 0.35)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {editingId ? <Pencil size={18} color="#c6a15b" /> : <Plus size={18} color="#c6a15b" />}
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                {editingId ? `Chỉnh Sửa Sản Phẩm: ${name || ""}` : "Thêm Sản Phẩm Mới Vào Database"}
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCancelForm}
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}
              title="Đóng form"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                  Tên sản phẩm <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingId && !slug) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                    }
                  }}
                  placeholder="Ví dụ: Thép Thanh Vằn Hòa Phát CB400 D18"
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                  Mã định danh URL (Slug) <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Ví dụ: thep-thanh-van-hoa-phat-cb400-d18"
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                  Ngành hàng <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none" }}
                >
                  {categoriesList.map((c) => (
                    <option key={c.id || c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                  Thương hiệu <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none" }}
                >
                  {brandsList.map((b) => (
                    <option key={b.id || b.slug} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                  Đơn giá (VNĐ) <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ví dụ: 15.800 hoặc 15.800.000"
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                  Đơn vị tính <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="kg / m / m² / bộ / viên..."
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Upload Ảnh */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                Ảnh sản phẩm (Tải lên danh sách `images` trong PocketBase - Chọn thêm ảnh sẽ tự động cộng vào)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
                  <Upload size={14} />
                  <span>+ Chọn thêm ảnh từ máy tính</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                  {totalImageCount === 0 ? "Chưa có ảnh nào" : `Tổng cộng ${totalImageCount} ảnh (${existingImages.length} ảnh cũ, ${newFiles.length} ảnh mới chọn)`}
                </span>
              </div>

              {/* Gallery xem trước: Gồm ảnh có sẵn trên server + ảnh mới chọn */}
              {totalImageCount > 0 && (
                <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                  {/* 1. Các ảnh hiện có trên PocketBase */}
                  {existingImages.map((item, idx) => (
                    <div
                      key={`existing-${idx}`}
                      style={{
                        position: "relative",
                        width: "64px",
                        height: "64px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "#0a1714"
                      }}
                      title="Ảnh hiện có trên máy chủ"
                    >
                      <img src={item.url} alt={`Ảnh hiện có ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(idx)}
                        style={{ position: "absolute", top: "2px", right: "2px", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
                        title="Xóa ảnh này khỏi sản phẩm"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}

                  {/* 2. Các ảnh mới vừa chọn từ máy tính */}
                  {newFiles.map((item, idx) => (
                    <div
                      key={`new-${idx}`}
                      style={{
                        position: "relative",
                        width: "64px",
                        height: "64px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        border: "1px solid #c6a15b",
                        background: "#0a1714"
                      }}
                      title="Ảnh mới vừa chọn"
                    >
                      <img src={item.previewUrl} alt={`Ảnh mới ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                      <button
                        type="button"
                        onClick={() => handleRemoveNewFile(idx)}
                        style={{ position: "absolute", top: "2px", right: "2px", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
                        title="Bỏ chọn ảnh này"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mô tả */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                Mô tả sản phẩm
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập thông tin mô tả quy cách, xuất xứ, ứng dụng công trình..."
                style={{ width: "100%", minHeight: "100px", lineHeight: "1.6", padding: "10px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              {editingId && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCancelForm}
                  style={{
                    padding: "10px 20px",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Hủy Chỉnh Sửa
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "10px 24px",
                  background: "linear-gradient(135deg, #c6a15b 0%, #d4b472 100%)",
                  color: "#0a1714",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: isSubmitting ? "wait" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(198, 161, 91, 0.3)"
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <span>{editingId ? "Cập Nhật Sản Phẩm" : "Lưu Sản Phẩm"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* BẢNG DANH SÁCH */}
      <div style={{ background: "rgba(11, 59, 50, 0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
              <th style={{ padding: "10px 14px" }}>Ảnh & Tên sản phẩm</th>
              <th style={{ padding: "10px 14px" }}>Ngành hàng</th>
              <th style={{ padding: "10px 14px" }}>Thương hiệu</th>
              <th style={{ padding: "10px 14px" }}>Đơn giá</th>
              <th style={{ padding: "10px 14px", textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            ) : (
              paginated.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ position: "relative", width: "42px", height: "42px", borderRadius: "6px", overflow: "hidden", background: "#0a1714", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
                        <img src={p.image || "/images/steel_construction.jpg"} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#fff" }}>{p.name}</div>
                        {p.description && (
                          <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.5)", maxWidth: "320px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {p.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.7)" }}>{p.categoryName || p.categorySlug}</td>
                  <td style={{ padding: "10px 14px", color: "#c6a15b", fontWeight: 600 }}>{p.brand}</td>
                  <td style={{ padding: "10px 14px", color: "#4ade80", fontWeight: 600 }}>
                    {p.price} đ/{p.unit}
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => handleStartEdit(p)} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", padding: "4px 6px", marginRight: "4px" }} title="Chỉnh sửa sản phẩm">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(p.id, p.name)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px 6px" }} title="Xóa sản phẩm">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <PaginationControl
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
