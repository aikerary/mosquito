import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Edit2, Trash2, Layers } from "lucide-react";

export function CollectionRow({ collection, onEdit, onDelete }) {
  const isDraft = collection.status === "draft";

  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {collection.bannerUrl ? (
            <img
              src={collection.bannerUrl}
              alt={collection.name}
              className="w-12 h-8 rounded-lg object-cover border border-slate-700 bg-slate-800"
            />
          ) : (
            <div className="w-12 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="font-semibold text-slate-100">{collection.name}</div>
            <div className="text-xs text-slate-400 font-mono">
              /{collection.slug}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-xs text-slate-400 max-w-xs truncate">
        {collection.description || "Sin descripción"}
      </td>
      <td className="py-4 px-4 text-slate-300 font-medium">
        {collection.itemCount || 0} ítems
      </td>
      <td className="py-4 px-4">
        <Badge variant={isDraft ? "warning" : "success"}>
          {isDraft ? "Borrador" : "Publicada"}
        </Badge>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(collection)}
            title="Editar colección"
          >
            <Edit2 className="w-4 h-4 text-slate-400 hover:text-indigo-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(collection.id)}
            title="Eliminar colección"
          >
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-400" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default CollectionRow;
