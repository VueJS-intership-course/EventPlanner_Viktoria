import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import HighchartsMap from "highcharts/modules/map";

HighchartsMap(Highcharts);

export default {
  install: (app) => {
    app.use(HighchartsVue, { Highcharts });
  },
};
