export default function formatDate ({dateStr}: {dateStr: string}) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`
}