import { shallowMount, mount } from "@vue/test-utils";
import EventDetailsPage from "@/pages/events-page/EventDetailsPage.vue";
import userStoreMock from "@/tests/__mocks__/userState.js";
import eventStoreMock from "@/tests/__mocks__/eventState.js";
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

jest.mock("@/components/maps/MapDisplay.vue", () => {
  return {
    template: "<div>Mocked Map Display</div>",
  };
});

jest.mock("@/pages/events-page/EditEventModal.vue", () => {
  return {
    template: "<div>Mocked Edit Event Modal</div>",
  };
});

describe("EventDetailsPage.vue", () => {
  it("renders the event details page", () => {
    const wrapper = mount(EventDetailsPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              eventStore: {
                selectedEvent: {
                  id: "123",
                  name: "Test Event",
                  description: "Test Description",
                  utcTime: "2024-12-21T21:30:00.000Z",
                  location: [139.27363969923982, -26.580511354696327],
                  ticketCount: 5,
                  price: 20,
                  budget: 1500,
                  users: ["testt@gmail.com", "test@abv.bg"],
                  expenses: [{ category: "Promotion", cost: 54 }],
                  imageURL:
                    "https://firebasestorage.googleapis.com/v0/b/event-manager-1329.appspot.com/o/event_images%2FDevWorld%20Conf%202024?alt=media&token=190d911e-0acb-4436-ac63-e38186e123bd",
                },
              },
            },
          }),
        ],
        stubs: ["router-link"],
        components: {
          MapDisplay: {
            template: "<div>Mocked Map Display</div>",
          },
          EditEventModal: {
            template: "<div>Mocked Edit Event Modal</div>",
          },
        },
      },
    });

    console.log("console log here");

    expect(wrapper.find(".event-name").text()).toBe("Test Event");
    expect(wrapper.find(".event-description").text()).toBe("Test Description");
  });
});
