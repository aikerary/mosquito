import { useState } from "react";
import { deleteCollection } from "../api/deleteCollection";

export function useDeleteCollection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (collectionId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await deleteCollection(collectionId);
      return res;
    } catch (err) {
      setError(err.message || "Error al eliminar la colección");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCollection: mutate, isLoading, error };
}

export default useDeleteCollection;
