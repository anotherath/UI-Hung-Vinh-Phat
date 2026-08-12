import React from "react";
import Link from "next/link";

export interface ProductCardProps {
  image: string;
  name: string;
  priceText?: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  detailUrl?: string;
  onDetailClick?: () => void;
  style?: React.CSSProperties;
}

export default function ProductCard({
  image,
  name,
  priceText,
  subtitle,
  description,
  buttonText = "Xem chi tiết",
  detailUrl,
  onDetailClick,
  style
}: ProductCardProps) {
  const displaySub = priceText || subtitle;

  const handleContainerClick = () => {
    if (onDetailClick && !detailUrl) {
      onDetailClick();
    }
  };

  return (
    <article className="product" style={style}>
      {/* Clickable Image */}
      {detailUrl ? (
        <Link href={detailUrl} style={{ display: "block", overflow: "hidden", cursor: "pointer" }}>
          <img src={image} alt={name} style={{ transition: "transform 0.3s ease" }} />
        </Link>
      ) : (
        <div onClick={handleContainerClick} style={{ cursor: "pointer", overflow: "hidden" }}>
          <img src={image} alt={name} style={{ transition: "transform 0.3s ease" }} />
        </div>
      )}

      {/* Info Container */}
      <div className="info" style={{ textAlign: "left" }}>
        {/* Clickable Title */}
        {detailUrl ? (
          <Link href={detailUrl} style={{ textDecoration: "none", color: "inherit" }}>
            <h3 style={{ cursor: "pointer" }}>{name}</h3>
          </Link>
        ) : (
          <h3 onClick={handleContainerClick} style={{ cursor: "pointer" }}>
            {name}
          </h3>
        )}

        {displaySub && <div className="price">{displaySub}</div>}
        <div className="mini">{description}</div>

        {/* Clickable Button */}
        <div style={{ marginTop: "auto", paddingTop: "12px", width: "100%" }}>
          {detailUrl ? (
            <Link
              href={detailUrl}
              className="buy"
              style={{
                fontSize: "12.5px",
                padding: "9px 12px",
                fontWeight: 500,
                display: "block",
                width: "100%",
                textAlign: "center",
                borderRadius: "6px"
              }}
            >
              {buttonText}
            </Link>
          ) : (
            <button
              className="buy"
              type="button"
              onClick={onDetailClick}
              style={{
                cursor: "pointer",
                border: "none",
                fontSize: "12.5px",
                padding: "9px 12px",
                fontWeight: 500,
                display: "block",
                width: "100%",
                textAlign: "center",
                borderRadius: "6px"
              }}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
