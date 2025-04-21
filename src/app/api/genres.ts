const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const api_key = process.env.NEXT_PUBLIC_RAWG_API;

export async function fetchGenres() {
  const data = await fetch(`${base_url}/genres?key=${api_key}`);
  return data.json();
}