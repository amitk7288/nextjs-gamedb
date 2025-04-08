import { PiSquaresFour, PiSquaresFourDuotone, PiBook, PiBookDuotone, PiUsers, PiUsersDuotone, PiHeart, PiHeartDuotone, PiMagicWand, PiMagicWandDuotone, PiBookmarkSimple, PiBookmarkSimpleDuotone } from "react-icons/pi";
import { MenuItemType } from "../types/MenuItem.type";

const menuItems: MenuItemType[] = [
  {
    id: 1,
    icon: PiSquaresFour,
    activeIcon: PiSquaresFourDuotone,
    iconText: "Genres",
    path: "/genres",
    active: false,
  },
  {
    id: 2,
    icon: PiBook,
    activeIcon: PiBookDuotone,
    iconText: "Library",
    path: "/library",
    active: false,
  },
  {
    id: 4,
    icon: PiUsers,
    activeIcon: PiUsersDuotone,
    iconText: "Friends",
    path: "/friends",
    active: false,
  },
  {
    id: 6,
    icon: PiHeart,
    activeIcon: PiHeartDuotone,
    iconText: "Favourites",
    path: "/favourites",
    active: false,
  },
  {
    id: 7,
    icon: PiMagicWand,
    activeIcon: PiMagicWandDuotone,
    iconText: "Wishlist",
    path: "/wishlist",
    active: false,
  },
  {
    id: 8,
    icon: PiBookmarkSimple,
    activeIcon: PiBookmarkSimpleDuotone,
    iconText: "Collections",
    path: "/collections",
    active: false,
  },
];

export default menuItems;
