import React from "react";
import Link from "next/link";
import { PlusCircle, FolderPlus, Sparkles, RefreshCw } from "lucide-react";

export function QuickActions({ onOpenProductModal, onOpenCollectionModal }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
        <Sparkles className="w-5 h-5 text-indigo-400" />
        Acciones Rápidas
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={onOpenProductModal}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/20 border border-slate-700/60 hover:border-indigo-500/40 text-left transition-all group"
        >
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-200 text-sm group-hover:text-indigo-300">
              Añadir Nuevo Producto
            </div>
            <div className="text-xs text-slate-400">
              Registrar artículo en el inventario
            </div>
          </div>
        </button>

        <button
          onClick={onOpenCollectionModal}
          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 hover:bg-emerald-600/20 border border-slate-700/60 hover:border-emerald-500/40 text-left transition-all group"
        >
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-200 text-sm group-hover:text-emerald-300">
              Crear Colección
            </div>
            <div className="text-xs text-slate-400">
              Agrupar productos por campaña
            </div>
          </div>
        </button>

        <Link
          href="/admin/products"
          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 hover:bg-purple-600/20 border border-slate-700/60 hover:border-purple-500/40 text-left transition-all group"
        >
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-200 text-sm group-hover:text-purple-300">
              Gestionar Inventario
            </div>
            <div className="text-xs text-slate-400">
              Ver y filtrar todos los productos
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;