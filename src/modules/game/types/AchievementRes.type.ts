export interface AchievementResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    name: string;
    description: string;
    image: string;
    percent: string;
  }[];
};
