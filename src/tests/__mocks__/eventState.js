const eventStateMockWithTickets = {
  id: "123",
  name: "Test Event",
  description: "Test Description",
  utcTime: "2024-12-21T21:30:00.000Z",
  location: [139.27363969923982, -26.580511354696327],
  ticketCount: 98,
  price: 20,
  budget: 1500,
  users: [],
  expenses: [],
  imageURL: "https://fastly.picsum.photos/id/858/200/300",
};

const eventStateMockWithoutTickets = {
  id: "123",
  name: "Test Event",
  description: "Test Description",
  utcTime: "2024-12-21T21:30:00.000Z",
  location: [139.27363969923982, -26.580511354696327],
  ticketCount: 0,
  price: 20,
  budget: 1500,
  users: ["testt@gmail.com", "test@abv.bg"],
  expenses: [],
  imageURL: "https://fastly.picsum.photos/id/858/200/300",
};

const eventStoreMockWithoutTickets = {
  events: [
    {
      id: "123",
      name: "Test Event",
      description: "Test Description",
      utcTime: "2024-12-21T21:30:00.000Z",
      location: [139.27363969923982, -26.580511354696327],
      ticketCount: 0,
      price: 20,
      budget: 1500,
      users: ["test@tt.test"],
    },
  ],
  isEditing: false,
  editedEvent: {},
  selectedEvent: {},
  filterOptions: {
    fromDate: null,
    toDate: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: "",
    ticketStatus: "all",
  },
  filtersApplied: false,
  eventCountByMonth: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const eventStateMock = {
  eventStateMockWithTickets,
  eventStateMockWithoutTickets,
};

export default eventStateMock;
