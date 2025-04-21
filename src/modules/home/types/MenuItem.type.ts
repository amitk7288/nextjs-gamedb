import { IconType } from "react-icons";

export interface MenuItemProps {
  id: number;
  icon: IconType;
  activeIcon: IconType;
  iconText: string;
  path: string;
  active: boolean;
  auth: boolean;
}
