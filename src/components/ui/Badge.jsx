import React from "react";

const variantStyles = {
  default: "bg-slate-700 text-slate-100 border-slate-600",
  primary: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  danger: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  info: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs font-medium",
  md: "px-2.5 py-1 text-xs font-semibold",
  lg: "px-3 py-1.5 text-sm font-semibold",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon: IconComponent,
  ...props
}) {
  const variantClass = variantStyles[variant] || variantStyles.default;
  const sizeClass = sizeStyles[size] || sizeStyles.md;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}

export default Badge;
