import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero" id="home" style={{ position: "relative", overflow: "hidden" }}>
      {/* Preloaded Local Hero Architecture Image */}
      <Image
        src="/images/hero_architecture.jpg"
        alt="Hưng Vinh Phát - Vật liệu xây dựng & kiến trúc cao cấp"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={88}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0
        }}
      />

      {/* Dark Overlay Gradient Tint */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.38) 60%, rgba(0, 0, 0, 0.22) 100%)",
          zIndex: 1
        }}
      />

      {/* Hero Text Content */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="eyebrow">KIẾN TẠO GIÁ TRỊ BỀN VỮNG</div>
        <h1>
          Vật liệu chuẩn.<br />
          Công trình đẳng cấp.
        </h1>
        <p>
          Hưng Vinh Phát cung cấp đa dạng vật liệu xây dựng và thiết bị chính hãng, đồng hành cùng gia đình, nhà thầu và các công trình.
        </p>
        <Link className="btn primary" href="/products">
          Xem sản phẩm
        </Link>
        <a className="btn outline" href="/#contact">
          Nhận báo giá
        </a>
      </div>
    </section>
  );
}
