import { mount } from "@vue/test-utils";
import LoginPage from "@/pages/login-register/LoginPage.vue";
import { useUserStore } from "@/store/userStore.js";

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

jest.mock("@/store/userStore.js", () => ({
  useUserStore: jest.fn(),
}));

describe("LoginPage.vue", () => {
  let wrapper;
  let mockLogin;

  beforeEach(() => {
    mockLogin = jest.fn();
    useUserStore.mockReturnValue({
      loginUser: mockLogin,
    });

    wrapper = mount(LoginPage, {
      global: {
        stubs: ["router-link"],
      },
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("renders the correct title", () => {
    expect(wrapper.find(".card-title").text()).toBe("Login");
  });

  it("renders the correct button text", () => {
    expect(wrapper.find(".btn").text()).toBe("Login");
  });

  it("renders labels for the email and password fields", () => {
    const labels = wrapper.findAll(".form-label");
    expect(labels.length).toBe(2);
    const emailLabel = labels[0].text();
    const passwordLabel = labels[1].text();
    expect(emailLabel).toBe("Email");
    expect(passwordLabel).toBe("Password");
  });

  it('renders an "Email" and "Password" input field', () => {
    expect(wrapper.find("#email").exists()).toBe(true);
    expect(wrapper.find("#password").exists()).toBe(true);
  });
  
});
