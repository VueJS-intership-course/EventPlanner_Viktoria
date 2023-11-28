import { mount } from "@vue/test-utils";
import InputField from "@/components/InputField.vue";

let wrapper;

beforeEach(() => {
  wrapper = mount(InputField, {
    propsData: {
      label: "Test Label",
      type: "text",
      inputId: "test-input",
      value: 3,
    },
  });
});

describe("InputField.vue", () => {
  it("should render a label", () => {
    expect(wrapper.find("label").text()).toBe("Test Label");
  });

  it("renders an input with name and id attribute plus a value", () => {
    const wrapper = mount(InputField, {
      propsData: {
        type: "text",
        inputId: "test-input",
        value: "asd",
      }
    });
    expect(wrapper.find("input").attributes().name).toBe("test-input");
    expect(wrapper.find("input").attributes().id).toBe("test-input");
    expect(wrapper.find("input").element.value).toBe("asd");
  });

  it("renders an input field", () => {
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("renders a number input field", () => {
    const wrapper = mount(InputField, {
      propsData: {
        label: "Test Label",
        type: "number",
        inputId: "test-input",
        value: 3,
      },
    });
    expect(wrapper.find('input[type="number"]').exists()).toBe(true);
  });

  it("renders a text input field", () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it("renders a textarea field", () => {
    const wrapper = mount(InputField, {
      propsData: {
        label: "Test Label",
        type: "textarea",
        inputId: "test-input",
        value: 3,
      },
    });
    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("emit an input event when input value changes", async () => {
    await wrapper.find("input").setValue(5);
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("updates the value when input value changes", async () => {
    const wrapper = mount(InputField, {
      propsData: {
        label: "Test Label",
        type: "number",
        inputId: "test-input",
        value: 3,
      },
    });
    await wrapper.find("input").setValue(5);
    await wrapper.vm.$nextTick();
    expect(Number(wrapper.find("input").element.value)).toBe(5);
  });
});
