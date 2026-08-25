import React, { useState } from "react";
import CollectionRow from "./CollectionRow";
import Button from "@/components/ui/Button";
import { Plus, Search, Layers, FolderX } from "lucide-react";

export function CollectionList({
  collections = [],
  isLoading = false,
  onAddCollection,
  onEditCollection,
  onDeleteCollection,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCollections = collections.filter((col) =>
    col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar colecciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <Button icon={Plus} onClick={onAddCollection}>
          Nueva Colección
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/60 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Colección</th>
                <th className="py-3.5 px-4">Descripción</th>
                <th className="py-3.5 px-4">Cantidad</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Cargando colecciones...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCollections.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FolderX className="w-8 h-8 text-slate-500" />
                      <p className="font-semibold text-slate-300">
                        No se encontraron colecciones
                      </p>
                      <p className="text-xs text-slate-500">
                        Intenta buscar con otros términos o crea una nueva colección.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCollections.map((col) => (
                  <CollectionRow
                    key={col.id}
                    collection={col}
                    onEdit={onEditCollection}
                    onDelete={onDeleteCollection}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CollectionList;
