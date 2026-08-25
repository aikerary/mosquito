import { useState } from "react";
import { createProduct } from "../api/createProduct";

export function useCreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const created = await createProduct(productData);
      return created;
    } catch (err) {
      setError(err.message || "Error al crear el producto");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProduct: mutate, isLoading, error };
}

export default useCreateProduct;
