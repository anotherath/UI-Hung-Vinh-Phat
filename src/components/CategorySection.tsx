import React from "react";
import Link from "next/link";

export default function CategorySection() {
  return (
    <section className="section">
      <div className="container">
        <div className="head" style={{ textAlign: "left", marginBottom: "28px" }}>
          <div className="eyebrow">DANH MỤC</div>
          <h2>Giải pháp vật liệu toàn diện</h2>
          <p>Từ phần thô đến hoàn thiện, lựa chọn phù hợp cho từng công trình.</p>
        </div>

        <div className="categories" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <Link href="/category/gach-men" className="cat" style={{ backgroundImage: "url('/images/ceramic_tiles.jpg')" }}>
            <div>Gạch men ốp lát</div>
          </Link>
          <Link href="/category/thiet-bi-ve-sinh" className="cat" style={{ backgroundImage: "url('/images/sanitary_ware.jpg')" }}>
            <div>Thiết bị vệ sinh</div>
          </Link>
          <Link href="/category/gach-ngoi" className="cat" style={{ backgroundImage: "url('/images/roof_tiles.jpg')" }}>
            <div>Ngói & mái lợp</div>
          </Link>
          <Link href="/category/ton-nhom" className="cat" style={{ backgroundImage: "url('/images/roofing_aluminum.jpg')" }}>
            <div>Tôn & nhôm công trình</div>
          </Link>
          <Link href="/category/sat-thep" className="cat" style={{ backgroundImage: "url('/images/steel_construction.jpg')" }}>
            <div>Sắt & thép xây dựng</div>
          </Link>
          <Link href="/category/nhua-op" className="cat" style={{ backgroundImage: "url('/images/plastic_panel.jpg')" }}>
            <div>Nhựa ốp trang trí</div>
          </Link>
          <Link href="/category/go" className="cat" style={{ backgroundImage: "url('/images/wood_material.jpg')" }}>
            <div>Gỗ tự nhiên & công nghiệp</div>
          </Link>
          <Link href="/categories" className="cat" style={{ backgroundImage: "url('/images/hero_bright_architecture.jpg')" }}>
            <div>Vật liệu Hoa Sen Home</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
