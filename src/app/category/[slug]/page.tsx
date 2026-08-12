import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_CATEGORIES, SAMPLE_PRODUCTS, COMPANY_INFO } from "@/data/companyData";
import CategoryDetailView from "@/components/CategoryDetailView";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return {
      title: "Danh mục không tồn tại | Hưng Vinh Phát",
    };
  }

  return {
    title: `${category.name} - Vật Liệu Xây Dựng & Thiết Bị Hưng Vinh Phát`,
    description: `${category.description} Phân phối chính hãng bởi Hưng Vinh Phát, đối tác Hoa Sen Home. Hotline: ${COMPANY_INFO.phones[0]}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.categorySlug === category.slug
  );

  return (
    <CategoryDetailView category={category} categoryProducts={categoryProducts} />
  );
}
