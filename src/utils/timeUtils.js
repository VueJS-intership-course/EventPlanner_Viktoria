import moment from "moment-timezone";
import { useUserStore } from "@/store/userStore.js";

export const getUserTime = (utcTime) => {
  const store = useUserStore();
  if (!utcTime || !store.user || !store.user.timezone) {
    return "Loading...";
  }
  const userTime = moment.utc(utcTime).tz(store.user.timezone);
  return userTime.format("DD MMM YYYY | HH:mm");
};

export const getEventTime = (utcTime, timezone) => {
  if (!utcTime || !timezone) {
    return "Loading...";
  }
  const eventTime = moment.utc(utcTime).tz(timezone);
  return eventTime.format("DD MMM YYYY | HH:mm");
};
