import { db, serverTimestamp } from "@/lib/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getLocalCollectionsCache, setLocalCollectionsCache } from "./getCollections";

export async function createCollection(collectionData) {
  const slug =
    collectionData.slug ||
    collectionData.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

  const newCollection = {
    ...collectionData,
    slug,
    itemCount: Number(collectionData.itemCount) || 0,
    status: collectionData.status || "active",
    createdAt: new Date().toISOString(),
  };

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const docRef = await addDoc(collection(db, "collections"), {
        ...newCollection,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, ...newCollection };
    }
  } catch (error) {
    console.warn("Firestore error in createCollection:", error.message);
  }

  const generatedId = `col-${Date.now()}`;
  const created = { id: generatedId, ...newCollection };
  const current = getLocalCollectionsCache();
  setLocalCollectionsCache([created, ...current]);
  return created;
}
