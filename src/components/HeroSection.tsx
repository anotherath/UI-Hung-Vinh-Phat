import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="container">
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
