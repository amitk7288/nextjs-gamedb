"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isSearchOpen = useStore((state) => state.isSearchOpen);
  const setSearchOpen = useStore((state) => state.setSearchOpen);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen && searchInputRef?.current) {
      searchInputRef.current.focus();
    } else if (!isSearchOpen) {
      setSearchQuery("")
    }
  }, [isSearchOpen]);

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalisedQuery = searchQuery.trim().replace(/\s+/g, " ");
    if (normalisedQuery !== "") {
      router.push(`/search/${normalisedQuery}`);
    }
    setSearchOpen(false);
    setSearchQuery("");
  }

  return (
    <div className={`${!isSearchOpen ? `hidden` : `flex lg:hidden`} dark:bg-drkbg2 dark:text-drkcol relative h-[40px] w-full items-center gap-2 rounded-md bg-[#f7f7f7] px-5 py-2.5 lg:flex`}>
      <PiMagnifyingGlassBold className="text-lg" />
      <form onSubmit={(e) => handleSearchSubmit(e)} className="w-[100%]">
        <input data-cy="search-field" className="dark:text-drkcol w-[100%] border-none bg-[transparent] p-0 text-sm font-medium text-black outline-none focus:ring-0 xl:text-base" type="search" name="searchgames" id="searchgames" placeholder="Search 874, 833 games..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ref={searchInputRef} />
      </form>

      <div className="dark:bg-drkbg2 dark:text-drkcol absolute left-[-81px] top-[55px] w-[100vw] rounded-b-md bg-[#f7f7f7] sm:left-0 sm:top-[35px] sm:w-full"></div>
    </div>
  );
}
