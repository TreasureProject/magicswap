import {
  addSeconds,
  startOfHour,
  startOfMinute,
  startOfSecond,
  subDays,
  subWeeks,
} from "date-fns";

export const getOneDayFilter = () => {
  const date = startOfSecond(
    startOfMinute(startOfHour(subDays(Date.now(), 1)))
  );
  const start = date.getTime();
  const end = addSeconds(date, 600).getTime();
  return {
    timestamp_gt: start / 1000,
    timestamp_lt: end / 1000,
  };
};

export const getOneWeekFilter = () => {
  const date = startOfSecond(
    startOfMinute(startOfHour(subWeeks(Date.now(), 1)))
  );
  const start = date.getTime();
  const end = addSeconds(date, 600).getTime();
  return {
    timestamp_gt: start / 1000,
    timestamp_lt: end / 1000,
  };
};
