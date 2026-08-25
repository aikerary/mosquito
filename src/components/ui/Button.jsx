import React from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:bg-indigo-700",
  secondary:
    "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:bg-slate-800",
  outline:
    "bg-transparent hover:bg-slate-800/60 text-slate-300 border border-slate-700 hover:border-slate-600",
  danger:
    "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 active:bg-rose-700",
  ghost:
    "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm font-semibold rounded-xl gap-2",
  lg: "px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5",
  icon: "p-2 rounded-xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  icon: IconComponent,
  className = "",
  type = "button",
  ...props
}) {
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : IconComponent ? (
        <IconComponent className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}

export default Button;
