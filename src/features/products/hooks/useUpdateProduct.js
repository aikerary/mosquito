import { useState } from "react";
import { updateProduct } from "../api/updateProduct";

export function useUpdateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (productId, productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await updateProduct(productId, productData);
      return updated;
    } catch (err) {
      setError(err.message || "Error al actualizar el producto");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProduct: mutate, isLoading, error };
}

export default useUpdateProduct;
