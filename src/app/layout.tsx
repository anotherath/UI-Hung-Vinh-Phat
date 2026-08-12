import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: "Công ty SX TM & DV HƯNG VINH PHÁT | Vật liệu xây dựng & thiết bị",
  description: "Công ty Sản Xuất Thương Mại Và Dịch Vụ Hưng Vinh Phát - Nhà phân phối độc quyền vật liệu xây dựng phần thô và hoàn thiện: Sắt, Thép Hòa Phát, Tôn Hoa Sen, Gạch men Lustra, Thiết bị vệ sinh Tuslo, Gỗ, Nhôm Trường Thành. MST: 1001071679.",
  keywords: ["Hưng Vinh Phát", "Hoa Sen Home", "Vật liệu xây dựng Hưng Yên", "Thép Hòa Phát", "Tôn Hoa Sen", "Gạch men Lustra", "Nhôm Trường Thành", "Thiết bị vệ sinh Tuslo"],
  authors: [{ name: "Hưng Vinh Phát" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png"
  },
  openGraph: {
    title: "Công ty SX TM & DV HƯNG VINH PHÁT | Vật liệu xây dựng & thiết bị",
    description: "Nhà phân phối độc quyền vật liệu xây dựng phần thô và hoàn thiện chính hãng: Thép Hòa Phát, Tôn Hoa Sen, Gạch men Lustra, Thiết bị vệ sinh Tuslo.",
    url: "https://github.com/anotherath/UI-Hung-Vinh-Phat",
    siteName: "Hưng Vinh Phát",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Hưng Vinh Phát - Kiến Trúc & Vật Liệu Xây Dựng Cao Cấp"
      }
    ],
    locale: "vi_VN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Công ty SX TM & DV HƯNG VINH PHÁT | Vật liệu xây dựng & thiết bị",
    description: "Nhà phân phối độc quyền vật liệu xây dựng phần thô và hoàn thiện chính hãng.",
    images: ["/images/og-preview.jpg"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <meta property="og:title" content="Công ty SX TM & DV HƯNG VINH PHÁT | Vật liệu xây dựng & thiết bị" />
        <meta property="og:description" content="Nhà phân phối độc quyền vật liệu xây dựng phần thô và hoàn thiện chính hãng." />
        <meta property="og:image" content="/images/og-preview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/og-preview.jpg" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
