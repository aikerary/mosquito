"use client";

import React, { useState } from "react";
import Sidebar from "@/features/admin/components/Sidebar";
import Header from "@/features/admin/components/Header";
import {
  ProductList,
  ProductForm,
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/features/products";

export default function AdminProductsPage() {
  const { products, isLoading, refetch } = useProducts();
  const { createProduct, isLoading: isCreating } = useCreateProduct();
  const { updateProduct, isLoading: isUpdating } = useUpdateProduct();
  const { deleteProduct } = useDeleteProduct();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(productId);
      refetch();
    }
  };

  const handleSubmit = async (formData) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, formData);
    } else {
      await createProduct(formData);
    }
    setIsFormOpen(false);
    refetch();
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Gestión de Productos"
          subtitle="Administra el catálogo, stock y precios de tus productos"
        />

        <main className="p-8 max-w-7xl w-full mx-auto">
          <ProductList
            products={products}
            isLoading={isLoading}
            onAddProduct={handleOpenCreate}
            onEditProduct={handleOpenEdit}
            onDeleteProduct={handleDelete}
          />
        </main>
      </div>

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
          isLoading={isCreating || isUpdating}
        />
      )}
    </div>
  );
}
