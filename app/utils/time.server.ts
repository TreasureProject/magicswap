import {
  addSeconds,
  getUnixTime,
  startOfHour,
  startOfMinute,
  startOfSecond,
  subDays,
  subWeeks,
} from "date-fns";

export const getOneDayFilter = () => {
  const date = startOfSecond(
    startOfMinute(startOfHour(subDays(Date.now(), 1))),
  );
  const start = getUnixTime(date);
  const end = getUnixTime(addSeconds(date, 600));
  return {
    timestamp_gt: start,
    timestamp_lt: end,
  };
};

export const getOneWeekFilter = () => {
  const date = startOfSecond(
    startOfMinute(startOfHour(subWeeks(Date.now(), 1))),
  );
  const start = getUnixTime(date);
  const end = getUnixTime(addSeconds(date, 600));
  return {
    timestamp_gt: start,
    timestamp_lt: end,
  };
};
