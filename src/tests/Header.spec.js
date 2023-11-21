import Header from "@/components/Header.vue";
import { mount } from "@vue/test-utils";
import userStoreMock from "@/tests/__mocks__/userState.js";
import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

jest.mock("@/firebase/fbConfig.js", () => {
  return {
    fireStore: jest.fn(),
    auth: jest.fn(),
    storage: jest.fn(),
  };
});

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockRoute = {
  path: "/login",
  name: "Login",
};

describe("Header.vue", () => {
  it("renders the header", () => {
    let wrapper = mount(Header);
    expect(wrapper.find(".navbar-brand").text()).toBe("eVENTS");
  });

  //   it("displays 'Register' and 'Login' buttons when not logged in", () => {
  //     const wrapper = mount(Header, {
  //       global: {
  //         plugins: [
  //           createTestingPinia({
  //             initialState: {
  //               userStore: userStoreMock.userStateMockWithoutUser,
  //             },
  //           }),
  //         ],
  //         stubs: ["RouterLink"],
  //       },
  //     });

  //     const buttons = wrapper.findAll(".btn-primary");

  //     expect(buttons[0].text()).toContain("Register");
  //     expect(buttons[1].text()).toContain("Login");
  //   });

  it("displays 'Logout' button and 'Hello, {user}' when logged in", () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              users: userStoreMock.userStateMockWithUser,
            },
          }),
        ],
        stubs: ["RouterLink"],
      },
    });

    const logoutButton = wrapper.find(".btn-danger");
    expect(logoutButton.text()).toContain("Logout");

    expect(wrapper.find("#helloUser").text()).toContain(
      `Hello, ${userStoreMock.userStateMockWithUser.user.username}`
    );
  });

  it("redirects to '/login' after logout", async () => {
    const mockLogout = jest.fn();
    const wrapper = mount(Header, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              users: {
                user: {
                  username: "test",
                  email: "",
                },
                actions: {
                  logout: mockLogout,
                },
              },
            },
          }),
        ],
        stubs: ["RouterLink"],
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await wrapper.find(".btn-danger").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.path).toBe("/login");
  });

  //   it('displays "Admin" and "Overview" button when user is admin', () => {
  //     const wrapper = mount(Header, {
  //       global: {
  //         plugins: [
  //           createTestingPinia({
  //             initialState: {
  //               users: {
  //                 user: {
  //                   username: "test",
  //                   email: "",
  //                   isAdmin: true,
  //                 },
  //               },
  //             },
  //           }),
  //         ],
  //         stubs: ["RouterLink"],
  //       },
  //     });

  //     const links = wrapper.findAll(".nav-link");
  //     expect(links[3].text()).toContain("Admin");
  //     expect(links[2].text()).toContain("Overview");
  //   }
  //   );
});
