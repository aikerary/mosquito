import { useState } from "react";
import { createCollection } from "../api/createCollection";

export function useCreateCollection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (collectionData) => {
    setIsLoading(true);
    setError(null);
    try {
      const created = await createCollection(collectionData);
      return created;
    } catch (err) {
      setError(err.message || "Error al crear la colección");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createCollection: mutate, isLoading, error };
}

export default useCreateCollection;
