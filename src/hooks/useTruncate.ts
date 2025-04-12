import { useMemo } from "react";

function useTruncate(text: string, maxLength: number) {
  const truncatedText = useMemo(() => {
    if (!text || maxLength === undefined || text.length <= maxLength) {
      return text || "";
    }
    return `${text.substring(0, maxLength)}...`;
  }, [text, maxLength]);

  return truncatedText;
}

export default useTruncate;
