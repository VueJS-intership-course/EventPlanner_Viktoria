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
  useRoute: () => ({
    params: jest.fn(() => ({
      id: 0,
    })),
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
  it("renders the event details page", async () => {
    const wrapper = mount(EventDetailsPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              eventStore: {
                selectedEvent: eventStoreMock.eventStateMockWithTickets,
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

    expect(wrapper.find("h1").text()).toBe("Test Event");
    expect(wrapper.find(".lead").text()).toBe("Test Description");
  });

  it("doesn't render buy button if there are no tickets tickets", async () => {
    const wrapper = mount(EventDetailsPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              eventStore: {
                selectedEvent: eventStoreMock.eventStateMockWithoutTickets,
              },
              userStore: {
                user: userStoreMock.userStateMockWithUser,
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

    expect(wrapper.find("h1").text()).toBe("Test Event");
    expect(wrapper.find(".btn").exists()).toBe(false);
  });
});
