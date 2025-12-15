// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import { Footer } from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import ScrollToTop from "./pages/ScrollToTop";

export default function App() {
  return (
        <CartProvider>
    <BrowserRouter>
    <ScrollToTop/>
      <Header />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* All Products */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} />

        {/* Category Routes (future-ready) */}
        <Route path="/category/fresh-fish" element={<ProductsPage />} />
        <Route path="/category/shellfish" element={<ProductsPage />} />
        <Route path="/category/dry-seafood" element={<ProductsPage />} />
      </Routes>

              <CartDrawer />
              <Footer/>
    </BrowserRouter>
    </CartProvider>
  );
}
