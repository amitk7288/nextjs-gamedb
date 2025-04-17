// "use client";

// import { PiSun, PiMoonStars, PiMagnifyingGlass } from "react-icons/pi";
// import { useTheme, useSetTheme } from "@/store/theme.store";
// import Image from "next/image";
// import useStore from "@/store/store";
// import me from "../../../../../../public/me.jpg"
// import { useEffect, useRef } from "react";

// function ThemeAndProfile() {
//   const theme = useTheme();
//   const toggleTheme = useSetTheme();
//   const searchMobContainer = useRef<HTMLDivElement>(null);
//   const isSearchOpen = useStore((state) => state.isSearchOpen);
//   const setSearchOpen = useStore((state) => state.setSearchOpen);

//   const handleClickMobSearch = () => {
//     setSearchOpen(!isSearchOpen);
//   };

//     useEffect(() => {
//       function handleClickOutside(event: React.MouseEvent<HTMLDivElement>) {
//         if (searchMobContainer.current && !searchMobContainer.current.contains(event.target as Node)) {
//           setSearchOpen(false);
//         }
//       }

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [searchMobContainer, setSearchOpen]);

//   return (
//     <div id="right-box" className="flex basis-auto items-center justify-between gap-3">
//       <div className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] lg:hidden" onClick={handleClickMobSearch}>
//         <PiMagnifyingGlass />
//       </div>
//       <div data-testid="darkMode-icon">
//         <div className="flex items-center gap-3 lg:hidden">
//           {theme === "dark" ? (
//             <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
//               <PiSun />
//             </button>
//           ) : (
//             <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
//               <PiMoonStars />
//             </button>
//           )}
//         </div>
//         <div className="hidden lg:flex lg:items-center lg:gap-4">
//           {theme === "dark" ? (
//             <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
//               <PiSun />
//             </button>
//           ) : (
//             <button onClick={toggleTheme} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px]">
//               <PiMoonStars />
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="flex cursor-pointer items-center gap-2">
//         <div className="relative h-8 w-8 overflow-hidden rounded-full">
//           <Image src={me} alt="profile" fill className="bg-center object-cover" sizes="32px" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ThemeAndProfile

"use client";

import { PiSun, PiMoonStars, PiMagnifyingGlass } from "react-icons/pi";
import { useTheme, useSetTheme } from "@/store/theme.store";
import Image from "next/image";
import useStore from "@/store/store";
import me from "../../../../../../public/me.jpg";

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
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image src={me} alt="profile" fill className="bg-center object-cover" sizes="32px" />
        </div>
      </div>
    </div>
  );
}

export default ThemeAndProfile;