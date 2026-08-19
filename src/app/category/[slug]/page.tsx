import React from "react";
import { notFound } from "next/navigation";
import { PRODUCT_CATEGORIES, SAMPLE_PRODUCTS, COMPANY_INFO } from "@/data/companyData";
import {
  pb,
  getPbImageUrl,
  PbCategoryRecord,
  PbProductRecord
} from "@/lib/pocketbase";
import CategoryDetailView, { DisplayCategory, DisplayCategoryProduct } from "@/components/CategoryDetailView";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;

  try {
    const cats = await pb.collection("categories").getFullList<PbCategoryRecord>({ requestKey: null });
    const cat = cats.find((c) => c.slug === slug || c.id === slug);
    if (cat) {
      return {
        title: `${cat.name} - Vật Liệu Xây Dựng & Thiết Bị Hưng Vinh Phát`,
        description: `${cat.description || "Phân phối chính hãng bởi Hưng Vinh Phát."} Hotline: ${COMPANY_INFO.phones[0]}.`
      };
    }
  } catch (err) {
    // fallback
  }

  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return {
      title: "Danh mục sản phẩm | Hưng Vinh Phát"
    };
  }

  return {
    title: `${category.name} - Vật Liệu Xây Dựng & Thiết Bị Hưng Vinh Phát`,
    description: `${category.description} Phân phối chính hãng bởi Hưng Vinh Phát. Hotline: ${COMPANY_INFO.phones[0]}.`
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let currentCategory: DisplayCategory | null = null;
  let categoryProducts: DisplayCategoryProduct[] = [];

  try {
    // 1. Lấy thông tin ngành hàng từ PocketBase
    const catRecords = await pb.collection("categories").getFullList<PbCategoryRecord>({
      requestKey: null
    });
    const foundCat = catRecords.find((c) => c.slug === slug || c.id === slug);

    if (foundCat) {
      currentCategory = {
        id: foundCat.id,
        name: foundCat.name,
        slug: foundCat.slug,
        image: getPbImageUrl("categories", foundCat.id, foundCat.image) || "/images/steel_construction.jpg",
        description: foundCat.description || ""
      };

      // 2. Lấy danh sách sản phẩm thuộc ngành hàng từ PocketBase
      const prodRecords = await pb.collection("products").getFullList<PbProductRecord>({
        requestKey: null
      });

      categoryProducts = prodRecords
        .filter((p) => p.categorySlug === foundCat.slug || p.categorySlug === slug)
        .map((p) => {
          const firstImg =
            p.images && p.images.length > 0
              ? getPbImageUrl("products", p.id, p.images[0])
              : "/images/steel_construction.jpg";
          return {
            id: p.id,
            name: p.name,
            slug: p.slug || p.id,
            brand: p.brand,
            price: p.price,
            unit: p.unit,
            image: firstImg,
            description: p.description || ""
          };
        });
    }
  } catch (err) {
    console.error("Lỗi tải thông tin ngành hàng từ PocketBase:", err);
  }

  // Fallback nếu không tìm thấy trong PocketBase
  if (!currentCategory) {
    const fallbackCat = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
    if (!fallbackCat) {
      notFound();
    }
    currentCategory = {
      name: fallbackCat.name,
      slug: fallbackCat.slug,
      image: fallbackCat.image || "/images/steel_construction.jpg",
      description: fallbackCat.description
    };
    categoryProducts = SAMPLE_PRODUCTS.filter((p) => p.categorySlug === fallbackCat.slug).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.id,
      brand: p.brand,
      price: p.price,
      unit: p.unit,
      image: p.image || "/images/steel_construction.jpg",
      description: p.description
    }));
  }

  return (
    <CategoryDetailView category={currentCategory} categoryProducts={categoryProducts} />
  );
}
