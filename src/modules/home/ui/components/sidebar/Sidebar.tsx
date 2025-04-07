import Link from "next/link";
import MenuItems from "./MenuItems";
import { TbBrandNextjs } from "react-icons/tb";

export default function Sidebar() {
  return (
    <aside className="3xl:w-[12vw] dark:bg-drkbg dark:text-drkcol fixed bottom-0 left-0 top-0 z-0 hidden h-[100%] w-[20vw] lg:flex xl:w-[18vw] 2xl:w-[15vw]">
      <div className="dark:border-drkbrd dark:bg-drkbg dark:text-drkcol flex w-full flex-col items-center justify-between border-r border-gray-300 pb-10 pt-5">
        <div className="flex w-full flex-col items-start gap-[5vh] px-5">
          <div className="w-full">
            <Link href="/">
              <div className="flex items-center gap-4">
                <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-400">
                  <TbBrandNextjs className="text-3xl text-white" />
                </div>
                <p className="text-2xl font-medium lg:text-lg xl:text-xl 2xl:text-2xl">
                  NextJS <span className="font-extralight">Games</span>
                </p>
              </div>
            </Link>
          </div>
          <div className="dark:text-drkcol flex w-full flex-col items-center gap-[4vh] text-2xl text-black">
            <MenuItems />
          </div>
        </div>
      </div>
    </aside>
  );
}
