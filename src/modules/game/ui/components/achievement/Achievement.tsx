import Image from "next/image";

interface AchievementProps {
  img: string;
  name: string;
  progress: string;
  desc: string;
}

export default function Achievement({ img, name, progress, desc }: AchievementProps) {
  return (
    <div className="dark:border-drkbrd flex items-center gap-3 rounded-md border border-[#e5e7eb] p-1">
      <div>
        <Image width={55} height={55} src={img} alt={name} className="max-h-[55px] max-w-[55px] rounded-md" />
      </div>
      <div>
        <p className="text-xs dark:text-white">{progress}%</p>
        <p className="font-medium dark:text-white">{name}</p>
        <p className="text-xs font-extralight dark:text-white/[.50]">{desc}</p>
      </div>
    </div>
  );
}
