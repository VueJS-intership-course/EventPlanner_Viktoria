<template>
  <div>
    <div id="eventDetailsMap" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill } from "ol/style";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

const { location } = defineProps({
  location: {
    type: Array,
    required: true,
  },
});

const map = ref(null);
const vectorSource = ref(null);

const initMap = () => {
  const vectorSourceInstance = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSourceInstance,
  });

  const mapInstance = new Map({
    target: "eventDetailsMap",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: fromLonLat(location),
      zoom: 4,
    }),
  });

  console.log("location", location);
  displayLocationPoint(location, vectorSourceInstance);

  map.value = mapInstance;
  vectorSource.value = vectorSourceInstance;
};

const displayLocationPoint = (lonLat, vectorSourceInstance) => {
  const point = new Feature({
    geometry: new Point(fromLonLat(lonLat)),
  });

  const pointStyle = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "blue",
      }),
    }),
  });

  point.setStyle(pointStyle);
  vectorSourceInstance.clear();
  vectorSourceInstance.addFeature(point);
};

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  map.value.setTarget(null);
});


</script>
