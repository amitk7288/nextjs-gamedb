"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import menuItems from "@/modules/home/data/MenuItems";
import { MenuItemType } from "@/modules/home/types/MenuItemType";

export default function MenuItems() {

  const pathname = usePathname();
  const [items, setItems] = useState <MenuItemType[]>(menuItems);

  useEffect(() => {
    setItems((prevState) =>
      prevState.map((menuItem) => {
        const isActive = menuItem.path === pathname;
        return { ...menuItem, active: isActive };
      })
    );
  }, [pathname]);

  function handleClickIcon(clickedItemID: number) {
    setItems((prevState) => prevState.map((icon) => (icon.id === clickedItemID ? { ...icon, active: true } : { ...icon, active: false })));
  }

  return (
    <>
      {items.map((menuItem) => (
        <Link href={menuItem.path} key={menuItem.id} title={menuItem.iconText} className={`${menuItem.active ? `pl-2` : ""} duration-400 flex h-[50px] w-full cursor-pointer items-center justify-start transition-all ease-in-out`} onClick={() => handleClickIcon(menuItem.id)}>
          <div className="flex items-center gap-3">
            <div className={`${menuItem.active && `rounded-full bg-gradient-to-r from-blue-500 to-green-400 p-1.5 text-white`}`}>{menuItem.active ? <menuItem.activeIcon /> : <menuItem.icon />}</div>
            <span className={`dark:text-drkcol text-lg text-black xl:text-xl ${menuItem.active && `font-medium dark:text-white`}`}>{menuItem.iconText}</span>
          </div>
        </Link>
      ))}
    </>
  );
}
