import { db, serverTimestamp } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getLocalCollectionsCache, setLocalCollectionsCache } from "./getCollections";

export async function updateCollection(collectionId, collectionData) {
  const updatedFields = {
    ...collectionData,
    itemCount: Number(collectionData.itemCount) || 0,
    updatedAt: new Date().toISOString(),
  };

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = doc(db, "collections", collectionId);
      await updateDoc(docRef, {
        ...updatedFields,
        updatedAt: serverTimestamp(),
      });
      return { id: collectionId, ...updatedFields };
    }
  } catch (error) {
    console.warn("Firestore error in updateCollection:", error.message);
  }

  const current = getLocalCollectionsCache();
  const updatedList = current.map((c) =>
    c.id === collectionId ? { ...c, ...updatedFields } : c
  );
  setLocalCollectionsCache(updatedList);
  return { id: collectionId, ...updatedFields };
}
