import type { HTMLAttributes } from "react";
import { ICONS_MAP } from "./config";

export interface IconProps extends HTMLAttributes<HTMLImageElement> {
  name: keyof typeof ICONS_MAP;
  className?: string;
}

/**
  Управляем цветом через ClassName
 */
export function Icon({ name, className = "",  }: IconProps) {
  const DinamicIcon = ICONS_MAP[name];

  if (!DinamicIcon) {
    return null;
  }
  return <DinamicIcon className={className} />;
}