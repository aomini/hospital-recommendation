import React from "react";
import axios from "axios";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";

import LayerGroup from "ol/layer/Group";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";

import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";

import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke, Icon } from "ol/style";
import Point from "ol/geom/Point";

import { Attribution, defaults } from "ol/control";
import { StreetMapProps } from "src/types/StreetMapTypes";
import Overlay from "ol/Overlay";

const fetchIsoline = async ({ lat, lon }) => {
  return axios.get("https://api.geoapify.com/v1/isoline", {
    params: {
      lat,
      lon,
      type: "time",
      mode: "drive",
      range: 1000,
      apiKey: "eeb4c8f5a97e455c98fa0c08e0495ef8",
    },
  });
};

/** Iso line style */
var isolineStyle = new Style({
  stroke: new Stroke({
    color: "rgba(52, 190, 130, 1)",
    width: 3,
  }),
  fill: new Fill({
    color: "rgba(52, 190, 130, 0.2)",
  }),
});

/**
 * Elements that make up the popup.
 */
const container = document.getElementById("popup");
// const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");
const name = document.getElementById("name") as HTMLElement;
const address = document.getElementById("address") as HTMLElement;
const phone = document.getElementById("phone") as HTMLElement;
const airport = document.getElementById("airport") as HTMLElement;
const koteshwor = document.getElementById("koteshwor") as HTMLElement;
const sangha = document.getElementById("sangha") as HTMLElement;
const thankot = document.getElementById("thankot") as HTMLElement;
const website = document.getElementById("website") as HTMLElement;

// Attribution control
const attributionControl = new Attribution({
  collapsible: true,
});

/** Init map */
const init = () => {
  return new Map({
    target: "map",
    view: new View({
      center: fromLonLat([85.3284891, 27.710568]),
      zoom: 12,
    }),
    // overlays: [overlay],
    controls: defaults({ attribution: false }).extend([attributionControl]),
  });
};

/** Marker Style */
const markerStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: "/hospital.png",
  }),
});

/** Layers */
// Open Street Map Standard
const openStreetMapStandardLayer = new TileLayer({
  source: new OSM({
    url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
  }),
  visible: true,
});
openStreetMapStandardLayer.set("title", "openStreetMapStandardLayer");

const StreepMap: React.FC<StreetMapProps> = ({ hospitals }) => {
  const [mapInstance, setMap] = React.useState<any>(null);

  React.useEffect(() => {
    if (!hospitals.length || mapInstance) {
      return;
    }

    const map = init();

    setMap(map);
    /** Layer group */
    const baseLayerGroup = new LayerGroup({
      layers: [openStreetMapStandardLayer],
    });
    map.addLayer(baseLayerGroup);

    /** Create a features for a hospital point marker */
    const markerFeatures = hospitals.map((x) => {
      const { latitude: lat, longitude: lng, ...rest } = x;
      return new Feature({
        geometry: new Point(fromLonLat([lng, lat])),
        marker: true,
        lat,
        lng,
        ...rest,
      });
    });

    /** Vector source for markers */
    const markerVectorSource = new VectorSource({
      features: markerFeatures,
    });
    const markerVectorLayer = new VectorLayer({
      source: markerVectorSource,
      style: markerStyle,
      zIndex: 2,
    });
    map.addLayer(markerVectorLayer);

    map.on("click", function (evt) {
      const feature = map.forEachFeatureAtPixel(
        evt.pixel,
        function (feat, layer) {
          return feat;
        }
      );

      if (feature && feature.get("marker")) {
        const keys = [
          "address",
          "distance_from_airport",
          "distance_from_koteshwor",
          "distance_from_sanga",
          "distance_from_thankot",
          "name_of_hospital",
          "phone_number",
          "significance",
          "website",
          "lat",
          "lng",
        ];
        const data: any = keys.reduce((acc, iterator) => {
          acc[iterator] = feature.get(iterator);
          return acc;
        }, {});

        console.log(data);

        name.textContent = data.name_of_hospital;
        address.textContent = data.address;
        phone.textContent = data.phone ? data.phone : "-'";
        airport.textContent = data.distance_from_airport;
        koteshwor.textContent = data.distance_from_koteshwor;
        sangha.textContent = data.distance_from_sanga;
        thankot.textContent = data.distance_from_thankot;
        website.textContent = data.website;
        //@ts-ignore
        overlay.setPosition(feature.getGeometry()?.getCoordinates());
        // console.log(data);

        // fetchIsoline({ lat: data.lat, lon: data.lng }).then((resp) => {
        //   const { data } = resp;
        //   const geojsonObject = JSON.stringify(data);

        //   /** remove previous isoline layers */
        //   map.getLayers().forEach(function (element) {
        //     let baseLayerName = element.get("title");
        //     element.setVisible(baseLayerName !== "isolineLayer");
        //   });

        //   const isolineVectorSource = new VectorSource({
        //     features: new GeoJSON({
        //       featureProjection: "EPSG:3857",
        //     }).readFeatures(geojsonObject),
        //   });

        //   const isolineVectorLayer = new VectorLayer({
        //     source: isolineVectorSource,
        //     zIndex: 1,
        //     style: isolineStyle,
        //     //@ts-ignore
        //     title: "isolineLayer",
        //   });

        //   map.addLayer(isolineVectorLayer);
        // });
      }
    });

    // Overlay
    const overlay = new Overlay({
      element: container || undefined,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
      offset: [0, -15],
    });

    map.addOverlay(overlay);

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    if (closer) {
      closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
    }
  }, [hospitals]);

  return <div className="h-screen w-screen" id="map"></div>;
};
export default StreepMap;
