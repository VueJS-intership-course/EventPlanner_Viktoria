import { shallowMount } from "@vue/test-utils";
import RegisterPage from "@/pages/login-register/RegisterPage.vue";
// import InputField from "@/components/InputField.vue";
// import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";

jest.mock("@/firebase/fbConfig.js", () => {
  return {
    fireStore: jest.fn(),
    auth: jest.fn(),
    storage: jest.fn(),
  };
});

jest.mock("@/store/userStore.js", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/components/TimeZoneDropdown.vue", () => {
  return {
    template: "<div>Mocked Time Zone Dropdown</div>",
  };
});

jest.mock("@/utils/toastifyNotification", () => {
    return {
        toastifyNotification: jest.fn(),
    };
});

describe("RegisterPage.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegisterPage);
  });

  it("mounts successfully", () => {
    expect(wrapper.vm).toBeTruthy();
    });

});
