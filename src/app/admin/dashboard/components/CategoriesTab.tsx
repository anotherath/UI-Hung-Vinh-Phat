"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Trash2,
  Search,
  X,
  Upload,
  Pencil,
  ExternalLink,
  Loader2
} from "lucide-react";
import { pb } from "@/lib/pocketbase";
import PaginationControl from "./PaginationControl";

export interface AdminCategoryItem {
  id: string; // PocketBase record id
  name: string;
  slug: string;
  image: string;
  description: string;
}

interface CategoriesTabProps {
  categoriesList: AdminCategoryItem[];
  onRefresh: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

const ITEMS_PER_PAGE = 20;

export default function CategoriesTab({
  categoriesList,
  onRefresh,
  onShowToast
}: CategoriesTabProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catImageFile, setCatImageFile] = useState<File | null>(null);
  const [catImagePreview, setCatImagePreview] = useState<string>("");

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleStartEdit = (c: AdminCategoryItem) => {
    setEditingId(c.id);
    setCatName(c.name);
    setCatSlug(c.slug || c.id);
    setCatDesc(c.description || "");
    setCatImageFile(null);
    setCatImagePreview(c.image || "");
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setCatName("");
    setCatSlug("");
    setCatDesc("");
    setCatImageFile(null);
    setCatImagePreview("");
    setShowAddForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCatImageFile(file);
    setCatImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim() || !catSlug.trim()) {
      alert("Vui lòng nhập tên và mã định danh ngành hàng.");
      return;
    }

    const cleanSlug = catSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    setIsSubmitting(true);
    try {
      if (catImageFile) {
        const formData = new FormData();
        formData.append("name", catName.trim());
        formData.append("slug", cleanSlug);
        formData.append("description", catDesc.trim());
        formData.append("image", catImageFile);

        if (editingId) {
          await pb.collection("categories").update(editingId, formData);
          onShowToast(`Đã cập nhật ngành hàng: ${catName}`);
        } else {
          await pb.collection("categories").create(formData);
          onShowToast(`Đã thêm ngành hàng: ${catName}`);
        }
      } else {
        const payload = {
          name: catName.trim(),
          slug: cleanSlug,
          description: catDesc.trim()
        };

        if (editingId) {
          await pb.collection("categories").update(editingId, payload);
          onShowToast(`Đã cập nhật ngành hàng: ${catName}`);
        } else {
          await pb.collection("categories").create(payload);
          onShowToast(`Đã thêm ngành hàng: ${catName}`);
        }
      }

      await onRefresh();
      handleCancelForm();
    } catch (err: any) {
      console.error("Lỗi lưu ngành hàng vào PocketBase:", err);
      alert(`Lỗi lưu ngành hàng: ${err?.message || "Không thể kết nối máy chủ"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, cName: string) => {
    if (!confirm(`Xác nhận xóa ngành hàng "${cName}" khỏi cơ sở dữ liệu?`)) return;
    try {
      await pb.collection("categories").delete(id);
      onShowToast(`Đã xóa ngành hàng: ${cName}`);
      await onRefresh();
    } catch (err: any) {
      console.error("Lỗi xóa ngành hàng:", err);
      alert(`Lỗi xóa: ${err?.message || "Không thể thực hiện"}`);
    }
  };

  const filtered = categoriesList.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.slug || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
            Danh Sách Ngành Hàng ({filtered.length})
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
            {showAddForm ? "Đóng Form" : "+ Thêm Ngành Hàng"}
          </button>
        </div>

        <div style={{ position: "relative", minWidth: "240px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm ngành hàng, slug..."
            style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* FORM THÊM / SỬA */}
      {showAddForm && (
        <div style={{ background: "rgba(11, 59, 50, 0.45)", border: "1px solid rgba(198, 161, 91, 0.35)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {editingId ? <Pencil size={18} color="#c6a15b" /> : <Layers size={18} color="#c6a15b" />}
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                {editingId ? `Chỉnh Sửa Ngành Hàng: ${catName || ""}` : "Thêm Ngành Hàng Mới Vào Database"}
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                  Tên ngành hàng <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                    if (!editingId && !catSlug) {
                      setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                    }
                  }}
                  placeholder="Ví dụ: Gỗ Tự Nhiên & Công Nghiệp"
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
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value)}
                  placeholder="Ví dụ: go-cong-nghiep"
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Upload Ảnh */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                Ảnh đại diện ngành hàng (Upload lên PocketBase)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
                  <Upload size={14} />
                  <span>Chọn ảnh từ máy tính</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                  {catImagePreview ? "Đã chọn 1 ảnh" : "Chưa chọn ảnh (dùng ảnh hiện tại hoặc mặc định)"}
                </span>
              </div>

              {catImagePreview && (
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <img src={catImagePreview} alt="Ảnh ngành hàng" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button
                      type="button"
                      onClick={() => {
                        setCatImageFile(null);
                        setCatImagePreview("");
                      }}
                      style={{ position: "absolute", top: "2px", right: "2px", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
                      title="Xóa ảnh này"
                    >
                      <X size={11} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mô tả */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                Mô tả ngành hàng
              </label>
              <textarea
                rows={4}
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                placeholder="Nhập mô tả ứng dụng, phân phối của ngành hàng..."
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
                  <span>{editingId ? "Cập Nhật Ngành Hàng" : "Lưu Ngành Hàng"}</span>
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
              <th style={{ padding: "10px 14px" }}>Ảnh & Tên ngành hàng</th>
              <th style={{ padding: "10px 14px" }}>Định danh (Slug)</th>
              <th style={{ padding: "10px 14px" }}>Mô tả</th>
              <th style={{ padding: "10px 14px", textAlign: "center" }}>Xem trang</th>
              <th style={{ padding: "10px 14px", textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                  Không tìm thấy ngành hàng nào.
                </td>
              </tr>
            ) : (
              paginated.map((c, i) => (
                <tr key={c.id || c.slug} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", background: "#0a1714", flexShrink: 0 }}>
                        <img src={c.image || "/images/steel_construction.jpg"} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <span style={{ fontWeight: 600, color: "#fff" }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
                    {c.slug}
                  </td>
                  <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.7)", maxWidth: "360px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.description}
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "center" }}>
                    <Link href={`/category/${c.slug}`} target="_blank" style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none", fontSize: "12px", fontWeight: 600 }}>
                      <span>Xem</span>
                      <ExternalLink size={12} />
                    </Link>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => handleStartEdit(c)} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", padding: "4px 6px", marginRight: "4px" }} title="Chỉnh sửa ngành hàng">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(c.id, c.name)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px 6px" }} title="Xóa ngành hàng">
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
