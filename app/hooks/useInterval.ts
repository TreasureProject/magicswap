import { useEffect } from "react";

import type { Optional } from "../types";

export const useInterval = (
  callback: () => void,
  interval: Optional<number>
) => {
  useEffect(() => {
    if (interval) {
      const timer = setInterval(() => {
        callback();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [interval, callback]);
};
