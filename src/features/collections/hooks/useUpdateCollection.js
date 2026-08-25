import { useState } from "react";
import { updateCollection } from "../api/updateCollection";

export function useUpdateCollection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (collectionId, collectionData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await updateCollection(collectionId, collectionData);
      return updated;
    } catch (err) {
      setError(err.message || "Error al actualizar la colección");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCollection: mutate, isLoading, error };
}

export default useUpdateCollection;
