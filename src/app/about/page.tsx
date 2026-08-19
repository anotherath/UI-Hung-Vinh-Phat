import React from "react";
import Link from "next/link";
import { COMPANY_INFO, PRODUCT_CATEGORIES } from "@/data/companyData";
import {
  pb,
  getPbImageUrl,
  PbSiteSettingsRecord,
  PbCategoryRecord
} from "@/lib/pocketbase";
import { FileText, MapPin, Phone, Mail, Clock, BadgeCheck, Handshake, Truck, Award } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export const dynamic = "force-dynamic";

interface AboutCategoryItem {
  id?: string;
  name: string;
  slug: string;
  image: string;
}

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

async function getAboutCategories(): Promise<AboutCategoryItem[]> {
  try {
    // 1. Lấy danh sách ngành hàng được chọn trong settings (Mục 2: Section DANH MỤC)
    const settingsRes = await pb.collection("site_settings").getList<PbSiteSettingsRecord>(1, 1, {
      filter: 'key = "homepage_customization"',
      requestKey: null
    });
    const settings = settingsRes.items[0];
    const selectedSlugs = settings?.selectedCategories || [];

    // 2. Lấy toàn bộ ngành hàng từ PocketBase
    const catRecords = await pb.collection("categories").getFullList<PbCategoryRecord>({
      requestKey: null
    });

    if (catRecords && catRecords.length > 0) {
      if (selectedSlugs.length > 0) {
        const matched = selectedSlugs
          .map((slug) => catRecords.find((c) => c.slug === slug))
          .filter((c): c is PbCategoryRecord => Boolean(c))
          .slice(0, 8)
          .map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            image: getPbImageUrl("categories", c.id, c.image) || "/images/steel_construction.jpg"
          }));

        if (matched.length > 0) {
          return matched;
        }
      }

      return catRecords.slice(0, 8).map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        image: getPbImageUrl("categories", c.id, c.image) || "/images/steel_construction.jpg"
      }));
    }
  } catch (err) {
    console.error("Lỗi tải danh mục trong trang About từ PocketBase:", err);
  }

  return PRODUCT_CATEGORIES.slice(0, 8).map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image || "/images/steel_construction.jpg"
  }));
}

export default async function AboutPage() {
  const [aboutImageSrc, categories] = await Promise.all([
    getAboutImage(),
    getAboutCategories()
  ]);

  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "5rem" }}>
      {/* 1. Header Banner */}
      <section style={{ backgroundColor: "#fafbf8", padding: "52px 0 36px", borderBottom: "1px solid #eee" }}>
        <div className="container">
          <div className="eyebrow">HỒ SƠ NĂNG LỰC DOANH NGHIỆP</div>
          <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--green)", margin: "8px 0 10px" }}>
            Về Công Ty Hưng Vinh Phát
          </h1>
          <p style={{ fontSize: "15px", color: "#66726d", maxWidth: "750px", lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
            {COMPANY_INFO.name} — Nhà phân phối chính thức hệ thống Hoa Sen Home. Uy tín trong từng sản phẩm, trách nhiệm trong từng công trình từ năm 2015.
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation Bar */}
      <Breadcrumb items={[{ label: "Giới thiệu" }]} />

      {/* 2. Thư Ngỏ Ban Giám Đốc */}
      <section style={{ padding: "56px 0", borderBottom: "1px solid #f0f2f0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "48px", alignItems: "center" }} className="about-grid">

            {/* Dynamic Image from Site Settings */}
            <div style={{ position: "relative" }}>
              <div className="about-hero-img" style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", height: "400px", background: "#f4f6f5" }}>
                <img
                  src={aboutImageSrc}
                  alt="Trụ sở và nhà xưởng Hưng Vinh Phát"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  background: "rgba(11, 59, 50, 0.92)",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontSize: "12.5px",
                  backdropFilter: "blur(4px)"
                }}
              >
                <div style={{ color: "var(--gold)", fontWeight: 500 }}>Thành lập: {COMPANY_INFO.foundedDate}</div>
                <div style={{ fontWeight: 400, color: "#e2e8e4" }}>MST: {COMPANY_INFO.mst}</div>
              </div>
            </div>

            {/* Narrative */}
            <div>
              <div className="eyebrow">THƯ NGỎ BAN GIÁM ĐỐC</div>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "var(--dark)", margin: "8px 0 16px", lineHeight: 1.35 }}>
                Lời Chào & Triết Lý Đồng Hành Lâu Dài
              </h2>
              <div style={{ fontSize: "14.5px", color: "#4a5550", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "12px", fontWeight: 400 }}>
                <p>
                  <strong style={{ fontWeight: 600, color: "var(--dark)" }}>Kính gửi Quý Khách hàng và Quý Đối tác!</strong><br />
                  Công ty Sản Xuất Thương Mại Và Dịch Vụ Hưng Vinh Phát trân trọng gửi tới Quý Khách hàng và Quý Đối tác lời chào, lời cảm ơn và lời chúc hợp tác thành công bền vững.
                </p>
                <p>
                  Được thành lập từ ngày <span style={{ fontWeight: 500, color: "var(--dark)" }}>10/09/2015</span> (Mã số thuế <span style={{ fontWeight: 500, color: "var(--dark)" }}>1001071679</span>) tại Hưng Yên, Hưng Vinh Phát chuyên sâu trong lĩnh vực sản xuất, thương mại và dịch vụ vật liệu xây dựng phần thô & thiết bị hoàn thiện công trình.
                </p>
                <p>
                  Một dấu mốc quan trọng trong quá trình phát triển của Hưng Vinh Phát là trở thành nhà phân phối độc quyền hệ thống <span style={{ fontWeight: 500, color: "var(--green)" }}>Hoa Sen Home</span> (Tập đoàn Hoa Sen) cùng các thương hiệu lớn như Thép Hòa Phát, Nhôm Trường Thành, Gạch Men Lustra & Lustile, Thiết bị vệ sinh Tuslo.
                </p>
                <div style={{ padding: "12px 16px", background: "#fafbf8", borderLeft: "2px solid var(--gold)", borderRadius: "4px", color: "#2c3b35", fontWeight: 400, fontStyle: "italic", fontSize: "14px", lineHeight: 1.6 }}>
                  "Chúng tôi tin rằng uy tín không được xây dựng từ một giao dịch đơn lẻ, mà được hình thành qua sự đồng hành trách nhiệm lâu dài cùng khách hàng."
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HỒ SƠ PHÁP LÝ & 4 TRỤ CỘT NĂNG LỰC */}
      <section style={{ padding: "60px 0", backgroundColor: "#fafafa" }}>
        <div className="container">

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: "36px", alignItems: "stretch" }} className="about-grid">

            {/* LEFT PANEL: Forest Green Corporate Specs */}
            <div
              style={{
                background: "linear-gradient(145deg, #0b3b32 0%, #06231d 100%)",
                color: "#ffffff",
                borderRadius: "14px",
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 24px rgba(11, 59, 50, 0.12)",
                border: "1px solid rgba(198, 161, 91, 0.25)"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <FileText size={18} strokeWidth={1.5} style={{ color: "var(--gold)" }} />
                  <span style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
                    HỒ SƠ PHÁP LÝ BẮT BỘC
                  </span>
                </div>
                <h3 style={{ fontSize: "22px", color: "#ffffff", fontWeight: 500, marginBottom: "22px" }}>
                  Thông Tin Doanh Nghiệp Hưng Vinh Phát
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13.5px" }}>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: "11px", color: "var(--gold)", display: "block", fontWeight: 500 }}>Tên Doanh Nghiệp</span>
                    <span style={{ color: "#ffffff", fontSize: "14px", fontWeight: 500 }}>{COMPANY_INFO.name}</span>
                  </div>

                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: "11px", color: "var(--gold)", display: "block", fontWeight: 500 }}>Mã Số Thuế (MST)</span>
                    <span style={{ color: "#e0e8e4", fontWeight: 400 }}>{COMPANY_INFO.mst} (Cấp ngày {COMPANY_INFO.foundedDate})</span>
                  </div>

                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: "11px", color: "var(--gold)", display: "block", fontWeight: 500 }}>Địa Chỉ Trụ Sở & Kho Bãi</span>
                    <span style={{ color: "#e0e8e4", fontWeight: 400 }}>{COMPANY_INFO.address}</span>
                  </div>

                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: "11px", color: "var(--gold)", display: "block", fontWeight: 500 }}>Kinh Nghiệm Hoạt Động</span>
                    <span style={{ color: "#e0e8e4", fontWeight: 400 }}>{COMPANY_INFO.yearsExperience} năm kinh nghiệm (EST 2015)</span>
                  </div>

                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: "11px", color: "var(--gold)", display: "block", fontWeight: 500 }}>Hệ Thống Phân Phối</span>
                    <span style={{ color: "#ffffff", fontWeight: 500 }}>{COMPANY_INFO.partner.role}</span>
                  </div>

                  <div>
                    <span style={{ fontSize: "11px", color: "var(--gold)", display: "block", fontWeight: 500 }}>Hotlines Liên Hệ</span>
                    <span style={{ color: "#ffffff", fontWeight: 500 }}>{COMPANY_INFO.phones[0]} — {COMPANY_INFO.phones[1]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Core Values & Pillars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Vision & Mission Summary Pill */}
              <div style={{ background: "#ffffff", padding: "24px 28px", borderRadius: "14px", border: "1px solid #e8ece8", boxShadow: "0 4px 14px rgba(0,0,0,0.02)" }}>
                <div className="about-vision-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600, letterSpacing: "1.5px", marginBottom: "4px" }}>
                      TẦM NHÌN DÀI HẠN
                    </div>
                    <p style={{ fontSize: "13px", color: "#66726d", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                      Trở thành tổng kho vật liệu xây dựng và hoàn thiện hàng đầu khu vực, kết nối trực tiếp nhà máy đến tận chân công trình.
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600, letterSpacing: "1.5px", marginBottom: "4px" }}>
                      SỨ MỆNH PHỤC VỤ
                    </div>
                    <p style={{ fontSize: "13px", color: "#66726d", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                      Kiến tạo giá trị bền vững qua sản phẩm CO/CQ chuẩn nhà máy, tiến độ giao hàng vượt trội và tối ưu ngân sách cho nhà thầu.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Luxury Showcase */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e8ece8", boxShadow: "0 4px 14px rgba(0,0,0,0.02)", flex: 1 }}>
                <div className="eyebrow" style={{ marginBottom: "4px" }}>GIÁ TRỊ CỐT LÕI</div>
                <h4 style={{ fontSize: "20px", color: "var(--dark)", fontWeight: 500, marginBottom: "22px" }}>
                  4 Trụ Cột Năng Lực Hưng Vinh Phát
                </h4>

                <div className="about-pillars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {/* Pillar 01 */}
                  <div
                    style={{
                      background: "#fafbf8",
                      border: "1px solid #ebf0ec",
                      borderRadius: "12px",
                      padding: "20px 18px",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(198, 161, 91, 0.12)", color: "var(--gold-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "13px" }}>
                        01
                      </div>
                      <BadgeCheck size={22} strokeWidth={1.5} style={{ color: "var(--green)" }} />
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--dark)", marginBottom: "4px" }}>
                      Chính Hãng 100%
                    </div>
                    <p style={{ fontSize: "12.5px", color: "#66726d", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                      Mọi lô hàng đều có đầy đủ chứng chỉ chất lượng CO/CQ và hóa đơn VAT điện tử.
                    </p>
                  </div>

                  {/* Pillar 02 */}
                  <div
                    style={{
                      background: "#fafbf8",
                      border: "1px solid #ebf0ec",
                      borderRadius: "12px",
                      padding: "20px 18px",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(198, 161, 91, 0.12)", color: "var(--gold-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "13px" }}>
                        02
                      </div>
                      <Award size={22} strokeWidth={1.5} style={{ color: "var(--green)" }} />
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--dark)", marginBottom: "4px" }}>
                      Giá Xuất Xưởng
                    </div>
                    <p style={{ fontSize: "12.5px", color: "#66726d", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                      Hệ thống phân phối cấp 1 giúp tối ưu giá nhập trực tiếp cho các nhà thầu và dự án.
                    </p>
                  </div>

                  {/* Pillar 03 */}
                  <div
                    style={{
                      background: "#fafbf8",
                      border: "1px solid #ebf0ec",
                      borderRadius: "12px",
                      padding: "20px 18px",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(198, 161, 91, 0.12)", color: "var(--gold-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "13px" }}>
                        03
                      </div>
                      <Truck size={22} strokeWidth={1.5} style={{ color: "var(--green)" }} />
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--dark)", marginBottom: "4px" }}>
                      Giao Tận Chân Công Trình
                    </div>
                    <p style={{ fontSize: "12.5px", color: "#66726d", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                      Đội xe cẩu và tải chuyên dụng hạ hàng an toàn, đúng tiến độ thi công dầm sàn.
                    </p>
                  </div>

                  {/* Pillar 04 */}
                  <div
                    style={{
                      background: "#fafbf8",
                      border: "1px solid #ebf0ec",
                      borderRadius: "12px",
                      padding: "20px 18px",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(198, 161, 91, 0.12)", color: "var(--gold-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "13px" }}>
                        04
                      </div>
                      <Handshake size={22} strokeWidth={1.5} style={{ color: "var(--green)" }} />
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--dark)", marginBottom: "4px" }}>
                      Tư Vấn Tận Tâm
                    </div>
                    <p style={{ fontSize: "12.5px", color: "#66726d", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                      Đội ngũ kỹ thuật bóc tách bản vẽ, tính toán khối lượng vật tư chính xác và tiết kiệm.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. SẢN PHẨM & GIẢI PHÁP TIÊU BIỂU (Đồng bộ với mục 2 Section DANH MỤC trong settings) */}
      <section className="section" style={{ background: "#ffffff", padding: "64px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "14px" }}>
            <div>
              <div className="eyebrow" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: "var(--gold)" }}>
                DANH MỤC PHÂN PHỐI
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 500, color: "var(--dark)", marginTop: "6px" }}>
                Giải Pháp Vật Liệu Toàn Diện
              </h2>
            </div>
            <Link
              href="/products"
              className="btn"
              style={{ background: "transparent", color: "var(--green)", border: "1px solid var(--green)", borderRadius: "6px", padding: "8px 16px", fontSize: "13px", fontWeight: 500 }}
            >
              Xem tất cả sản phẩm
            </Link>
          </div>

          <div className="categories" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="cat"
                style={{ backgroundImage: `url('${cat.image}')` }}
              >
                <div>{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ĐỊA CHỈ & LIÊN HỆ */}
      <section style={{ padding: "56px 0", backgroundColor: "#fafafa" }}>
        <div className="container">
          <div style={{ marginBottom: "24px" }}>
            <div className="eyebrow" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: "var(--gold)" }}>
              ĐỊA CHỈ & LIÊN HỆ
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 500, color: "var(--dark)", marginTop: "6px" }}>
              Trụ Sở & Thông Tin Liên Hệ
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px", alignItems: "stretch" }} className="about-grid">

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e8ece8",
                borderRadius: "14px",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 14px rgba(0,0,0,0.02)"
              }}
            >
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--dark)", marginBottom: "8px" }}>
                  Tổng Kho & Văn Phòng Điều Hành
                </h3>
                <p style={{ color: "#66726d", fontSize: "14px", lineHeight: 1.6, margin: "0 0 24px", fontWeight: 400 }}>
                  Quý khách hàng và đối tác có thể ghé thăm trực tiếp kho bãi để kiểm tra mẫu mã quy cách hoặc bốc hàng nhanh theo xe cẩu.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <MapPin size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div>
                      <strong style={{ fontSize: "13.5px", color: "var(--dark)", display: "block", fontWeight: 600 }}>Địa chỉ trụ sở</strong>
                      <span style={{ fontSize: "13.5px", color: "#555", lineHeight: 1.5, fontWeight: 400 }}>{COMPANY_INFO.address}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Phone size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div>
                      <strong style={{ fontSize: "13.5px", color: "var(--dark)", display: "block", fontWeight: 600 }}>Điện thoại tư vấn / Báo giá dự án</strong>
                      <div style={{ display: "flex", gap: "12px", marginTop: "2px", flexWrap: "wrap" }}>
                        <a href={`tel:${COMPANY_INFO.phoneRaw[0]}`} style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                          {COMPANY_INFO.phones[0]}
                        </a>
                        <span style={{ color: "#ccc" }}>•</span>
                        <a href={`tel:${COMPANY_INFO.phoneRaw[1]}`} style={{ color: "var(--green)", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                          {COMPANY_INFO.phones[1]}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Mail size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div>
                      <strong style={{ fontSize: "13.5px", color: "var(--dark)", display: "block", fontWeight: 600 }}>Email liên hệ</strong>
                      <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: "var(--green)", fontSize: "13.5px", textDecoration: "none", fontWeight: 500 }}>
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Clock size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div>
                      <strong style={{ fontSize: "13.5px", color: "var(--dark)", display: "block", fontWeight: 600 }}>Thời gian làm việc</strong>
                      <span style={{ fontSize: "13.5px", color: "#555", fontWeight: 400 }}>Thứ 2 – Thứ 7: 07:00 – 18:00 (Hỗ trợ 24/7 qua Hotline)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #0b3b32 0%, #06231d 100%)",
                color: "#ffffff",
                borderRadius: "14px",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 8px 24px rgba(11, 59, 50, 0.15)"
              }}
            >
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)", letterSpacing: "2px", fontSize: "11px", fontWeight: 600 }}>
                  KẾT NỐI NHANH
                </span>
                <h3 style={{ fontSize: "20px", color: "#ffffff", fontWeight: 500, margin: "6px 0 12px" }}>
                  Yêu Cầu Báo Giá Khối Lượng
                </h3>
                <p style={{ color: "#d0dad5", fontSize: "13.5px", lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                  Gửi danh mục hoặc bản vẽ bóc tách vật tư. Hưng Vinh Phát hỗ trợ kiểm tra quy cách và báo giá chiết khấu trực tiếp cho nhà thầu.
                </p>
              </div>

              <div style={{ marginTop: "24px" }}>
                <Link
                  href="/#contact"
                  className="btn"
                  style={{
                    background: "linear-gradient(135deg, #c6a15b 0%, #a88442 100%)",
                    color: "#ffffff",
                    display: "block",
                    textAlign: "center",
                    padding: "12px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  Gửi Yêu Cầu Báo Giá Ngay
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
