"use client";

import React, { useState } from "react";
import Sidebar from "@/features/admin/components/Sidebar";
import Header from "@/features/admin/components/Header";
import {
  CollectionList,
  CollectionForm,
  useCollections,
  useCreateCollection,
  useUpdateCollection,
  useDeleteCollection,
} from "@/features/collections";

export default function AdminCollectionsPage() {
  const { collections, isLoading, refetch } = useCollections();
  const { createCollection, isLoading: isCreating } = useCreateCollection();
  const { updateCollection, isLoading: isUpdating } = useUpdateCollection();
  const { deleteCollection } = useDeleteCollection();

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenCreate = () => {
    setSelectedCollection(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (collectionItem) => {
    setSelectedCollection(collectionItem);
    setIsFormOpen(true);
  };

  const handleDelete = async (collectionId) => {
    if (confirm("¿Estás seguro de eliminar esta colección?")) {
      await deleteCollection(collectionId);
      refetch();
    }
  };

  const handleSubmit = async (formData) => {
    if (selectedCollection) {
      await updateCollection(selectedCollection.id, formData);
    } else {
      await createCollection(formData);
    }
    setIsFormOpen(false);
    refetch();
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Gestión de Colecciones"
          subtitle="Organiza tus productos en colecciones y agrupaciones de venta"
        />

        <main className="p-8 max-w-7xl w-full mx-auto">
          <CollectionList
            collections={collections}
            isLoading={isLoading}
            onAddCollection={handleOpenCreate}
            onEditCollection={handleOpenEdit}
            onDeleteCollection={handleDelete}
          />
        </main>
      </div>

      {isFormOpen && (
        <CollectionForm
          collection={selectedCollection}
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
          isLoading={isCreating || isUpdating}
        />
      )}
    </div>
  );
}
