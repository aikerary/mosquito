import { db } from "@/lib/firebase/firebase";
import { doc, deleteDoc as firestoreDelete } from "firebase/firestore";
import { getLocalCollectionsCache, setLocalCollectionsCache } from "./getCollections";

export async function deleteCollection(collectionId) {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = doc(db, "collections", collectionId);
      await firestoreDelete(docRef);
      return { id: collectionId, success: true };
    }
  } catch (error) {
    console.warn("Firestore error in deleteCollection:", error.message);
  }

  const current = getLocalCollectionsCache();
  setLocalCollectionsCache(current.filter((c) => c.id !== collectionId));
  return { id: collectionId, success: true };
}
