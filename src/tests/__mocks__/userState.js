const userStateMockWithoutUser = {
  user: {},
};

const userStateMockWithUser = {
  user: {
    username: "test",
    email: "test@test.test",
    timezone: "Europe/Monaco",
    isAdmin: true,
  },
  
};

const userStateMockWithUserAndIsEditing = {
  user: {
    username: "test",
    email: "test@test.test",
    timezone: "Europe/Monaco",
  },
  isEditing: true,
  editedUser: {
    email: "test@test.test",
    username: "test",
    timezone: "Europe/Monaco",
  },
};

const userStoreMock = {
  userStateMockWithoutUser,
  userStateMockWithUser,
  userStateMockWithUserAndIsEditing,
};

export default userStoreMock;

