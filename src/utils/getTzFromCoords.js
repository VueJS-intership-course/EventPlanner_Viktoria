import tzlookup from "tz-lookup";

const convertCoordsToTz = (coordinates) => {
  const [lon, lat] = coordinates;
  const timezone = tzlookup(lat, lon);

  return timezone;
};

export default convertCoordsToTz;
