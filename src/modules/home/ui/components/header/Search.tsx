export default function Search() {
  return (
    // <>
    //   <div id="mobile search" className={`absolute left-0 ${isSearchOpen ? `top-0 flex flex-col justify-center` : `top-[-80px]`} duration-400 dark:bg-drkbg2 z-10 h-[inherit] w-full bg-[#f7f7f7] transition-all ease-in-out lg:hidden`} ref={searchMobContainer}>
    //     <Search isSearchOpen={isSearchOpen} />
    //   </div>
    //   <div className="z-0 flex items-center justify-between gap-4">
    //     <div id="left-box" className="flex items-center justify-between gap-3 lg:basis-[100%]">
    //       <div className="lg:hidden">
    //         {isMobMenuOpen ? (
    //           <div onClick={() => setIsMobMenuOpen((prevState) => !prevState)} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-2xl">
    //             <RiCloseLargeLine className="z-50" />
    //           </div>
    //         ) : (
    //           <div onClick={() => setIsMobMenuOpen((prevState) => !prevState)} className="hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-2xl">
    //             <RiMenu2Fill className="z-50" />
    //           </div>
    //         )}
    //       </div>
    //       <div className="flex-shrink-0 lg:hidden">
    //         <Link to={`/`}>
    //           <div className="flex items-center gap-4">
    //             <div className="from-gradPink to-gradOrange flex h-[35px] w-[35px] items-center justify-center rounded-md bg-gradient-to-r">
    //               <GrReactjs className="text-2xl text-white" />
    //             </div>
    //           </div>
    //         </Link>
    //       </div>
    //       <div id="desktop-search" className="w-[60%]">
    //         <Search />
    //       </div>
    //     </div>
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
    //         <div className="h-8 w-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${me})` }} />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Mob menu */}
    //   {isMobMenuOpen && (
    //     <div className="no-scrollbar dark:bg-drkbg absolute left-0 top-[80px] z-[-1] flex h-[calc(100vh_-_80px)] w-[100vw] flex-col gap-[50px] overflow-y-scroll bg-[#f7f7f7] p-6 lg:hidden">
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-center gap-3">
    //           <div className="h-7 w-7 overflow-hidden rounded-full">
    //             <img src={me} alt="profilepic" />
    //           </div>
    //           <p>Amit Kadara</p>
    //         </div>
    //       </div>
    //       <nav className="flex flex-col gap-7">
    //         {mobMenu.map((item) => (
    //           <div key={item.id} className="dark:text-drkcol">
    //             <Link to={item.path} className={`flex items-center gap-3 ${item.active && `pl-2`} duration-400 transition-all ease-in-out`} onClick={() => handleClickIcon(item.id)}>
    //               <div className={`${item.active && `from-gradPink to-gradOrange rounded-full bg-gradient-to-r p-1.5 text-white`} text-2xl`}>{item.active ? item.activeIcon : item.icon}</div>
    //               <p className="text-xl xl:text-xl">{item.iconText}</p>
    //             </Link>
    //           </div>
    //         ))}
    //       </nav>
    //     </div>
    //   )}
    // </>
    <p>search field</p>
  );
}