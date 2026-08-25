import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getLocalProductsCache } from "./getProducts";

export async function getProduct(productId) {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = doc(db, "products", productId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      }
    }
  } catch (error) {
    console.warn("Firestore error in getProduct:", error.message);
  }

  const cached = getLocalProductsCache().find((p) => p.id === productId);
  if (!cached) {
    throw new Error(`Producto con ID ${productId} no fue encontrado`);
  }

  return cached;
}
