import { CrossIcon } from "./assets/cross-icon";
import { MenuDotsIcon } from "./assets/menu-dots";
import type { IconProps } from "./icons-type";


export type Icons = {
  [key: string]: React.FC<IconProps>;
};

export const ICONS_MAP: Icons ={
  cross : CrossIcon,
  "menu-dots": MenuDotsIcon
};