import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getLocalCollectionsCache } from "./getCollections";

export async function getCollection(collectionId) {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = doc(db, "collections", collectionId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      }
    }
  } catch (error) {
    console.warn("Firestore error in getCollection:", error.message);
  }

  const cached = getLocalCollectionsCache().find((c) => c.id === collectionId);
  if (!cached) {
    throw new Error(`Colección con ID ${collectionId} no encontrada`);
  }

  return cached;
}
