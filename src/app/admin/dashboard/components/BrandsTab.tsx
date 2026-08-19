"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
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

export interface AdminBrandItem {
  id: string; // PocketBase record id
  name: string;
  slug: string;
  image: string;
  description: string;
}

interface BrandsTabProps {
  brandsList: AdminBrandItem[];
  onRefresh: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

const ITEMS_PER_PAGE = 20;

export default function BrandsTab({
  brandsList,
  onRefresh,
  onShowToast
}: BrandsTabProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [brandName, setBrandName] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [brandLogoFile, setBrandLogoFile] = useState<File | null>(null);
  const [brandLogoPreview, setBrandLogoPreview] = useState<string>("");

  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleStartEdit = (b: AdminBrandItem) => {
    setEditingId(b.id);
    setBrandName(b.name);
    setBrandSlug(b.slug || b.id);
    setBrandDesc(b.description || "");
    setBrandLogoFile(null);
    setBrandLogoPreview(b.image || "");
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setBrandName("");
    setBrandSlug("");
    setBrandDesc("");
    setBrandLogoFile(null);
    setBrandLogoPreview("");
    setShowAddForm(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBrandLogoFile(file);
    setBrandLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !brandSlug.trim()) {
      alert("Vui lòng nhập tên và mã định danh thương hiệu.");
      return;
    }

    const cleanSlug = brandSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    setIsSubmitting(true);
    try {
      if (brandLogoFile) {
        const formData = new FormData();
        formData.append("name", brandName.trim());
        formData.append("slug", cleanSlug);
        formData.append("description", brandDesc.trim());
        formData.append("image", brandLogoFile);

        if (editingId) {
          await pb.collection("brands").update(editingId, formData);
          onShowToast(`Đã cập nhật thương hiệu: ${brandName}`);
        } else {
          await pb.collection("brands").create(formData);
          onShowToast(`Đã thêm thương hiệu: ${brandName}`);
        }
      } else {
        const payload = {
          name: brandName.trim(),
          slug: cleanSlug,
          description: brandDesc.trim()
        };

        if (editingId) {
          await pb.collection("brands").update(editingId, payload);
          onShowToast(`Đã cập nhật thương hiệu: ${brandName}`);
        } else {
          await pb.collection("brands").create(payload);
          onShowToast(`Đã thêm thương hiệu: ${brandName}`);
        }
      }

      await onRefresh();
      handleCancelForm();
    } catch (err: any) {
      console.error("Lỗi lưu thương hiệu vào PocketBase:", err);
      alert(`Lỗi lưu thương hiệu: ${err?.message || "Không thể kết nối máy chủ"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, bName: string) => {
    if (!confirm(`Xác nhận xóa thương hiệu "${bName}" khỏi cơ sở dữ liệu?`)) return;
    try {
      await pb.collection("brands").delete(id);
      onShowToast(`Đã xóa thương hiệu: ${bName}`);
      await onRefresh();
    } catch (err: any) {
      console.error("Lỗi xóa thương hiệu:", err);
      alert(`Lỗi xóa: ${err?.message || "Không thể thực hiện"}`);
    }
  };

  const filtered = brandsList.filter((b) =>
    (b.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.slug || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
            Danh Sách Thương Hiệu Đối Tác ({filtered.length})
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
            {showAddForm ? "Đóng Form" : "+ Thêm Thương Hiệu"}
          </button>
        </div>

        <div style={{ position: "relative", minWidth: "240px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm thương hiệu, slug..."
            style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* FORM THÊM / SỬA */}
      {showAddForm && (
        <div style={{ background: "rgba(11, 59, 50, 0.45)", border: "1px solid rgba(198, 161, 91, 0.35)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {editingId ? <Pencil size={18} color="#c6a15b" /> : <Building2 size={18} color="#c6a15b" />}
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                {editingId ? `Chỉnh Sửa Thương Hiệu: ${brandName || ""}` : "Thêm Thương Hiệu Mới Vào Database"}
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
                  Tên thương hiệu <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => {
                    setBrandName(e.target.value);
                    if (!editingId && !brandSlug) {
                      setBrandSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                    }
                  }}
                  placeholder="Ví dụ: Thép Việt Ý"
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
                  value={brandSlug}
                  onChange={(e) => setBrandSlug(e.target.value)}
                  placeholder="Ví dụ: thep-viet-y"
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Upload Logo */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                Logo thương hiệu (Upload lên PocketBase)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
                  <Upload size={14} />
                  <span>Chọn logo từ máy tính</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    style={{ display: "none" }}
                  />
                </label>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                  {brandLogoPreview ? "Đã chọn 1 logo" : "Chưa chọn logo (dùng logo hiện tại hoặc mặc định)"}
                </span>
              </div>

              {brandLogoPreview && (
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)", background: "#0a1714", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={brandLogoPreview} alt="Logo thương hiệu" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button
                      type="button"
                      onClick={() => {
                        setBrandLogoFile(null);
                        setBrandLogoPreview("");
                      }}
                      style={{ position: "absolute", top: "2px", right: "2px", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
                      title="Xóa logo này"
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
                Mô tả thương hiệu
              </label>
              <textarea
                rows={4}
                value={brandDesc}
                onChange={(e) => setBrandDesc(e.target.value)}
                placeholder="Nhập thông tin giới thiệu uy tín, chất lượng thương hiệu..."
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
                  <span>{editingId ? "Cập Nhật Thương Hiệu" : "Lưu Thương Hiệu"}</span>
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
              <th style={{ padding: "10px 14px" }}>Ảnh & Tên thương hiệu</th>
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
                  Không tìm thấy thương hiệu nào.
                </td>
              </tr>
            ) : (
              paginated.map((b, i) => (
                <tr key={b.id || b.slug} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "6px", overflow: "hidden", background: "#0a1714", border: "1px solid rgba(198, 161, 91, 0.3)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={b.image || "/images/logo.png"} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <span style={{ fontWeight: 600, color: "#fff", fontSize: "13.5px" }}>{b.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
                    {b.slug}
                  </td>
                  <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.7)", maxWidth: "360px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {b.description}
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "center" }}>
                    <Link href={`/brand/${b.slug}`} target="_blank" style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none", fontSize: "12px", fontWeight: 600 }}>
                      <span>Xem</span>
                      <ExternalLink size={12} />
                    </Link>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => handleStartEdit(b)} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", padding: "4px 6px", marginRight: "4px" }} title="Chỉnh sửa thương hiệu">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(b.id, b.name)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px 6px" }} title="Xóa thương hiệu">
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
