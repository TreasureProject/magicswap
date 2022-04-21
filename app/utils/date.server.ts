import { formatDistanceToNow } from "date-fns";

export const getTimeAgo = (timestamp: number) =>
  formatDistanceToNow(new Date(timestamp * 1000), {
    addSuffix: true,
  });
