"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControl({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: PaginationControlProps) {
  if (totalItems === 0) return null;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        background: "rgba(0, 0, 0, 0.25)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        flexWrap: "wrap",
        gap: "10px",
        fontSize: "12.5px"
      }}
    >
      <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>
        Hiển thị <strong style={{ color: "#fff" }}>{startIdx} - {endIdx}</strong> trên tổng số <strong style={{ color: "#c6a15b" }}>{totalItems}</strong> mục
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "5px 10px",
            background: currentPage <= 1 ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            color: currentPage <= 1 ? "rgba(255, 255, 255, 0.3)" : "#ffffff",
            cursor: currentPage <= 1 ? "not-allowed" : "pointer",
            fontSize: "12px",
            fontWeight: 600,
            transition: "all 0.15s"
          }}
        >
          <ChevronLeft size={14} />
          <span>Trước</span>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              style={{
                minWidth: "30px",
                height: "28px",
                padding: "0 6px",
                background: isActive ? "#c6a15b" : "rgba(255, 255, 255, 0.06)",
                color: isActive ? "#0a1714" : "#ffffff",
                border: isActive ? "1px solid #c6a15b" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s"
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "5px 10px",
            background: currentPage >= totalPages ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            color: currentPage >= totalPages ? "rgba(255, 255, 255, 0.3)" : "#ffffff",
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
            fontSize: "12px",
            fontWeight: 600,
            transition: "all 0.15s"
          }}
        >
          <span>Sau</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
