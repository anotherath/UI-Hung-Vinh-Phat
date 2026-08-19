import React from "react";
import Link from "next/link";
import Image from "next/image";
import { pb, getPbImageUrl, PbSiteSettingsRecord } from "@/lib/pocketbase";

async function getHeroImage(): Promise<string> {
  try {
    const res = await pb.collection("site_settings").getList<PbSiteSettingsRecord>(1, 1, {
      filter: 'key = "homepage_customization"',
      requestKey: null
    });
    const record = res.items[0];
    if (record && record.heroImage) {
      return getPbImageUrl("site_settings", record.id, record.heroImage);
    }
  } catch (err) {
    console.error("Lỗi lấy ảnh hero từ PocketBase:", err);
  }
  return "/images/hero_architecture.jpg";
}

export default async function HeroSection() {
  const heroImageSrc = await getHeroImage();
  const isRemote = heroImageSrc.startsWith("http");

  return (
    <section className="hero" id="home" style={{ position: "relative", overflow: "hidden" }}>
      {/* Hero Architecture Image from Settings */}
      <Image
        src={heroImageSrc}
        alt="Hưng Vinh Phát - Vật liệu xây dựng & kiến trúc cao cấp"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        unoptimized={isRemote}
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
