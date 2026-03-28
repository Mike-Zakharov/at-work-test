import { CrossIcon } from "./assets/cross-icon";
import { FavoriteIcon } from "./assets/favorite";
import { MenuDotsIcon } from "./assets/menu-dots";
import { NotificationIcon } from "./assets/notification";
import type { IconProps } from "./icons-type";

export type Icons = {
  [key: string]: React.FC<IconProps>;
};

export const ICONS_MAP: Icons = {
  cross: CrossIcon,
  "menu-dots": MenuDotsIcon,
  favorite: FavoriteIcon,
  notification: NotificationIcon,
};
