"use client";

import Search from "../search/Search";
import ThemeAndProfile from "./ThemeAndProfile";
import MenuItems from "../sidebar/MenuItems";
import useStore from "@/store/store";
import Link from "next/link";
import { useRef, useState } from "react";
import { RiCloseLargeLine, RiMenu2Fill } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";

export default function Header() {
   const isSearchOpen = useStore((state) => state.isSearchOpen);
   const searchMobContainer = useRef(null);
   const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);

  return (
    <header id="mainHeader" className="3xl:w-[calc(100%_-_12vw)] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol fixed right-0 top-0 h-[80px] w-full border-b bg-white py-5 pl-[12px] pr-5 lg:w-[calc(100%_-_20vw)] lg:p-5 xl:w-[calc(100%_-_18vw)] 2xl:w-[calc(100%_-_15vw)]">
      <div id="mobile search" className={`absolute left-0 ${isSearchOpen ? `top-0 flex flex-col justify-center` : `top-[-80px]`} duration-400 dark:bg-drkbg2 z-10 h-[inherit] w-full bg-[#f7f7f7] transition-all ease-in-out lg:hidden`} ref={searchMobContainer}>
        <Search />
      </div>

      <div className="z-0 flex items-center justify-between gap-4">
        <div id="left-side" className="flex items-center justify-between gap-3 lg:basis-[100%]">
          <div className="lg:hidden">
            {isMobMenuOpen ? (
              <div onClick={() => setIsMobMenuOpen((prevState) => !prevState)} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-2xl">
                <RiCloseLargeLine className="z-50" />
              </div>
            ) : (
              <div onClick={() => setIsMobMenuOpen((prevState) => !prevState)} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-2xl">
                <RiMenu2Fill className="z-50" />
              </div>
            )}
          </div>
          <div className="flex-shrink-0 lg:hidden">
            <Link href={`/`}>
              <div className="flex items-center gap-4">
                <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-400">
                  <TbBrandNextjs className="text-3xl text-white" />
                </div>
              </div>
            </Link>
          </div>
          <div id="desktop-search" className="w-[60%]">
            <Search />
          </div>
        </div>
        <ThemeAndProfile />
      </div>

      {isMobMenuOpen && (
        <div className="no-scrollbar dark:bg-drkbg absolute left-0 top-[80px] z-[-1] flex h-[calc(100vh_-_80px)] w-[100vw] flex-col gap-[50px] overflow-y-scroll bg-[#f7f7f7] p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 overflow-hidden rounded-full">
                {/* <img src={me} alt="profilepic" /> */}
                <p>image</p>
              </div>
              <p>Amit Kadara</p>
            </div>
          </div>
          <nav className="flex flex-col gap-7">
            <MenuItems />
          </nav>
        </div>
      )}
    </header>
  );
}