import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const INITIAL_COLLECTIONS = [
  {
    id: "col-1",
    name: "Colección Verano Anti-Mosquitos",
    slug: "verano-anti-mosquitos",
    description: "Kits de protección intensiva para la temporada de verano y exteriores.",
    itemCount: 14,
    status: "active",
    bannerUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "col-2",
    name: "Hogar Repelente Inteligente",
    slug: "hogar-repelente-inteligente",
    description: "Difusores ultrasónicos y trampas LED silenciosas para interiores.",
    itemCount: 8,
    status: "active",
    bannerUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "col-3",
    name: "Línea Orgánica Botánica",
    slug: "linea-organica-botanica",
    description: "Aceites esenciales y velas con ingredientes 100% naturales.",
    itemCount: 6,
    status: "draft",
    bannerUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
];

let localCollectionsCache = [...INITIAL_COLLECTIONS];

export async function getCollections() {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const q = query(collection(db, "collections"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore error in getCollections:", error.message);
  }

  return [...localCollectionsCache];
}

export function getLocalCollectionsCache() {
  return localCollectionsCache;
}

export function setLocalCollectionsCache(cols) {
  localCollectionsCache = cols;
}
