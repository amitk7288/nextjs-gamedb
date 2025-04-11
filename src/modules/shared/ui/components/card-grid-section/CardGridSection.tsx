import Link from "next/link";
import { CardGridSectionProps } from "@/modules/shared/types/CardGridSection.type";

export default function CardGridSection({ children, title, icon, btnLink }: CardGridSectionProps) {
  return (
    <div className="mb-10 flex flex-col gap-3 p-2">
      <div className="flex items-center gap-2">
        <div className="text-drkbg rounded-md p-1 text-3xl dark:text-white">{icon({})}</div>
        <p className="text-2xl font-semibold dark:text-white">{title}</p>
      </div>
      <div className="3xl:grid-cols-5 mt-auto grid auto-rows-[1fr] place-items-center gap-3 sm:grid-cols-2 md:grid-cols-2 md:place-items-start lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{children}</div>
      {btnLink && (
        <div className="mt-5">
          <Link href={btnLink}>
            <button className="from-blue-500 to-green-600 hover:from-green-600 hover:to-blue-500 dark:border-drkbrd dark:bg-drkbg flex w-fit items-center justify-center rounded-md bg-gradient-to-r px-2 py-[5px] dark:text-white cursor-pointer">
              <p className="xs:text-lg text-xs tracking-wide text-white 2xl:text-lg">{`See all ${title} games`}</p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
