"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  PhoneCall
} from "lucide-react";
import { pb } from "@/lib/pocketbase";
import PaginationControl from "./PaginationControl";

export interface AdminQuoteItem {
  id: string;
  customer: string;
  phone: string;
  items?: string;
  note?: string;
  status: string;
  date?: string;
}

interface QuotesTabProps {
  quotes: AdminQuoteItem[];
  onRefresh: () => Promise<void>;
  onShowToast: (msg: string) => void;
}

const ITEMS_PER_PAGE = 20;

export default function QuotesTab({
  quotes,
  onRefresh,
  onShowToast
}: QuotesTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: string, customerName: string) => {
    // Nếu chọn mục "Xóa yêu cầu"
    if (newStatus === "delete") {
      if (!confirm(`Xác nhận xóa vĩnh viễn yêu cầu báo giá của "${customerName}" khỏi cơ sở dữ liệu?`)) {
        return;
      }
      try {
        await pb.collection("quotes").delete(id);
        onShowToast(`Đã xóa yêu cầu báo giá của ${customerName}`);
        await onRefresh();
      } catch (err: any) {
        console.error("Lỗi xóa báo giá:", err);
        alert(`Lỗi xóa: ${err?.message || "Không thể thực hiện"}`);
      }
      return;
    }

    // Cập nhật trạng thái thông thường
    try {
      await pb.collection("quotes").update(id, { status: newStatus });
      onShowToast(`Đã cập nhật trạng thái: "${newStatus}"`);
      await onRefresh();
    } catch (err: any) {
      console.error("Lỗi cập nhật trạng thái báo giá:", err);
      alert(`Lỗi cập nhật: ${err?.message || "Không thể kết nối máy chủ"}`);
    }
  };

  const filtered = quotes.filter((q) => {
    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    const matchSearch =
      (q.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (q.phone || "").includes(search) ||
      (q.items || "").toLowerCase().includes(search.toLowerCase()) ||
      (q.note || "").toLowerCase().includes(search.toLowerCase()) ||
      (q.date || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", gap: "10px", flexWrap: "wrap" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#fff", margin: 0 }}>
          Yêu Cầu Báo Giá ({filtered.length})
        </h3>
        <div style={{ position: "relative", minWidth: "240px" }}>
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên khách, SĐT, mặt hàng, ngày..."
            style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Bộ Lọc Trạng Thái */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.7)", fontSize: "12.5px", fontWeight: 600, marginRight: "2px" }}>
          <Filter size={14} color="#c6a15b" />
          <span>Trạng thái:</span>
        </div>

        <div
          style={{
            display: "inline-flex",
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "3px",
            gap: "3px",
            flexWrap: "wrap"
          }}
        >
          {[
            { key: "all", label: "Tất cả", count: quotes.length, activeBg: "#c6a15b", activeColor: "#0a1714", dotColor: "#c6a15b" },
            { key: "Chưa xử lý", label: "Chưa xử lý", count: quotes.filter(q => q.status === "Chưa xử lý").length, activeBg: "#881337", activeColor: "#ffffff", dotColor: "#f43f5e" },
            { key: "Đang xử lý", label: "Đang xử lý", count: quotes.filter(q => q.status === "Đang xử lý").length, activeBg: "#78350f", activeColor: "#ffffff", dotColor: "#f59e0b" },
            { key: "Đã báo giá", label: "Đã báo giá", count: quotes.filter(q => q.status === "Đã báo giá").length, activeBg: "#075985", activeColor: "#ffffff", dotColor: "#38bdf8" },
            { key: "Đã chốt", label: "Đã chốt", count: quotes.filter(q => q.status === "Đã chốt").length, activeBg: "#14532d", activeColor: "#ffffff", dotColor: "#4ade80" },
            { key: "Đã hủy", label: "Đã hủy", count: quotes.filter(q => q.status === "Đã hủy").length, activeBg: "#334155", activeColor: "#ffffff", dotColor: "#94a3b8" },
          ].map((item) => {
            const isSelected = statusFilter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setStatusFilter(item.key)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: isSelected ? 700 : 500,
                  cursor: "pointer",
                  border: "none",
                  background: isSelected ? item.activeBg : "transparent",
                  color: isSelected ? item.activeColor : "rgba(255, 255, 255, 0.7)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.15s ease"
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: item.dotColor,
                    display: "inline-block"
                  }}
                />
                <span>{item.label}</span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "1px 6px",
                    borderRadius: "10px",
                    background: isSelected ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.1)",
                    color: isSelected ? (item.key === "all" ? "#0a1714" : "#ffffff") : "rgba(255, 255, 255, 0.8)",
                    fontWeight: 700
                  }}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bảng Báo Giá */}
      <div style={{ background: "rgba(11, 59, 50, 0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
              <th style={{ padding: "10px 14px", width: "140px" }}>Thời gian</th>
              <th style={{ padding: "10px 14px", width: "160px" }}>Khách hàng</th>
              <th style={{ padding: "10px 14px", width: "130px" }}>Số điện thoại</th>
              <th style={{ padding: "10px 14px", width: "220px" }}>Mặt hàng yêu cầu</th>
              <th style={{ padding: "10px 14px" }}>Ghi chú</th>
              <th style={{ padding: "10px 14px", width: "140px", textAlign: "center" }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                  Không tìm thấy yêu cầu báo giá nào.
                </td>
              </tr>
            ) : (
              paginated.map((q, i) => (
                <tr key={q.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                  <td style={{ padding: "14px 14px", color: "#c6a15b", fontSize: "12.5px", verticalAlign: "top", whiteSpace: "nowrap", fontWeight: 600 }}>
                    {q.date || "—"}
                  </td>
                  <td style={{ padding: "14px 14px", fontWeight: 600, color: "#fff", verticalAlign: "top", whiteSpace: "nowrap" }}>
                    {q.customer}
                  </td>
                  <td style={{ padding: "14px 14px", color: "#38bdf8", fontWeight: 600, verticalAlign: "top", whiteSpace: "nowrap" }}>
                    <a href={`tel:${q.phone}`} style={{ color: "#38bdf8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <PhoneCall size={12} />
                      <span>{q.phone}</span>
                    </a>
                  </td>
                  <td style={{ padding: "14px 14px", color: "rgba(255,255,255,0.9)", verticalAlign: "top", fontWeight: 500 }}>
                    {q.items || "—"}
                  </td>
                  <td style={{ padding: "14px 14px", verticalAlign: "top" }}>
                    {q.note ? (
                      <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "12.5px", lineHeight: "1.6", wordBreak: "break-word" }}>
                        {q.note}
                      </div>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 14px", textAlign: "center", verticalAlign: "top" }}>
                    <select
                      value={q.status}
                      onChange={(e) => handleUpdateStatus(q.id, e.target.value, q.customer)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        border: "1px solid rgba(255,255,255,0.2)",
                        outline: "none",
                        textAlign: "center",
                        background:
                          q.status === "Chưa xử lý"
                            ? "#881337"
                            : q.status === "Đang xử lý"
                            ? "#78350f"
                            : q.status === "Đã báo giá"
                            ? "#075985"
                            : q.status === "Đã chốt"
                            ? "#14532d"
                            : "#334155",
                        color: "#ffffff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                        whiteSpace: "nowrap"
                      }}
                    >
                      <option value="Chưa xử lý" style={{ background: "#1f1315", color: "#fca5a5" }}>Chưa xử lý</option>
                      <option value="Đang xử lý" style={{ background: "#261a0b", color: "#fde047" }}>Đang xử lý</option>
                      <option value="Đã báo giá" style={{ background: "#0c1e28", color: "#7dd3fc" }}>Đã báo giá</option>
                      <option value="Đã chốt" style={{ background: "#0c2417", color: "#86efac" }}>Đã chốt</option>
                      <option value="Đã hủy" style={{ background: "#1e293b", color: "#cbd5e1" }}>Đã hủy</option>
                      <option value="delete" style={{ background: "#450a0a", color: "#f87171", fontWeight: 700 }}>Xóa yêu cầu</option>
                    </select>
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
