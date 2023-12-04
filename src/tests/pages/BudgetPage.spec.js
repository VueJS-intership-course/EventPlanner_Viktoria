import BudgetPage from "@/pages/budget-page/BudgetPage.vue";
import { mount } from "@vue/test-utils";
import PieChart from "@/components/highcharts/PieChart.vue";

jest.mock("@/components/highcharts/PieChart.vue", () => {
  return {
    template: "<div>Mocked Pie Chart</div>",
  };
});

jest.mock("@/store/eventStore.js", () => ({
  useEventStore: jest.fn(() => ({
    selectedEvent: {
      id: "123",
      name: "Test Event",
      startDate: "2021-01-01",
      endDate: "2021-01-02",
      timeZone: "America/New_York",
      budget: 1000,
      expenses: [
        {
          id: "123",
          name: "Test Expense",
          amount: 100,
          date: "2021-01-01",
          category: "Food",
        },
      ],
    },
    getEventList: jest.fn(),
    getEventById: jest.fn(),
    addExpense: jest.fn(),
    deleteExpense: jest.fn(),
  })),
}));

jest.mock("@/store/userStore.js", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/utils/toastifyNotification", () => {
  return {
    toastifyNotification: jest.fn(),
  };
});

describe("BudgetPage.vue", () => {
  it("mounts successfully", () => {
    const wrapper = mount(BudgetPage);
    expect(wrapper.vm).toBeTruthy();
  });

  it("renders the correct budget", () => {
    const wrapper = mount(BudgetPage);
    expect(wrapper.find("p").text()).toBe("Start Budget: $1000");
  });

  it("renders the correct event name", () => {
    const wrapper = mount(BudgetPage);
    expect(wrapper.find("h3").text()).toBe("Budget for Test Event");
  });

  it("renders all expenses lis", () => {
    const wrapper = mount(BudgetPage);
    expect(wrapper.findAll("li").length).toBe(9);
  });

  it("renders the  pie chart", () => {
    const wrapper = mount(BudgetPage);
    expect(wrapper.findComponent(PieChart).exists()).toBe(true);
  });
});
