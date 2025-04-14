type ParentPlatform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

export interface GameCardProps {
  id?: string,
  notify?: boolean;
  img: string;
  title: string;
  rating: number;
  genre: string;
  slug: string;
  parentPlatforms: ParentPlatform[];
}
