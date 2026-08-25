import React from "react";
import { BarChart3, ArrowUpRight } from "lucide-react";

const chartData = [
  { day: "Lun", amount: 450, height: "45%" },
  { day: "Mar", amount: 720, height: "72%" },
  { day: "Mié", amount: 600, height: "60%" },
  { day: "Jue", amount: 950, height: "95%" },
  { day: "Vie", amount: 800, height: "80%" },
  { day: "Sáb", amount: 1100, height: "100%" },
  { day: "Dom", amount: 680, height: "68%" },
];

export function SalesOverview() {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Resumen de Ventas</h3>
            <p className="text-xs text-slate-400">Ventas semanales del catálogo</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 cursor-pointer hover:text-indigo-300">
          <span>Ver Detalle</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Visual Chart Bars */}
      <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800/80">
        {chartData.map((item) => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
            <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
              ${item.amount}
            </div>
            <div className="w-full bg-slate-800 rounded-t-lg overflow-hidden flex items-end h-full max-h-32">
              <div
                style={{ height: item.height }}
                className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-indigo-500 group-hover:to-emerald-400 transition-all duration-300 rounded-t-lg"
              />
            </div>
            <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      {/* Footer statistics */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <span className="text-xs text-slate-400">Ingreso Semanal</span>
          <p className="text-lg font-bold text-slate-100 font-mono">$5,300.00</p>
        </div>
        <div>
          <span className="text-xs text-slate-400">Promedio Diario</span>
          <p className="text-lg font-bold text-slate-100 font-mono">$757.14</p>
        </div>
      </div>
    </div>
  );
}

export default SalesOverview;
