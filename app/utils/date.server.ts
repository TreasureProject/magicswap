import { distanceInWordsToNow } from "date-fns";

export const getTimeAgo = (timestamp: number) =>
  distanceInWordsToNow(new Date(timestamp * 1000), {
    addSuffix: true,
  });
