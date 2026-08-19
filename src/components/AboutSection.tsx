import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  pb,
  getPbImageUrl,
  PbSiteSettingsRecord
} from "@/lib/pocketbase";

async function getAboutImage(): Promise<string> {
  try {
    const settingsRes = await pb.collection("site_settings").getList<PbSiteSettingsRecord>(1, 1, {
      filter: 'key = "homepage_customization"',
      requestKey: null
    });
    const settings = settingsRes.items[0];
    if (settings && settings.aboutImage) {
      return getPbImageUrl("site_settings", settings.id, settings.aboutImage);
    }
  } catch (err) {
    console.error("Lỗi tải ảnh Về Hưng Vinh Phát từ PocketBase:", err);
  }
  return "/images/hero_bright_architecture.jpg";
}

export default async function AboutSection() {
  const aboutImageSrc = await getAboutImage();

  return (
    <section className="section about" id="about" style={{ background: "#fafbfa", padding: "72px 0" }}>
      <div className="container aboutgrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>

        {/* Left Dynamic Image from Settings */}
        <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", height: "390px", background: "#f0f4f2" }}>
          <img
            src={aboutImageSrc}
            alt="Hưng Vinh Phát - Đặt chất lượng công trình lên hàng đầu"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right Content */}
        <div>
          <div className="eyebrow" style={{ color: "var(--gold)", letterSpacing: "2.5px", fontWeight: 600, fontSize: "11px" }}>
            VỀ HƯNG VINH PHÁT
          </div>
          <h2 style={{ fontSize: "28px", color: "var(--dark)", margin: "8px 0 14px", fontWeight: 500, lineHeight: 1.35 }}>
            Đặt chất lượng công trình lên hàng đầu.
          </h2>
          <p style={{ color: "#66726d", fontSize: "14.5px", lineHeight: 1.7, marginBottom: "24px", fontWeight: 400 }}>
            Hưng Vinh Phát tự hào là nhà phân phối chiến lược hệ thống Hoa Sen Home, hướng tới trở thành địa chỉ tin cậy hàng đầu về vật liệu xây dựng phần thô & thiết bị hoàn thiện, cung cấp sản phẩm chính hãng kèm dịch vụ tư vấn tận tâm.
          </p>

          {/* Clean 4 Value Points */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "28px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <Check size={13} strokeWidth={2.5} />
              </div>
              <div>
                <strong style={{ fontSize: "14px", color: "var(--dark)", display: "block", fontWeight: 500 }}>Hàng chính hãng</strong>
                <span style={{ fontSize: "12px", color: "#88928e", fontWeight: 400 }}>100% chứng nhận CO/CQ</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <Check size={13} strokeWidth={2.5} />
              </div>
              <div>
                <strong style={{ fontSize: "14px", color: "var(--dark)", display: "block", fontWeight: 500 }}>Tư vấn tận tâm</strong>
                <span style={{ fontSize: "12px", color: "#88928e", fontWeight: 400 }}>Tối ưu chi phí công trình</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <Check size={13} strokeWidth={2.5} />
              </div>
              <div>
                <strong style={{ fontSize: "14px", color: "var(--dark)", display: "block", fontWeight: 500 }}>Giá cạnh tranh</strong>
                <span style={{ fontSize: "12px", color: "#88928e", fontWeight: 400 }}>Giá gốc từ nhà máy</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <Check size={13} strokeWidth={2.5} />
              </div>
              <div>
                <strong style={{ fontSize: "14px", color: "var(--dark)", display: "block", fontWeight: 500 }}>Giao hàng linh hoạt</strong>
                <span style={{ fontSize: "12px", color: "#88928e", fontWeight: 400 }}>Giao tận chân công trình</span>
              </div>
            </div>
          </div>

          {/* Clean Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/about" className="btn primary" style={{ borderRadius: "5px", padding: "10px 18px", fontWeight: 500 }}>
              Tìm hiểu thêm về công ty
            </Link>
            <Link href="/brands" className="btn" style={{ background: "transparent", color: "var(--green)", border: "1px solid var(--green)", borderRadius: "5px", padding: "10px 18px", fontWeight: 500 }}>
              Xem đối tác chiến lược
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
