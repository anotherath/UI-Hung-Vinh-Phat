import React from "react";
import { ShieldCheck, Layers, Zap, Award } from "lucide-react";

export default function StatsBar() {
  return (
    <section
      style={{
        background: "linear-gradient(90deg, #0b3b32 0%, #072b24 50%, #0b3b32 100%)",
        color: "#ffffff",
        padding: "22px 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(198, 161, 91, 0.25)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)"
      }}
    >
      <div className="container">
        <div className="stats-grid">
          {/* Item 1 */}
          <div className="stats-item">
            <ShieldCheck size={28} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "17px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.5px", lineHeight: 1.2 }}>
                100%
              </div>
              <span style={{ fontSize: "12.5px", color: "#d0dad5", fontWeight: 400, marginTop: "2px", display: "block" }}>
                Hàng chính hãng CO/CQ
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="stats-item">
            <Layers size={28} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "15.5px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.5px", lineHeight: 1.2 }}>
                ĐA DẠNG
              </div>
              <span style={{ fontSize: "12.5px", color: "#d0dad5", fontWeight: 400, marginTop: "2px", display: "block" }}>
                Danh mục vật liệu
              </span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="stats-item">
            <Zap size={28} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "15.5px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.5px", lineHeight: 1.2 }}>
                NHANH CHÓNG
              </div>
              <span style={{ fontSize: "12.5px", color: "#d0dad5", fontWeight: 400, marginTop: "2px", display: "block" }}>
                Tư vấn & báo giá
              </span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="stats-item" style={{ borderRight: "none" }}>
            <Award size={28} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "15.5px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.5px", lineHeight: 1.2 }}>
                UY TÍN
              </div>
              <span style={{ fontSize: "12.5px", color: "#d0dad5", fontWeight: 400, marginTop: "2px", display: "block" }}>
                Đồng hành công trình
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
