import { mount } from "@vue/test-utils";
import TimeZoneDropdown from "@/components/TimeZoneDropdown.vue";


describe("TimeZoneDropdown.vue", () => {
let wrapper;
  beforeEach(() => {
    wrapper = mount(TimeZoneDropdown);
  });

  it("renders input field", () => {
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("timezone list is hidden by default", () => {
    expect(wrapper.find(".tz-list").isVisible()).toBe(false);
  });

  it("filters timezone list on input", async () => {
    await wrapper.find("input").setValue("Europe");
    expect(wrapper.vm.filteredTimezones).toContain("Europe/Stockholm");
  });

  it("selects timezone on click", async () => {
    await wrapper.find("input").setValue("Europe/Amsterdam");
    await wrapper.find(".tz-list li").trigger("click");
    expect(wrapper.vm.timezone).toBe("Europe/Amsterdam");
  });

  it("timezone list is hidden after selection", async () => {
    await wrapper.find("input").setValue("Europe/Amsterdam");
    await wrapper.find(".tz-list li").trigger("click");
    expect(wrapper.find(".tz-list").isVisible()).toBe(false);
  });

  it('emits "timezone-selected" event on selection', async () => {
    await wrapper.find("input").setValue("Europe/Amsterdam");
    await wrapper.find(".tz-list li").trigger("click");
    expect(wrapper.emitted("selected")).toBeTruthy();
  });
});
