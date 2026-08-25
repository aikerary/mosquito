import React from "react";
import * as LucideIcons from "lucide-react";

export function Icon({ name, className = "w-5 h-5", ...props }) {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  return <IconComponent className={className} {...props} />;
}

export default Icon;
