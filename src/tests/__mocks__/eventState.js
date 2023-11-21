const eventStateMockWithTickets = {
  id: "123",
  name: "Test Event",
  description: "Test Description",
  utcTime: "2024-12-21T21:30:00.000Z",
  location: [139.27363969923982, -26.580511354696327],
  ticketCount: 5,
  price: 20,
  budget: 1500,
  users: ["testt@gmail.com", "test@abv.bg"],
  expenses: [{ category: "Promotion", cost: 54 }],
  imageURL:
    "https://firebasestorage.googleapis.com/v0/b/event-manager-1329.appspot.com/o/event_images%2FDevWorld%20Conf%202024?alt=media&token=190d911e-0acb-4436-ac63-e38186e123bd",
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
  users: ["test@test.test"],
  expenses: [],
  imageURL: "https://fastly.picsum.photos/id/858/200/300",
};

const eventStateMock = {
  eventStateMockWithTickets,
  eventStateMockWithoutTickets,
};

export default eventStateMock;
