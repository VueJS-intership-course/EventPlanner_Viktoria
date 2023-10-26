<template>
  <div id="map" style="height: 700px; width: 800px"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill } from "ol/style";
import { fromLonLat, toLonLat } from "ol/proj";
import { useEventStore } from "../store/eventStore";

const eventStore = useEventStore();

const map = ref(null);
const vectorSource = ref(null);

const initMap = () => {
  const vectorSourceInstance = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSourceInstance,
  });

  const mapInstance = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  });

  mapInstance.on("click", (event) => {
    const lonLat = toLonLat(event.coordinate);
    handleMapClick(lonLat, vectorSourceInstance);
  });

  map.value = mapInstance;
  vectorSource.value = vectorSourceInstance;
};

const handleMapClick = (lonLat, vectorSourceInstance) => {
  const point = new Feature({
    geometry: new Point(fromLonLat(lonLat)),
  });

  const pointStyle = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: "black",
      }),
    }),
  });

  point.setStyle(pointStyle);
  vectorSourceInstance.clear();
  vectorSourceInstance.addFeature(point);

  const [lon, lat] = lonLat;
  eventStore.setNewEventLocation(lon, lat);
  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
};

onMounted(() => {
  initMap();
});
</script>
