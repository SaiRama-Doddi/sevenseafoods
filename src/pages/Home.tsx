// src/pages/Home.tsx
import About from "../components/About";
import Contact from "../components/Contact";
import FeaturedProducts from "../components/FeaturedProducts";
import Features from "../components/Features";
import Hero from "../components/Hero";
/* import ShopByCategory from "./ShopByCategory"; */

export default function Home() {
  return (
    <>
    <Hero/>
 
      <FeaturedProducts />
    {/*   <ShopByCategory /> */}
         <Features/>
      <About/>
      <Contact/>
    </>
  );
}
