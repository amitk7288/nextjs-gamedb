import { IconType } from "react-icons";

interface MetaInfoProps {
  icon: IconType;
  name: string;
  value: string;
}

export default function MetaInfo({ icon, name, value }: MetaInfoProps) {
  return (
    <div className="dark:border-drkbrd rounded-lg border px-2 py-1">
      <div className="flex items-center gap-1">
        <div className="text-xl">icon</div>
        <p className="xs:text-base text-sm font-extralight dark:text-white 2xl:text-xl 2xl:font-light">{name}</p>
      </div>
      <div>
        <p className="xs:text-base text-sm font-medium dark:text-white 2xl:text-xl">{value}</p>
      </div>
    </div>
  );
}
