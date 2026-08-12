import React from "react";
import Link from "next/link";

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
        padding: "16px 0 12px",
        fontSize: "13.5px",
        color: "#88948e",
        fontWeight: 400,
        letterSpacing: "0.1px",
        ...style
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0px",
            lineHeight: 1.4
          }}
        >
          {/* Home Link */}
          <Link
            href="/"
            style={{
              color: "#7e8b85",
              textDecoration: "none",
              transition: "color 0.2s ease"
            }}
          >
            Trang chủ
          </Link>

          {/* Breadcrumb Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <span style={{ margin: "0 8px", color: "#b5c0ba", fontSize: "12px" }}>/</span>
                {isLast || !item.href ? (
                  <span style={{ color: "#222222", fontWeight: 500 }}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    style={{
                      color: "#7e8b85",
                      textDecoration: "none",
                      transition: "color 0.2s ease"
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
