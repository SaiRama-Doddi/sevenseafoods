// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { Footer } from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import ScrollToTop from "./pages/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons";
import GlobalFishBackground from "./components/GlobalFishBackground";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <GlobalFishBackground />
            <ScrollToTop />
            <Header />

            <Routes>
              {/* Public Client Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />

              {/* Category Routes */}
              <Route path="/category/fresh-fish" element={<ProductsPage />} />
              <Route path="/category/shellfish" element={<ProductsPage />} />
              <Route path="/category/dry-seafood" element={<ProductsPage />} />

              {/* Admin Firebase Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>

            <CartDrawer />
            <Footer />
            <FloatingButtons />
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
