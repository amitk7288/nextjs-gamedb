"use client";

import { useTheme, useSetTheme } from "@/store/theme.store";
import { PiSun, PiMoonStars, PiMagnifyingGlass } from "react-icons/pi";
import { Button } from "@/modules/shared/ui/components/shadcn-comps/button";
import useStore from "@/store/store";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function ThemeAndProfile() {
  const theme = useTheme();
  const toggleTheme = useSetTheme();
  const isSearchOpen = useStore((state) => state.isSearchOpen);
  const setSearchOpen = useStore((state) => state.setSearchOpen);

  const handleClickMobSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <div id="right-box" className="flex basis-auto items-center justify-between gap-3">
      <div className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] lg:hidden" onClick={handleClickMobSearch}>
        <PiMagnifyingGlass />
      </div>
      <div data-testid="darkMode-icon">
        <div className="flex items-center gap-3 lg:hidden">
          {theme === "dark" ? (
            <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
              <PiSun />
            </button>
          ) : (
            <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
              <PiMoonStars />
            </button>
          )}
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          {theme === "dark" ? (
            <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
              <PiSun />
            </button>
          ) : (
            <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
              <PiMoonStars />
            </button>
          )}
        </div>
      </div>
      <div className="flex cursor-pointer items-center gap-2">
        <>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </>
      </div>
    </div>
  );
}

export default ThemeAndProfile;
