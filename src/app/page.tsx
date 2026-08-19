import React from "react";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import AboutSection from "@/components/AboutSection";
import ShowroomSection from "@/components/ShowroomSection";
import QuoteSection from "@/components/QuoteSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CategorySection />
      <ProductSection />
      <AboutSection />
      <ShowroomSection />
      <QuoteSection />
    </>
  );
}
