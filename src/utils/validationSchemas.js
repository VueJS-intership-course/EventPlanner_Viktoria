import * as Yup from "yup";

export const createEventSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  eventDescription: Yup.string().required("Event Description is required"),
  eventDate: Yup.date()
    .required("Event Date is required")
    .test(
      "is-greater-than-today",
      "Event Date must be in the future",
      function (value) {
        return value > new Date();
      }
    ),
  eventTime: Yup.string().required("Event Time is required"),
  ticketCount: Yup.number()
    .typeError("Available Tickets must be a number")
    .required("Available Tickets is required")
    .min(0, "Available Tickets must be greater than 0"),
  price: Yup.number()
    .typeError("Ticket Price must be a number")
    .required("Ticket Price is required")
    .min(1, "Ticket Price must be greater than 0"),
  budget: Yup.number()
    .typeError("Event Budget must be a number")
    .required("Event Budget is required")
    .min(1, "Event Budget must be greater than 0"),
  eventImage: Yup.mixed().required("Event Image is required"),
});

export const editEventSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  eventDescription: Yup.string().required("Event Description is required"),
  eventDate: Yup.date()
    .required("Event Date is required")
    .test(
      "is-greater-than-today",
      "Event Date must be in the future",
      function (value) {
        return value > new Date();
      }
    ),
  eventTime: Yup.string().required("Event Time is required"),
  ticketCount: Yup.number()
    .typeError("Available Tickets must be a number")
    .required("Available Tickets is required")
    .min(1, "Available Tickets must be greater than 0"),
  price: Yup.number()
    .typeError("Ticket Price must be a number")
    .required("Ticket Price is required")
    .min(1, "Ticket Price must be greater than 0"),
});

export const registerSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  repeatPassword: Yup.string()
    .required("Repeat Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const editUserSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
});

export const filterSchema = Yup.object({
  toDate: Yup.date()
    .nullable()
    .min(Yup.ref("fromDate"), "To Date must be after From Date"),

  maxPrice: Yup.number()
    .nullable()
    .min(Yup.ref("minPrice"), "Max Price must be greater than Min Price"),
});

export const budgetSchema = Yup.object({
  cost: Yup.number()
    .typeError("Cost must be a number")
    .required("Cost is required")
    .min(1, "Cost must be greater than 0"),
});
