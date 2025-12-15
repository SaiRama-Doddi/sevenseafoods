// src/components/ShopByCategory.tsx

const categories = [
  {
    name: "Fresh Fish",
    description: "King fish, pomfret, tuna & more",
    image: "/categories/fresh-fish.jpg",
  },
  {
    name: "Shellfish",
    description: "Prawns, lobster, crabs & squid",
    image: "/categories/shellfish.jpg",
  },
  {
    name: "Dry Seafood",
    description: "Dried fish, prawns & anchovy",
    image: "/categories/dry-seafood.jpg",
  },
];

export default function ShopByCategory() {
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
              className="relative rounded-2xl overflow-hidden shadow-lg group"
            >
              <img
                src={cat.image}
                className="h-64 w-full object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-semibold">
                  {cat.name}
                </h3>
                <p className="text-gray-200 text-sm">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
