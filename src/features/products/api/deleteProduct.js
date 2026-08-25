import { db } from "@/lib/firebase/firebase";
import { doc, deleteDoc as firestoreDelete } from "firebase/firestore";
import { getLocalProductsCache, setLocalProductsCache } from "./getProducts";

export async function deleteProduct(productId) {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = doc(db, "products", productId);
      await firestoreDelete(docRef);
      return { id: productId, success: true };
    }
  } catch (error) {
    console.warn("Firestore error in deleteProduct:", error.message);
  }

  const current = getLocalProductsCache();
  setLocalProductsCache(current.filter((p) => p.id !== productId));
  return { id: productId, success: true };
}
