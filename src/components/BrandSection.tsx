import React from "react";

export default function BrandSection() {
  return (
    <section className="section" id="brands">
      <div className="container">
        <div className="head">
          <div className="eyebrow">THƯƠNG HIỆU & NHÀ CUNG CẤP</div>
          <h2>Danh mục thương hiệu</h2>
          <p>Đa dạng lựa chọn cho từng hạng mục công trình.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #0b3b32, #123f36)",
              borderRadius: "14px",
              padding: "30px",
              color: "#fff",
              gridColumn: "1 / -1"
            }}
          >
            <div className="eyebrow">ĐỐI TÁC CHIẾN LƯỢC</div>
            <h3 style={{ fontSize: "30px", marginTop: "5px" }}>HOA SEN HOME</h3>
            <p style={{ color: "#d8e3df", marginTop: "6px" }}>
              Gạch Lustra • Lustile | Ngói Lustime | Thiết bị nhà tắm Tuslo | Tôn Hoa Sen | Ống thép Hoa Sen
            </p>
          </div>

          <div className="brandbox">
            <b>NHÔM</b>
            <h3>Trường Thành</h3>
          </div>
          <div className="brandbox">
            <b>SẮT</b>
            <h3>Hòa Phát • Hoa Sen • Đức Việt</h3>
          </div>
          <div className="brandbox">
            <b>TÔN</b>
            <h3>Hoa Sen • Olympic • Vtec</h3>
          </div>
          <div className="brandbox">
            <b>NHỰA</b>
            <h3>Ngân Hoa • Nam Dương • Việt Xô</h3>
          </div>
          <div className="brandbox">
            <b>THÉP</b>
            <h3>Hòa Phát • Việt Đức • VAS • ...</h3>
          </div>
          <div className="brandbox">
            <b>HOÀN THIỆN</b>
            <h3>Lustra • Lustile • Lustime • Tuslo</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
