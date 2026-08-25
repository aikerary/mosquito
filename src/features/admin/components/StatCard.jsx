import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ title, value, change, isPositive = true, icon: IconComponent, description }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl hover:border-slate-700/80 transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {IconComponent && (
          <div className="p-2.5 rounded-xl bg-slate-800/80 text-indigo-400 group-hover:bg-indigo-600/20 transition-colors">
            <IconComponent className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-slate-100 tracking-tight">
          {value}
        </h3>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}
          </div>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-slate-400">{description}</p>
      )}
    </div>
  );
}

export default StatCard;
