import { useState, useEffect, useCallback } from "react";
import { getCollection } from "../api/getCollection";

export function useCollection(collectionId) {
  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(collectionId));
  const [error, setError] = useState(null);

  const fetchCollection = useCallback(async () => {
    if (!collectionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCollection(collectionId);
      setCollection(data);
    } catch (err) {
      setError(err.message || "Error al obtener colección");
    } finally {
      setIsLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return { collection, isLoading, error, refetch: fetchCollection };
}

export default useCollection;
