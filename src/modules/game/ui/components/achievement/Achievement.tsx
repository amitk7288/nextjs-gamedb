import Image from "next/image";

interface AchievementProps {
  img: string;
  name: string;
  progress: number;
  desc: string;
}

export default function Achievement({ img, name, progress, desc }: AchievementProps) {
  return (
    <div className="dark:border-drkbrd flex items-start gap-3 rounded-md border p-1">
      <div>
        <Image src={img} alt={name} className="max-h-[55px] max-w-[55px] rounded-md" />
      </div>
      <div>
        <p className="text-xs dark:text-white">{progress}%</p>
        <p className="font-medium dark:text-white">{name}</p>
        <p className="text-xs font-extralight dark:text-white/[.50]">{desc}</p>
      </div>
    </div>
  );
}
