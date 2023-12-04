import { mount } from "@vue/test-utils";
import OverviewPage from "@/pages/overview-page/OverviewPage.vue";
import EventByMonthChart from "@/components/highcharts/EventByMonthChart.vue";
import EventsCalendar from "@/components/EventsCalendar.vue";

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
    getEventList: jest.fn(),
    events: [],
  })),
}));

describe("OverviewPage.vue", () => {
  let wrapper;
  wrapper = mount(OverviewPage, {
    global: {
      stubs: ["router-link"],
    },
  });

  it("renders the overview page", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('calls "getEventList" when the component is mounted', () => {
    expect(wrapper.vm.store.getEventList).toBeCalled();
  });

  it("renders the EventByMonthChart component", () => {
    expect(wrapper.findComponent(EventByMonthChart).exists()).toBe(true);
  });

  it("renders the EventsCalendar component", () => {
    expect(wrapper.findComponent(EventsCalendar).exists()).toBe(true);
  });
});
