import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { ArrowRight, Package } from "lucide-react";

export function RecentProducts({ products = [] }) {
  const recentList = products.slice(0, 5);

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-slate-100 text-base">
            Productos Recientes
          </h3>
        </div>
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <span>Ver todos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 uppercase font-semibold text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-3">Producto</th>
              <th className="py-3 px-3">Categoría</th>
              <th className="py-3 px-3">Precio</th>
              <th className="py-3 px-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {recentList.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-500">
                  No hay productos registrados aún.
                </td>
              </tr>
            ) : (
              recentList.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-slate-200">
                    {product.name}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {product.category || "General"}
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-slate-200">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={
                        product.status === "active"
                          ? "success"
                          : product.status === "low_stock"
                          ? "warning"
                          : "danger"
                      }
                      size="sm"
                    >
                      {product.status === "active"
                        ? "Disponible"
                        : product.status === "low_stock"
                        ? "Stock Bajo"
                        : "Agotado"}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentProducts;
