import moment from "moment-timezone";
import tzlookup from "tz-lookup";
import { useUserStore } from "@/store/userStore.js";

const getUserTime = (date, time, eventcoords) => {
  if (!date || !time || !eventcoords) return "Loading...";

  const [lon, lat] = eventcoords;
  const timezone = tzlookup(lat, lon);

  const eventTime = moment.tz(`${date} ${time}`, timezone);

  const store = useUserStore();

  if (store.user && store.user.timezone) {
    const targetTime = eventTime
      .tz(store.user.timezone)
      .format("HH:mm DD/MM/YYYY");
    return targetTime;
  }

  return `${time}${date}`;
};

export default getUserTime;
