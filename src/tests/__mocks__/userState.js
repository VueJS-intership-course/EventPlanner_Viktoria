const userStateMockWithoutUser = {};

const userStateMockWithUser = {
  username: "test",
  email: "test@test.test",
  timezone: "Europe/Monaco",
  isAdmin: false,
};

const userStateMockWithUserAndIsAdmin = {
  username: "test",
  email: "admin@test.com",
  timezone: "Europe/Monaco",
  isAdmin: true,
};

const userStoreMock = {
  userStateMockWithoutUser,
  userStateMockWithUser,
  userStateMockWithUserAndIsAdmin,
};

export default userStoreMock;
