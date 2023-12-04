import { mount } from "@vue/test-utils";
import Modal from "@/components/Modal.vue";

describe("Modal.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Modal, {
      propsData: {
        title: "Test Modal",
        modalId: "test-modal",
      },
    });
  });

  it("renders the correct modal title", () => {
    expect(wrapper.find(".modal-title").text()).toBe("Test Modal");
  });

  it("renders the Save and Cancel buttons", () => {
    expect(wrapper.find(".btn.btn-primary").text()).toBe("Save");
    expect(wrapper.find(".btn.btn-secondary").text()).toBe("Cancel");
  });

  it("emits a save event when the Save button is clicked", async () => {
    await wrapper.find(".btn.btn-primary").trigger("click");
    expect(wrapper.emitted().save).toBeTruthy();
  });
  
  it("emits a cancel event when the Cancel button is clicked", async () => {
    await wrapper.find(".btn.btn-secondary").trigger("click");
    expect(wrapper.emitted().cancel).toBeTruthy();
  });

});
