import React from "react";
import Link from "next/link";

interface BrandCardItem {
  name: string;
  sub: string;
  img: string;
  categorySlug: string;
}

const SHOWROOM_BRANDS: BrandCardItem[] = [
  { name: "Hoa Sen", sub: "Tôn • Thép • Ống thép • Gạch • Ngói", img: "/images/roofing_aluminum.jpg", categorySlug: "ton-nhom" },
  { name: "Hòa Phát", sub: "Sắt • Thép xây dựng • Ống thép", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" },
  { name: "Lustile", sub: "Gạch ốp lát Porcelain cao cấp", img: "/images/ceramic_tiles.jpg", categorySlug: "gach-men" },
  { name: "Tuslo", sub: "Thiết bị nhà tắm & vệ sinh cao cấp", img: "/images/sanitary_ware.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Lustime", sub: "Ngói tráng men siêu nhẹ", img: "/images/roof_tiles.jpg", categorySlug: "gach-ngoi" },
  { name: "Trường Thành", sub: "Nhôm hệ • Nhôm định hình • Phụ kiện", img: "/images/plastic_panel.jpg", categorySlug: "ton-nhom" },
  { name: "Lustra", sub: "Gạch men cẩm thạch Ấn Độ", img: "/images/wood_material.jpg", categorySlug: "gach-men" },
  { name: "Đức Việt", sub: "Sắt • Thép xây dựng móng", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" },
  { name: "Olympic", sub: "Tôn mạ màu • Tấm lợp cách nhiệt", img: "/images/roofing_aluminum.jpg", categorySlug: "ton-nhom" },
  { name: "Vtec", sub: "Tôn mạ • Vật liệu lợp mái", img: "/images/hero_bright_architecture.jpg", categorySlug: "ton-nhom" },
  { name: "Ngân Hoa", sub: "Ống nhựa & Phụ kiện cấp thoát nước", img: "/images/plastic_panel.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Nam Dương", sub: "Ống nhựa & Phụ kiện nhựa", img: "/images/plastic_panel.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Việt Xô", sub: "Nhựa • Ống & phụ kiện công trình", img: "/images/plastic_panel.jpg", categorySlug: "thiet-bi-ve-sinh" },
  { name: "Việt Đức", sub: "Thép xây dựng • Thép cuộn", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" },
  { name: "VAS", sub: "Thép xây dựng • Thép móng công trình", img: "/images/steel_construction.jpg", categorySlug: "sat-thep" }
];

export default function ShowroomSection() {
  return (
    <section className="section" id="showroom" style={{ background: "#fff" }}>
      <div className="container">
        <div className="head" style={{ textAlign: "left", marginBottom: "28px" }}>
          <div className="eyebrow">SHOWROOM ONLINE</div>
          <h2>Chọn thương hiệu để xem sản phẩm</h2>
          <p>Bấm vào từng thương hiệu để mở danh sách sản phẩm tương ứng.</p>
        </div>

        <div className="brand-grid">
          {SHOWROOM_BRANDS.map((item) => (
            <Link
              key={item.name}
              href={`/category/${item.categorySlug}`}
              className="brand-card"
            >
              <div className="brand-img" style={{ backgroundImage: `url('${item.img}')` }}></div>
              <div className="brand-body">
                <b>{item.name.toUpperCase()}</b>
                <span>{item.sub}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
