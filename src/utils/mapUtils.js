import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";

export function initializeMap(targetId, centerCoordinates, zoomLevel, vectorSourceInstance) {
  const vectorLayer = new VectorLayer({
    source: vectorSourceInstance,
  });

  const mapInstance = new Map({
    target: targetId,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: fromLonLat(centerCoordinates),
      zoom: zoomLevel,
    }),
  });

  return mapInstance;
}
