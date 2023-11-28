<template>
  <div>
    <div id="eventDetailsMap" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill } from "ol/style";
import Icon from "ol/style/Icon";
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

  displayLocationPoint(location, vectorSourceInstance);

  map.value = mapInstance;
  vectorSource.value = vectorSourceInstance;
};

const displayLocationPoint = (lonLat, vectorSourceInstance) => {
  const point = new Feature({
    geometry: new Point(fromLonLat(lonLat)),
  });

  const pointStyle = new Style({
    image: new Icon({
      src: "https://firebasestorage.googleapis.com/v0/b/event-manager-1329.appspot.com/o/pointer.png?alt=media&token=3ef15299-f3cc-4522-a465-9a0cbc81483a",
      anchor: [0.5, 1],
      scale: 0.1,
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
