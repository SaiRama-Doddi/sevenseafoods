// src/components/ShopByCategory.tsx
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Fresh Fish",
    description: "King fish, pomfret, tuna & more",
    image: "https://static.vecteezy.com/system/resources/previews/026/204/197/large_2x/fresh-fish-and-seafood-assortment-ai-generated-image-photo.jpg",
  },
  {
    name: "Shellfish",
    description: "Prawns, lobster, crabs & squid",
    image: "https://www.nutritionadvance.com/wp-content/uploads/2022/02/various-types-of-shellfish.jpg",
  },
  {
    name: "Dry Seafood",
    description: "Dried fish, prawns & anchovy",
    image: "https://images.pexels.com/photos/30112816/pexels-photo-30112816/free-photo-of-assorted-dry-seafood-display-in-digha-market.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function ShopByCategory() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F6FBFC] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-serif font-semibold text-center mb-3">
          Shop by Category
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Browse our curated selection of premium seafood.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(cat => (
            <div
              key={cat.name}
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(cat.name)}`)
              }
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-64 w-full object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-semibold">
                  {cat.name}
                </h3>
                <p className="text-gray-200 text-sm">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
