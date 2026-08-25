import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Edit2, Trash2, Package } from "lucide-react";

const statusConfig = {
  active: { label: "Disponible", variant: "success" },
  low_stock: { label: "Stock Bajo", variant: "warning" },
  out_of_stock: { label: "Agotado", variant: "danger" },
};

export function ProductRow({ product, onEdit, onDelete }) {
  const status = statusConfig[product.status] || {
    label: product.status || "Activo",
    variant: "default",
  };

  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-700 bg-slate-800"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <Package className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="font-semibold text-slate-100">{product.name}</div>
            <div className="text-xs text-slate-400">
              {product.category || "Sin categoría"}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 font-mono font-medium text-slate-200">
        ${Number(product.price).toFixed(2)}
      </td>
      <td className="py-4 px-4 text-slate-300">
        <span className="font-semibold">{product.stock}</span> un.
      </td>
      <td className="py-4 px-4">
        <Badge variant={status.variant}>{status.label}</Badge>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(product)}
            title="Editar producto"
          >
            <Edit2 className="w-4 h-4 text-slate-400 hover:text-indigo-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product.id)}
            title="Eliminar producto"
          >
            <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-400" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
