import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  style?: React.CSSProperties;
}

export default function Breadcrumb({ items, style }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: "12px 0",
        fontSize: "13px",
        color: "#66726d",
        fontWeight: 400,
        ...style
      }}
    >
      <div className="container">
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            listStyle: "none",
            margin: 0,
            padding: 0
          }}
        >
          {/* Home Link */}
          <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Link
              href="/"
              style={{
                color: "#55635d",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "color 0.2s ease"
              }}
            >
              <Home size={14} color="var(--green)" />
              <span>Trang chủ</span>
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <li style={{ display: "flex", alignItems: "center", color: "#b5c0ba" }}>
                  <ChevronRight size={13} />
                </li>
                <li style={{ display: "flex", alignItems: "center" }}>
                  {isLast || !item.href ? (
                    <span style={{ color: "#111111", fontWeight: 600 }}>
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      style={{
                        color: "#55635d",
                        textDecoration: "none",
                        transition: "color 0.2s ease"
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
