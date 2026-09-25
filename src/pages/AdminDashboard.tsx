import { useState, type ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, Category } from "../types/product";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  LogOut, 
  Package, 
  Star, 
  Filter, 
  X, 
  Fish, 
  Layers,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStock, setSelectedStock] = useState<string>("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    category: "Fresh Fish" as Category,
    price: 0,
    unit: "kg",
    netWeight: "",
    grossWeight: "",
    image: "",
    featured: false,
    inStock: true,
  });

  const [imageUploadType, setImageUploadType] = useState<"upload" | "url">("upload");

  // Redirect to login if not authenticated
  if (!user && !loading) {
    navigate("/admin/login", { replace: true });
    return null;
  }

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesStock = 
      selectedStock === "All" ||
      (selectedStock === "In Stock" && p.inStock !== false) ||
      (selectedStock === "Out of Stock" && p.inStock === false);
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Handle Form Open for Add
  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      category: "Fresh Fish",
      price: 500,
      unit: "kg",
      netWeight: "800 grams",
      grossWeight: "1 kg",
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80",
      featured: false,
      inStock: true,
    });
    setIsAddModalOpen(true);
  };

  // Handle Form Open for Edit
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      netWeight: product.netWeight,
      grossWeight: product.grossWeight || "",
      image: product.image,
      featured: !!product.featured,
      inStock: product.inStock !== false,
    });
  };

  // Handle Local File Upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Add Product
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      netWeight: formData.netWeight,
      grossWeight: formData.grossWeight || undefined,
      image: formData.image,
      featured: formData.featured,
      inStock: formData.inStock,
    });
    setIsAddModalOpen(false);
  };

  // Submit Edit Product
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      netWeight: formData.netWeight,
      grossWeight: formData.grossWeight || undefined,
      image: formData.image,
      featured: formData.featured,
      inStock: formData.inStock,
    });
    setEditingProduct(null);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (deletingProductId !== null) {
      await deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 🔹 TOP BAR */}
      <header className="bg-[#063f54] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#fddd15] text-[#063f54] p-2 rounded-xl">
              <Fish size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif leading-none">Seven Seafoods Admin</h1>
              <p className="text-xs text-gray-300 mt-1">Firebase Product Inventory Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs bg-white/10 px-3 py-1.5 rounded-lg text-gray-200">
              Logged in as: <b className="text-white">{user?.email}</b>
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 border border-red-500/30 cursor-pointer"
            >
              <LogOut size={16} /> Logout
            </motion.button>
          </div>
        </div>
      </header>

      {/* 🔹 MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* 📊 STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005F86] flex items-center justify-center">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Fish size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">In Stock (Available)</p>
              <p className="text-2xl font-bold text-emerald-600">{products.filter(p => p.inStock !== false).length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{products.filter(p => p.inStock === false).length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Featured Items</p>
              <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.featured).length}</p>
            </div>
          </div>
        </div>

        {/* 🔍 SEARCH, FILTER & ADD BUTTON BAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005F86] transition"
              />
            </div>

            {/* Category Select */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-gray-400" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Fresh Fish">Fresh Fish</option>
                <option value="Shellfish">Shellfish</option>
                <option value="Dry Seafood">Dry Seafood</option>
              </select>
            </div>

            {/* Stock Select */}
            <div className="relative">
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="All">All Stock Status</option>
                <option value="In Stock">In Stock (Available)</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Add Product Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenAddModal}
            className="w-full md:w-auto bg-[#005F86] hover:bg-[#004a68] text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Plus size={18} /> Add New Product
          </motion.button>
        </div>

        {/* 📦 PRODUCTS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Product Catalog ({filteredProducts.length})</h3>
            <span className="text-xs text-gray-400">Live Firebase Firestore Data</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Package size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-base font-medium text-gray-600">No products found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 uppercase text-[11px] tracking-wider border-b border-gray-100">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Net / Gross Weight</th>
                    <th className="py-4 px-4">Stock Status</th>
                    <th className="py-4 px-4">Featured</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Product Name & Image */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-400">ID: #{p.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="inline-block text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-medium border border-teal-100">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-bold text-[#005F86]">
                        ₹{p.price}.00 <span className="text-xs font-normal text-gray-500">/ {p.unit}</span>
                      </td>

                      {/* Weights */}
                      <td className="py-4 px-4 text-xs text-gray-600">
                        <p><b className="text-gray-900">Net:</b> {p.netWeight}</p>
                        {p.grossWeight && <p className="text-gray-400">Gross: {p.grossWeight}</p>}
                      </td>

                      {/* Stock Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={p.inStock !== false ? "Available" : "Out of Stock"}
                          onChange={(e) => updateProduct(p.id, { inStock: e.target.value === "Available" })}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition ${
                            p.inStock !== false
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                              : "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                          }`}
                        >
                          <option value="Available">Available</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                      </td>

                      {/* Featured */}
                      <td className="py-4 px-4">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                            <Star size={12} className="fill-amber-400 text-amber-500" /> Yes
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">No</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 size={16} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDeletingProductId(p.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* ================= ➕ ADD / ✏️ EDIT PRODUCT FULL-WIDTH MODAL ================= */}
      <AnimatePresence>
        {(isAddModalOpen || editingProduct !== null) && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-5xl p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto border border-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <X size={24} />
              </button>

              {/* Title */}
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : "Add New Product"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in product details and upload product image. Saved changes update live across the website.
                </p>
              </div>

              {/* Form Grid */}
              <form onSubmit={editingProduct ? handleEditSubmit : handleAddSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT COLUMN: DETAILS (7 COLS) */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. King Fish Curry Cut"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005F86] focus:ring-1 focus:ring-[#005F86]"
                      />
                    </div>

                    {/* Category & Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                          className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#005F86] cursor-pointer"
                        >
                          <option value="Fresh Fish">Fresh Fish</option>
                          <option value="Shellfish">Shellfish</option>
                          <option value="Dry Seafood">Dry Seafood</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Price (₹)</label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005F86]"
                        />
                      </div>
                    </div>

                    {/* Unit & Net Weight */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Unit</label>
                        <input
                          type="text"
                          required
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                          placeholder="kg / 500 g"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005F86]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Net Weight</label>
                        <input
                          type="text"
                          required
                          value={formData.netWeight}
                          onChange={(e) => setFormData({ ...formData, netWeight: e.target.value })}
                          placeholder="e.g. 800 grams"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005F86]"
                        />
                      </div>
                    </div>

                    {/* Gross Weight */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Gross Weight (Optional)</label>
                      <input
                        type="text"
                        value={formData.grossWeight}
                        onChange={(e) => setFormData({ ...formData, grossWeight: e.target.value })}
                        placeholder="e.g. 1 kg count 4 to 5 pieces"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005F86]"
                      />
                    </div>

                    {/* Stock Availability & Featured Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Stock Availability</label>
                        <select
                          value={formData.inStock ? "Available" : "Out of Stock"}
                          onChange={(e) => setFormData({ ...formData, inStock: e.target.value === "Available" })}
                          className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#005F86] cursor-pointer font-medium"
                        >
                          <option value="Available">Available (In Stock)</option>
                          <option value="Out of Stock">Out of Stock (Hidden on store)</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/80">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-5 h-5 text-[#005F86] rounded focus:ring-[#005F86] cursor-pointer"
                        />
                        <label htmlFor="featured" className="text-sm font-semibold text-gray-800 cursor-pointer">
                          Feature on Home Page
                        </label>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: IMAGE UPLOAD & PREVIEW (5 COLS) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                        Product Image
                      </label>

                      {/* Upload Mode Selector Tabs */}
                      <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
                        <button
                          type="button"
                          onClick={() => setImageUploadType("upload")}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            imageUploadType === "upload"
                              ? "bg-white text-[#005F86] shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <Upload size={14} /> Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageUploadType("url")}
                          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            imageUploadType === "url"
                              ? "bg-white text-[#005F86] shadow-sm"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <LinkIcon size={14} /> Image Web URL
                        </button>
                      </div>

                      {/* Option A: Direct File Upload */}
                      {imageUploadType === "upload" ? (
                        <div className="border-2 border-dashed border-gray-300 hover:border-[#005F86] rounded-2xl p-6 text-center bg-gray-50/50 transition relative group cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                          />
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-blue-50 text-[#005F86] rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition">
                              <Upload size={22} />
                            </div>
                            <p className="text-sm font-semibold text-gray-800">Click to Browse / Drop Image</p>
                            <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, JPEG, WebP</p>
                          </div>
                        </div>
                      ) : (
                        /* Option B: Image URL Input */
                        <div>
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005F86]"
                          />
                        </div>
                      )}

                      {/* Large Image Preview */}
                      <div className="mt-4">
                        <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Live Image Preview</span>
                        {formData.image ? (
                          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-52 bg-slate-100">
                            <img
                              src={formData.image}
                              alt="Product Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-52 rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                            <ImageIcon size={32} className="mb-2 text-gray-300" />
                            <p className="text-xs font-medium">No image selected</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Action Buttons */}
                    <div className="pt-4 flex gap-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddModalOpen(false);
                          setEditingProduct(null);
                        }}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm transition cursor-pointer"
                      >
                        Cancel
                      </button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex-1 bg-[#005F86] hover:bg-[#004a68] text-white py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition cursor-pointer"
                      >
                        {editingProduct ? "Save Changes" : "Create Product"}
                      </motion.button>
                    </div>

                  </div>

                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 🗑️ DELETE CONFIRMATION MODAL ================= */}
      <AnimatePresence>
        {deletingProductId !== null && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>

              <h4 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h4>
              <p className="text-xs text-gray-500 mb-6">
                Are you sure you want to delete this product? This action will remove it from Firebase Firestore.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingProductId(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shadow-md"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
