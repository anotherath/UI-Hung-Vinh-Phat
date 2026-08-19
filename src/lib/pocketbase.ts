import PocketBase, { RecordModel } from "pocketbase";

export const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && !window.location.hostname.includes("100.126.72.36")
    ? "https://admin.hungvinhphat.com"
    : "http://100.126.72.36:8090");

export const pb = new PocketBase(PB_URL);

// Vô hiệu hóa auto cancellation để tránh lỗi 400 khi nhiều request chạy đồng thời trong React
pb.autoCancellation(false);

// Hỗ trợ đồng bộ auth token giữa localStorage và Cookie phía browser
if (typeof window !== "undefined") {
  if (document.cookie.includes("pb_auth")) {
    pb.authStore.loadFromCookie(document.cookie);
  }
  pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false, sameSite: "Lax" });
  });
}

/**
 * Trả về URL đầy đủ của file lưu trong PocketBase
 */
export function getPbImageUrl(
  collectionNameOrId: string,
  recordId: string,
  fileName?: string,
  thumb?: string
): string {
  if (!fileName) return "";
  if (fileName.startsWith("http://") || fileName.startsWith("https://") || fileName.startsWith("/")) {
    return fileName;
  }
  let url = `${PB_URL}/api/files/${collectionNameOrId}/${recordId}/${fileName}`;
  if (thumb) {
    url += `?thumb=${thumb}`;
  }
  return url;
}

// Kiểu dữ liệu PocketBase cho từng Collection
export interface PbCategoryRecord extends RecordModel {
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface PbBrandRecord extends RecordModel {
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface PbProductRecord extends RecordModel {
  name: string;
  slug: string;
  categorySlug: string;
  categoryName?: string;
  brand: string;
  price: string;
  unit: string;
  image?: string;
  images?: string[];
  description?: string;
}

export interface PbQuoteRecord extends RecordModel {
  customer: string;
  phone: string;
  items?: string;
  note?: string;
  status: "Chưa xử lý" | "Đang xử lý" | "Đã báo giá" | "Đã chốt" | "Đã hủy" | string;
  date?: string;
}

export interface PbSiteSettingsRecord extends RecordModel {
  key: string;
  heroImage?: string;
  selectedCategories?: string[];
  selectedProducts?: string[];
  selectedBrands?: string[];
  aboutImage?: string;
}
