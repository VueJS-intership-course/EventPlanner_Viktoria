import moment from "moment-timezone";

export const timezones = moment.tz.names();

export const expenseCategories = [
  "Utilities",
  "Rent",
  "Promotion",
  "Equipment",
  "Catering",
  "Staff",
  "Other",
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const queryParamsProperties = [
  "fromDate",
  "toDate",
  "minPrice",
  "maxPrice",
  "availableTickets",
  "soldOut",
  "searchQuery",
];
