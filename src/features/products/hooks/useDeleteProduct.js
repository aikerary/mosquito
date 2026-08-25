import { useState } from "react";
import { deleteProduct } from "../api/deleteProduct";

export function useDeleteProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (productId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await deleteProduct(productId);
      return res;
    } catch (err) {
      setError(err.message || "Error al eliminar el producto");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProduct: mutate, isLoading, error };
}

export default useDeleteProduct;
