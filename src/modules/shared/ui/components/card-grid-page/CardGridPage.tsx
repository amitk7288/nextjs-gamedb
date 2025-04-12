import { CardGridPageProps } from "@/modules/shared/types/CardGridPage.type";

export default function CardGridPage({ children, title, desc, icon }: CardGridPageProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 p-2">
      <div className="mb-6 flex flex-col items-start gap-2">
        <div data-testid="card-grid-page-iconTitle-container" className="flex flex-wrap items-center gap-2 text-[60px] font-semibold dark:text-white">
          {icon({})}
          <p className="capitalize leading-tight">{title}</p>
        </div>
        <p className="font-light">{desc}</p>
      </div>
      <div className="3xl:grid-cols-5 grid place-items-center gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{children}</div>
    </div>
  );
}
