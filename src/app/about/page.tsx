import React from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/data/companyData";
import ProductCard from "@/components/ProductCard";
import { FileText, MapPin, Phone, Mail, Clock, BadgeCheck, Handshake, Truck, Award } from "lucide-react";

import Breadcrumb from "@/components/Breadcrumb";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "5rem" }}>
      {/* Breadcrumb Navigation Bar */}
      <Breadcrumb items={[{ label: "Giới thiệu" }]} />
      
      {/* 1. Header Banner */}
      <section style={{ backgroundColor: "#fafbf8", padding: "52px 0 36px", borderBottom: "1px solid #eee" }}>
        <div className="container">
          <div className="eyebrow">HỒ SƠ NĂNG LỰC DOANH NGHIỆP</div>
          <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--green)", margin: "8px 0 10px" }}>
            Về Công Ty Hưng Vinh Phát
          </h1>
          <p style={{ fontSize: "15px", color: "#66726d", maxWidth: "750px", lineHeight: 1.7, fontWeight: 400 }}>
            {COMPANY_INFO.name} — Nhà phân phối chính thức hệ thống Hoa Sen Home. Uy tín trong từng sản phẩm, trách nhiệm trong từng công trình từ năm 2015.
          </p>
        </div>
      </section>

      {/* 2. Thư Ngỏ Ban Giám Đốc */}
      <section style={{ padding: "56px 0", borderBottom: "1px solid #f0f2f0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "48px", alignItems: "center" }} className="about-grid">
            
            {/* Image */}
            <div style={{ position: "relative" }}>
              <div className="about-hero-img" style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.05)", height: "400px" }}>
                <img
                  src="/images/hero_bright_architecture.jpg"
                  alt="Trụ sở Hưng Vinh Phát"
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

      {/* 3. REFINED ELEGANT DUAL SHOWCASE: HỒ SƠ PHÁP LÝ & 4 TRỤ CỘT NĂNG LỰC */}
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

            {/* RIGHT PANEL: Redesigned High-End Core Values & Pillars */}
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
                    <strong style={{ fontSize: "14.5px", color: "var(--dark)", display: "block", marginBottom: "4px", fontWeight: 500 }}>
                      Chuẩn Mực Chất Lượng
                    </strong>
                    <span style={{ fontSize: "12.5px", color: "#77827d", lineHeight: 1.5, display: "block", fontWeight: 400 }}>
                      100% hàng nhập trực tiếp từ nhà máy với chứng chỉ CO/CQ minh bạch.
                    </span>
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
                      <Handshake size={22} strokeWidth={1.5} style={{ color: "var(--green)" }} />
                    </div>
                    <strong style={{ fontSize: "14.5px", color: "var(--dark)", display: "block", marginBottom: "4px", fontWeight: 500 }}>
                      Báo Giá Trực Tiếp Nhà Máy
                    </strong>
                    <span style={{ fontSize: "12.5px", color: "#77827d", lineHeight: 1.5, display: "block", fontWeight: 400 }}>
                      Chính sách chiết khấu tốt nhất tối ưu ngân sách công trình.
                    </span>
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
                    <strong style={{ fontSize: "14.5px", color: "var(--dark)", display: "block", marginBottom: "4px", fontWeight: 500 }}>
                      Vận Chuyển Siêu Tốc 24/7
                    </strong>
                    <span style={{ fontSize: "12.5px", color: "#77827d", lineHeight: 1.5, display: "block", fontWeight: 400 }}>
                      Hệ thống xe cẩu chuyên dụng giao hàng tận chân công trình.
                    </span>
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
                      <Award size={22} strokeWidth={1.5} style={{ color: "var(--green)" }} />
                    </div>
                    <strong style={{ fontSize: "14.5px", color: "var(--dark)", display: "block", marginBottom: "4px", fontWeight: 500 }}>
                      Đồng Hành & Bảo Hành
                    </strong>
                    <span style={{ fontSize: "12.5px", color: "#77827d", lineHeight: 1.5, display: "block", fontWeight: 400 }}>
                      Tư vấn kỹ thuật tận tâm & bảo hành chính hãng lâu dài.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Năng Lực Phân Phối Vật Liệu Trọn Gói — WITH REALISTIC PRICES & COMPACT BUTTON */}
      <section className="section" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #eee" }}>
        <div className="container">
          <div className="head" style={{ textAlign: "left", marginBottom: "28px" }}>
            <div className="eyebrow">DANH MỤC CUNG ỨNG TRỌN GÓI</div>
            <h2>Năng Lực Phân Phối Vật Liệu Xây Dựng & Thiết Bị</h2>
            <p>Cung cấp giải pháp trọn gói từ vật liệu thô đến thiết bị hoàn thiện chính hãng với chứng chỉ CO/CQ minh bạch.</p>
          </div>

          <div className="categories" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            <Link href="/category/sat-thep" className="cat" style={{ backgroundImage: "url('/images/steel_construction.jpg')" }}>
              <div>Sắt & thép xây dựng</div>
            </Link>

            <Link href="/category/ton-nhom" className="cat" style={{ backgroundImage: "url('/images/roofing_aluminum.jpg')" }}>
              <div>Tôn & nhôm công trình</div>
            </Link>

            <Link href="/category/gach-men" className="cat" style={{ backgroundImage: "url('/images/ceramic_tiles.jpg')" }}>
              <div>Gạch men & ốp lát</div>
            </Link>

            <Link href="/category/thiet-bi-ve-sinh" className="cat" style={{ backgroundImage: "url('/images/sanitary_ware.jpg')" }}>
              <div>Thiết bị vệ sinh</div>
            </Link>

            <Link href="/category/gach-ngoi" className="cat" style={{ backgroundImage: "url('/images/roof_tiles.jpg')" }}>
              <div>Ngói & mái lợp cao cấp</div>
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

      {/* 5. DELICATE MINIMALIST ELEGANT CONTACT CARD */}
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
            
            {/* Google Maps iFrame */}
            <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", minHeight: "300px", border: "1px solid #e2e8e4" }}>
              <iframe
                title="Bản đồ Google Maps vị trí Hưng Vinh Phát"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14930.648215987!2d106.145!3d20.612!2m3!1f0!2f0!3f0!3m2!1i1024!2768!4f13.1!3m3!1m2!1s0x3135c3456789%3A0x123456789!2zVGjBtG4gxJDhu5NuZyBM4bqhYywgeMOjIEjGsG5nIEjDoCwgdMSpbmggSMawbmcgWcOqbg!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* DELICATE MINIMALIST ELEGANT CONTACT CARD */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "36px 30px",
                borderRadius: "14px",
                border: "1px solid #e8ece8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
                  KHO BÃI & TRỤ SỞ VẬN CHUYỂN
                </div>
                <h3 style={{ fontSize: "22px", color: "var(--green)", marginBottom: "22px", fontWeight: 700 }}>
                  Hưng Vinh Phát
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  {/* Address Field */}
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", paddingBottom: "14px", borderBottom: "1px solid #f2f4f2" }}>
                    <MapPin size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div style={{ lineHeight: 1.5 }}>
                      <span style={{ color: "#88928e", fontSize: "12px", display: "block", fontWeight: 400, marginBottom: "2px" }}>
                        Địa chỉ trụ sở & kho bãi:
                      </span>
                      <span style={{ color: "#2d3532", fontSize: "14px", fontWeight: 500 }}>
                        {COMPANY_INFO.address}
                      </span>
                    </div>
                  </div>

                  {/* Hotlines Field */}
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", paddingBottom: "14px", borderBottom: "1px solid #f2f4f2" }}>
                    <Phone size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div style={{ lineHeight: 1.5 }}>
                      <span style={{ color: "#88928e", fontSize: "12px", display: "block", fontWeight: 400, marginBottom: "2px" }}>
                        Hotlines hỗ trợ:
                      </span>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--green)" }}>
                        <a href={`tel:${COMPANY_INFO.phoneRaw[0]}`} style={{ color: "var(--green)", fontWeight: 500 }}>{COMPANY_INFO.phones[0]}</a>
                        <span style={{ color: "#ccc", margin: "0 8px", fontWeight: 300 }}>•</span>
                        <a href={`tel:${COMPANY_INFO.phoneRaw[1]}`} style={{ color: "var(--green)", fontWeight: 500 }}>{COMPANY_INFO.phones[1]}</a>
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", paddingBottom: "14px", borderBottom: "1px solid #f2f4f2" }}>
                    <Mail size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div style={{ lineHeight: 1.5 }}>
                      <span style={{ color: "#88928e", fontSize: "12px", display: "block", fontWeight: 400, marginBottom: "2px" }}>
                        Email liên hệ:
                      </span>
                      <span style={{ color: "#2d3532", fontSize: "14px", fontWeight: 500 }}>
                        {COMPANY_INFO.email}
                      </span>
                    </div>
                  </div>

                  {/* Hours Field */}
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <Clock size={18} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "3px" }} />
                    <div style={{ lineHeight: 1.5 }}>
                      <span style={{ color: "#88928e", fontSize: "12px", display: "block", fontWeight: 400, marginBottom: "2px" }}>
                        Giờ làm việc kho bãi:
                      </span>
                      <span style={{ color: "#2d3532", fontSize: "14px", fontWeight: 500 }}>
                        7:30 — 17:30 (Thứ 2 — Chủ Nhật)
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* REFINED ELEGANT DELICATE CALL BUTTON */}
              <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #edf0ee" }}>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw[0]}`}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "11px 18px",
                    fontSize: "13.5px",
                    borderRadius: "6px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "var(--green)",
                    color: "#ffffff",
                    textDecoration: "none",
                    letterSpacing: "0.3px",
                    transition: "all 0.2s ease"
                  }}
                >
                  <Phone size={15} />
                  <span>Gọi Hotline Ngay</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
