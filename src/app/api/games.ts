import { FetchGameProps } from "@/modules/game/types/FetchGame.type";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const api_key = process.env.NEXT_PUBLIC_RAWG_API;

export async function fetchGames({ genreId, page = 1, pageSize = 40 }: FetchGameProps) {
  const allGames = [];
  let currentPage = page;

  while (allGames.length < pageSize) {
    const res = await fetch(`${base_url}/games?key=${api_key}&page=${currentPage}&page_size=${pageSize}&genres=${genreId}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch games: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      break;
    }

    allGames.push(...data.results);
    currentPage += 1;
  }

  return allGames.slice(0, pageSize);
}

export async function fetchGamesByTitle({ search }: { search: string }) {
  const res = await fetch(`${base_url}/games?key=${api_key}&search=${search}`);
  const data = await res.json();
  return data;
}

export async function fetchGameById({ gameId }: FetchGameProps) {
  const res = await fetch(`${base_url}/games/${gameId}?key=${api_key}`);
  const data = res.json();
  return data;
}

export async function fetchAchievements({ gameId, page }: FetchGameProps) {
  const res = await fetch(`${base_url}/games/${gameId}/achievements?key=${api_key}&page=${page}`);
  const data = await res.json();
  return data;
}

export async function fetchScreenshots({ gameId }: FetchGameProps) {
  const res = await fetch(`${base_url}/games/${gameId}/screenshots?key=${api_key}`);
  const data = await res.json();
  return data;
}

export async function fetchDLCS({ gameId }: FetchGameProps) {
  const res = await fetch(`${base_url}/games/${gameId}/additions?key=${api_key}`);
  const data = await res.json();
  return data;
}

export async function fetchRelated({ gameId }: FetchGameProps) {
  const res = await fetch(`${base_url}/games/${gameId}/game-series?key=${api_key}`);
  const data = await res.json();
  return data;
}
