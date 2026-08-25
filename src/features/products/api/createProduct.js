import { db, serverTimestamp } from "@/lib/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getLocalProductsCache, setLocalProductsCache } from "./getProducts";

export async function createProduct(productData) {
  const newProduct = {
    ...productData,
    price: Number(productData.price) || 0,
    stock: Number(productData.stock) || 0,
    status:
      Number(productData.stock) === 0
        ? "out_of_stock"
        : Number(productData.stock) <= 10
        ? "low_stock"
        : "active",
    createdAt: new Date().toISOString(),
  };

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = await addDoc(collection(db, "products"), {
        ...newProduct,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, ...newProduct };
    }
  } catch (error) {
    console.warn("Firestore error in createProduct:", error.message);
  }

  const generatedId = `prod-${Date.now()}`;
  const created = { id: generatedId, ...newProduct };
  const current = getLocalProductsCache();
  setLocalProductsCache([created, ...current]);
  return created;
}
