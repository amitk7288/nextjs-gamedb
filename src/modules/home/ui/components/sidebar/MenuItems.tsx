"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import menuItems from "@/modules/home/data/MenuItems";
import { MenuItemProps } from "@/modules/home/types/MenuItem.type";
import { useClerk, useAuth } from "@clerk/nextjs";

export default function MenuItems() {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [items, setItems] = useState<MenuItemProps[]>(menuItems);

  useEffect(() => {
    setItems((prevState) =>
      prevState.map((menuItem) => {
        const isActive = menuItem.path === pathname;
        return { ...menuItem, active: isActive };
      })
    );
  }, [pathname]);

  function handleMenuItemClick(menuItem: MenuItemProps) {
    if (menuItem.auth && !isSignedIn) {
      clerk.openSignIn({
        fallbackRedirectUrl: menuItem.path,
      });
    } else {
      router.push(menuItem.path);
    }
  }

  return (
    <>
      {items.map((menuItem) => (
        <div
          key={menuItem.id}
          title={menuItem.iconText}
          className={`${menuItem.active ? `pl-2` : ""} duration-400 flex h-[50px] w-full cursor-pointer items-center justify-start transition-all ease-in-out`}
          onClick={() => {
            handleMenuItemClick(menuItem);
          }}>
          <div className="flex items-center gap-3">
            <div className={`${menuItem.active && `rounded-full bg-gradient-to-r from-blue-500 to-green-400 p-1.5 text-white`}`}>{menuItem.active ? <menuItem.activeIcon /> : <menuItem.icon />}</div>
            <span className={`dark:text-drkcol text-lg text-black xl:text-xl ${menuItem.active && `font-medium dark:text-white`}`}>{menuItem.iconText}</span>
          </div>
        </div>
      ))}
    </>
  );
}
