import { mount, shallowMount } from "@vue/test-utils";
import OverviewPage from "@/pages/overview-page/OverviewPage.vue";


jest.mock("@/store/eventStore");

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

jest.mock("@/components/highcharts/EventByMonthChart.vue", () => {
  return {
    template: "<div>Mocked Event By Month Chart</div>",
  };
});

jest.mock("@/components/EventsCalendar.vue", () => {
  return {
    template: "<div>Mocked Events Calendar</div>",
  };
});

jest.mock("@/store/eventStore.js", () => ({
  useEventStore: jest.fn(() => ({
    events: [
      {
        id: "123",
        name: "Test Event",
        description: "Test Description",
        utcTime: "2024-12-21T21:30:00.000Z",
        location: [139.27363969923982, -26.580511354696327],
        ticketCount: 0,
        price: 20,
        budget: 1500,
        users: ["test@test.test"],
      },
    ],
    getEventList: jest.fn(),
    eventCountByMonth: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  })),
}));

describe("OverviewPage.vue", () => {
  let wrapper;
  wrapper = mount(OverviewPage, {
    global: {
      stubs: ["router-link"],
      components: {
        EventByMonthChart: {
          template: "<div>Mocked Event By Month Chart</div>",
          props: ["eventCount"],
        },
        EventsCalendar: {
          template: "<div>Mocked Events Calendar</div>",
          props: ["currentUserEvents"],
        },
      },
    },
  });

  it("renders the overview page", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls "getEventList" when the component is mounted', () => {
    expect(wrapper.vm.store.getEventList).toBeCalled();
  });
});
