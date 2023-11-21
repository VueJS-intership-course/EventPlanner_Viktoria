import { mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";

describe("Card.vue", () => {
  it("matches snapshot", () => {
    const wrapper = mount(Card);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders card", () => {
    const wrapper = mount(Card);
    expect(wrapper.find(".card").exists()).toBe(true);
  });
});
