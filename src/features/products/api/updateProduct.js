import { db, serverTimestamp } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getLocalProductsCache, setLocalProductsCache } from "./getProducts";

export async function updateProduct(productId, productData) {
  const updatedFields = {
    ...productData,
    price: Number(productData.price) || 0,
    stock: Number(productData.stock) || 0,
    status:
      Number(productData.stock) === 0
        ? "out_of_stock"
        : Number(productData.stock) <= 10
        ? "low_stock"
        : productData.status || "active",
    updatedAt: new Date().toISOString(),
  };

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, {
        ...updatedFields,
        updatedAt: serverTimestamp(),
      });
      return { id: productId, ...updatedFields };
    }
  } catch (error) {
    console.warn("Firestore error in updateProduct:", error.message);
  }

  const current = getLocalProductsCache();
  const updatedList = current.map((p) =>
    p.id === productId ? { ...p, ...updatedFields } : p
  );
  setLocalProductsCache(updatedList);
  return { id: productId, ...updatedFields };
}
