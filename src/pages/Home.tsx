// src/pages/Home.tsx
import FeaturedProducts from "../components/FeaturedProducts";
import Features from "../components/Features";
import Hero from "../components/Hero";
import ShopByCategory from "./ShopByCategory";

export default function Home() {
  return (
    <>
    <Hero/>
    <Features/>
      <FeaturedProducts />
      <ShopByCategory />
    </>
  );
}
