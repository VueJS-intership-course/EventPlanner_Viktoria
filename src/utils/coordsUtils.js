import tzlookup from "tz-lookup";

export const convertCoordsToTz = (coordinates) => {
  if (!coordinates) return "Loading...";
  const [lon, lat] = coordinates;
  const timezone = tzlookup(lat, lon);

  return timezone;
};

export const getCountryFromCoords = async (coords) => {
  try {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${coords[1]}&lon=${coords[0]}&format=json`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.address && data.address.country) {
        const res = await data.address.country;
        return res;
      }
    }
  } catch (error) {
    console.log("Error:", error);
  }
  return "Unknown";
};
