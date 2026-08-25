import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Mosquito Shield Pro",
    category: "Equipamiento",
    price: 49.99,
    stock: 120,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Ultrasonic Repeller X",
    category: "Dispositivos",
    price: 29.95,
    stock: 45,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Citronella Organic Spray",
    category: "Repelentes",
    price: 15.50,
    stock: 8,
    status: "low_stock",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod-4",
    name: "Bug Zapper Lantern",
    category: "Dispositivos",
    price: 39.99,
    stock: 0,
    status: "out_of_stock",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString(),
  },
];

let localProductsCache = [...INITIAL_PRODUCTS];

export async function getProducts() {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (error) {
    console.warn("Firestore unavailable, using fallback dataset:", error.message);
  }

  return [...localProductsCache];
}

export function getLocalProductsCache() {
  return localProductsCache;
}

export function setLocalProductsCache(products) {
  localProductsCache = products;
}
