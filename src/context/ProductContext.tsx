import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { 
  collection, 
  onSnapshot, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc
} from "firebase/firestore";
import { db } from "../config/firebase";
import { products as initialSeedProducts, type Product } from "../types/product";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  seedAllProductsToFirebase: () => Promise<number>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<Product[]>(initialSeedProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = collection(db, "products");

    // Real-time listener for Firestore
    const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
      if (snapshot.empty) {
        console.log("Firestore collection is empty.");
        setProductList(initialSeedProducts);
        const fetched = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          let category = data.category;
          if (category === "Fresh Fish" || category === "Shellfish") {
            category = "Sea Foods";
          }
          return {
            ...data,
            category,
            id: Number(data.id || docSnap.id),
          } as Product;
        });

        // Sort by ID
        fetched.sort((a, b) => a.id - b.id);
        setProductList(fetched);
      }
      setLoading(false);
    }, (error) => {
      console.warn("Firestore snapshot error (using local seed state):", error);
      setProductList(initialSeedProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // One-click manual seed to upload all 40 products to Firestore
  const seedAllProductsToFirebase = async () => {
    let successCount = 0;
    for (const seed of initialSeedProducts) {
      try {
        await setDoc(doc(db, "products", String(seed.id)), seed);
        successCount++;
      } catch (err) {
        console.error(`Error uploading seed product #${seed.id}:`, err);
      }
    }
    return successCount;
  };

  const addProduct = async (newProduct: Omit<Product, "id">) => {
    const nextId = productList.length > 0 ? Math.max(...productList.map(p => p.id)) + 1 : 1;
    const productWithId: Product = { ...newProduct, id: nextId };

    try {
      await setDoc(doc(db, "products", String(nextId)), productWithId);
    } catch (err) {
      console.warn("Firestore error adding product, falling back to local state:", err);
    }
    setProductList((prev) => [productWithId, ...prev]);
  };

  const updateProduct = async (id: number, updatedFields: Partial<Product>) => {
    try {
      const docRef = doc(db, "products", String(id));
      await setDoc(docRef, updatedFields, { merge: true });
    } catch (err) {
      console.warn("Firestore error updating product:", err);
    }
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = async (id: number) => {
    try {
      const docRef = doc(db, "products", String(id));
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("Firestore error deleting product, falling back to local state:", err);
    }
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products: productList,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        seedAllProductsToFirebase,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
