import { IconType } from "react-icons";

export interface MenuItemType {
  id: number;
  icon: IconType;
  activeIcon: IconType;
  iconText: string;
  path: string;
  active: boolean;
}