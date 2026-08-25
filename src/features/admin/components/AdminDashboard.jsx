"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import SalesOverview from "./SalesOverview";
import QuickActions from "./QuickActions";
import RecentProducts from "./RecentProducts";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCollections } from "@/features/collections/hooks/useCollections";
import { ProductForm } from "@/features/products/components/ProductForm";
import { CollectionForm } from "@/features/collections/components/CollectionForm";
import { useCreateProduct } from "@/features/products/hooks/useCreateProduct";
import { useCreateCollection } from "@/features/collections/hooks/useCreateCollection";
import { Package, Layers, DollarSign, Users } from "lucide-react";

export function AdminDashboard() {
  const { products, isLoading: isProductsLoading, refetch: refetchProducts } = useProducts();
  const { collections, isLoading: isCollectionsLoading, refetch: refetchCollections } = useCollections();

  const { createProduct, isLoading: isCreatingProduct } = useCreateProduct();
  const { createCollection, isLoading: isCreatingCollection } = useCreateCollection();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  const handleCreateProduct = async (data) => {
    await createProduct(data);
    setIsProductModalOpen(false);
    refetchProducts();
  };

  const handleCreateCollection = async (data) => {
    await createCollection(data);
    setIsCollectionModalOpen(false);
    refetchCollections();
  };

  const totalProducts = products.length;
  const totalCollections = collections.length;
  const totalStock = products.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0);

  return (
    <div className="flex min-h-screen bg-red-100 text-slate-100 font-sans antialiased">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Panel de Control General"
          subtitle="Visión global de inventario, colecciones y métricas de ventas"
        />

        <main className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* KPI Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Productos"
              value={isProductsLoading ? "..." : totalProducts}
              change="+12%"
              isPositive={true}
              icon={Package}
              description="Productos activos en catálogo"
            />
            <StatCard
              title="Colecciones"
              value={isCollectionsLoading ? "..." : totalCollections}
              change="+2 esta semana"
              isPositive={true}
              icon={Layers}
              description="Grupos de productos organizados"
            />
            <StatCard
              title="Unidades en Stock"
              value={isProductsLoading ? "..." : totalStock}
              change="-4%"
              isPositive={false}
              icon={Users}
              description="Stock disponible para envío"
            />
            <StatCard
              title="Ingresos Estimados"
              value="$12,450.00"
              change="+18.5%"
              isPositive={true}
              icon={DollarSign}
              description="Calculado este mes"
            />
          </div>

          {/* Analytics & Quick Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SalesOverview />
            </div>
            <div>
              <QuickActions
                onOpenProductModal={() => setIsProductModalOpen(true)}
                onOpenCollectionModal={() => setIsCollectionModalOpen(true)}
              />
            </div>
          </div>

          {/* Recent Products Widget */}
          <RecentProducts products={products} />
        </main>
      </div>

      {/* Product Creation Modal */}
      {isProductModalOpen && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onClose={() => setIsProductModalOpen(false)}
          isLoading={isCreatingProduct}
        />
      )}

      {/* Collection Creation Modal */}
      {isCollectionModalOpen && (
        <CollectionForm
          onSubmit={handleCreateCollection}
          onClose={() => setIsCollectionModalOpen(false)}
          isLoading={isCreatingCollection}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
