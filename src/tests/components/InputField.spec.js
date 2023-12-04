import { mount } from "@vue/test-utils";
import InputField from "@/components/InputField.vue";

let wrapper;

beforeEach(() => {
  wrapper = mount(InputField, {
    propsData: {
      label: "Test Label",
      inputAttrs: {
        type: "number",
        name: "test-input",
      },
      inputId: "test-input",
      value: 3,
    },
  });
});

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

describe("InputField.vue", () => {
  it("should render a label", () => {
    expect(wrapper.find("label").text()).toBe("Test Label");
  });

  it("renders an input field", () => {
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("renders a number input field", () => {
    expect(wrapper.find('input[type="number"]').exists()).toBe(true);
  });

  it("renders a textarea input field", () => {
    const wrapper = mount(InputField, {
      propsData: {
        label: "Test Label",
        inputAttrs: {
          type: "textarea",
          name: "test-input",
        },
        inputId: "test-input",
      },
    });
    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("emit an input event when input value changes", async () => {
    await wrapper.find("input").setValue(5);
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("updates the value when input value changes", async () => {
    await wrapper.find("input").setValue(5);
    await wrapper.vm.$nextTick();
    expect(Number(wrapper.find("input").element.value)).toBe(5);
  });
});
