import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Attribution, defaults } from "ol/control";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import MVT from "ol/format/MVT";
import Point from "ol/geom/Point";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorTileLayer from "ol/layer/VectorTile";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import { fromLonLat, toLonLat } from "ol/proj";
import BingMaps from "ol/source/BingMaps";
import OSM from "ol/source/OSM";
import TileJson from "ol/source/TileJSON";
import VectorSource from "ol/source/Vector";
import VectorTile from "ol/source/VectorTile";
import XYZ from "ol/source/XYZ";
import { Fill, Icon, Stroke, Style } from "ol/style";
import View from "ol/View";
import useQuery from "src/hooks/useQuery";
import { StreetMapProps } from "src/types/StreetMapTypes";
import serverAxios from "../../utils/axios";

const allLayers = [
  {
    name: "OSMStandard",
    img: "/osm-standard.png",
    label: "OSM Standard",
  },
  {
    name: "OSMHumanitarian",
    img: "/map-carto.webp",
    label: "OSM Humanitarian",
  },
  {
    name: "BingMaps",
    img: "/map-osm-bright.webp",
    label: "Bing Maps",
  },
  {
    name: "CartoDB",
    img: "/map-osm-liberty.webp",
    label: "Carto DB",
  },
  {
    name: "positron",
    img: "/map-positron.png",
    label: "Positron",
  },
  {
    name: "VectorTile",
    img: "/map-toner.webp",
    label: "Vector Tile",
  },
];

const fetchIsoline = async ({ lat, lon, time = 10 }) => {
  return axios.get("https://api.geoapify.com/v1/isoline", {
    params: {
      lat,
      lon,
      type: "time",
      mode: "drive",
      range: time * 30,
      apiKey: "eeb4c8f5a97e455c98fa0c08e0495ef8",
    },
  });
};

/** Iso line style */
const isolineStyle = new Style({
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
    // url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
  }),
  visible: true,
});
openStreetMapStandardLayer.set("title", "OSMStandard");

// Open Street Map Humanitarian
//humanitarian
const openStreetMapHumanitarian = new TileLayer({
  source: new OSM({
    url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  }),
  visible: false,
});
openStreetMapHumanitarian.set("title", "OSMHumanitarian");

// Bing maps
const bingmapsBaseLayer = new TileLayer({
  source: new BingMaps({
    key: "ApLmsAhD2fRQfMRDbtpyXH89Au9WMjdZQ34ySMNiwptesntOrDVATuH5hC45KXk6",
    imagerySet: "Road",
  }),
  visible: false,
});
bingmapsBaseLayer.set("title", "BingMaps");

// cartodb
// provider carto.com
//@reference https://github.com/CartoDB/basemap-styles
const cartoDBBaseLayer = new TileLayer({
  source: new XYZ({
    url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
  }),
  visible: false,
});
cartoDBBaseLayer.set("title", "CartoDB");

// positron
const positronLayer = new TileLayer({
  source: new TileJson({
    url: "https://api.maptiler.com/maps/positron/tiles.json?key=1osjkWprx6Puy9Pnocom",
    tileSize: 512,
    crossOrigin: "anonymous",
  }),
  visible: false,
});
positronLayer.set("title", "positron");

// Base vector layers
// Vector tile layer open street map
const openStreetMapVectorTile = new VectorTileLayer({
  source: new VectorTile({
    url: "https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=1osjkWprx6Puy9Pnocom",
    format: new MVT(),
    attributions:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }),
  visible: false,
});
openStreetMapVectorTile.set("title", "VectorTile");

const StreepMap: React.FC<StreetMapProps> = ({ hospitals }) => {
  const [mapInstance, setMap] = React.useState<any>(null);
  const [baseLayerGroup, setBaseLayerGroup] = React.useState<any>(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = React.useState(0);
  const [logging, setLogging] = React.useState(false);
  const query = useQuery();

  React.useEffect(() => {
    if (!hospitals.length || mapInstance) {
      return;
    }

    const significantHospitals = query.get("hospitals")
      ? // @ts-ignore
        JSON.parse(query.get("hospitals"))
      : [];

    const map = init();

    // get zoom
    const queryZoom = query.get("zoom");
    if (queryZoom) {
      map
        .getView()
        .setZoom((map.getView().getZoom() || 12) + parseInt(queryZoom));
    }

    // Single hospital
    const hospital = query.get("hospital")
      ? [parseInt(query.get("hospital") as string)]
      : [];

    setMap(map);
    /** Layer group */
    const baseLayerGroup = new LayerGroup({
      layers: [
        openStreetMapStandardLayer,
        openStreetMapHumanitarian,
        bingmapsBaseLayer,
        cartoDBBaseLayer,
        positronLayer,

        openStreetMapVectorTile,
      ],
    });
    setBaseLayerGroup(baseLayerGroup);
    map.addLayer(baseLayerGroup);

    /** Create a features for a hospital point marker */
    const filteredHospitals = hospitals
      .filter((x) =>
        significantHospitals.length ? significantHospitals.includes(x.id) : true
      )
      .filter((y) => (hospital.length ? hospital.includes(y.id) : true));

    const markerFeatures = filteredHospitals.map((x) => {
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

    /** Plot isoline */
    const isoline = query.get("isoline")
      ? JSON.parse(query.get("isoline") as string)
      : false;
    const time = query.get("time") ? parseInt(query.get("time") as string) : 10;
    if (isoline) {
      for (const data of filteredHospitals) {
        const { latitude: lat, longitude: lng } = data;
        fetchIsoline({ lat: lat, lon: lng, time }).then((resp) => {
          const { data } = resp;
          const geojsonObject = JSON.stringify(data);

          const isolineVectorSource = new VectorSource({
            features: new GeoJSON({
              featureProjection: "EPSG:3857",
            }).readFeatures(geojsonObject),
          });

          const isolineVectorLayer = new VectorLayer({
            source: isolineVectorSource,
            zIndex: 1,
            style: isolineStyle,
            //@ts-ignore
            title: "isolineLayer",
          });

          map.addLayer(isolineVectorLayer);
        });
      }
    }

    map.on("click", (evt) => {
      container!.style.display = "block";
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feat) => {
        return feat;
      });

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
  }, [hospitals, query]);

  const handleLayerSwitch = (name, index) => {
    setSelectedLayerIndex(index);

    baseLayerGroup.getLayers().forEach((element) => {
      const baseLayerName = element.get("title");
      element.setVisible(baseLayerName === name);
    });
  };

  const exportMap = () => {
    const map = mapInstance;
    map.once("rendercomplete", () => {
      const mapCanvas: HTMLCanvasElement = document.createElement("canvas");
      const size = map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        document.querySelectorAll(".ol-layer canvas"),
        (canvas) => {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode.style.opacity;
            mapContext!.globalAlpha = opacity === "" ? 1 : Number(opacity);
            const transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            const matrix = transform
              .match(/^matrix\(([^(]*)\)$/)[1]
              .split(",")
              .map(Number);
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            mapContext!.drawImage(canvas, 0, 0);
          }
        }
      );
      // @ts-ignore
      mapCanvas.toBlob(
        (blob) => {
          if (blob) {
            // pass file name on query as ?file=somename
            const file = new File([blob], `${query.get("file")}.png`);
            const formData = new FormData();
            formData.append("file", file);
            serverAxios.post("/map/upload", formData);
          }
        },
        "image/png",
        1
      );
      // if (navigator.msSaveBlob) {
      //   // link download attribute does not work on MS browsers
      //   navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
      // } else {
      //   const link = document.getElementById('image-download');
      //   link.href = mapCanvas.toDataURL();
      //   link.click();
      // }
    });
    map.renderSync();
  };

  const logPoints = (e) => {
    const [lon, lat] = toLonLat(e.coordinate);
    alert(`here's your longitude & latitude ${lat},${lon}`);
  };

  const turnOnCoordinates = () => {
    setLogging(true);
    mapInstance.on("click", logPoints);
  };

  return (
    <div>
      <div className="h-screen w-screen" id="map" />

      <div className="layers-container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <Button variant="contained" id="export" onClick={exportMap}>
            export
          </Button>
          {!logging && (
            <Button variant="outlined" onClick={turnOnCoordinates}>
              Coordinate logging
            </Button>
          )}
        </div>

        {allLayers.map((x, i) => (
          <Tooltip key={i} title={x.label} placement="right">
            <img
              key={x.name}
              alt={x.label}
              className={i === selectedLayerIndex ? "active" : ""}
              src={x.img}
              height="50"
              width="50"
              onClick={() => handleLayerSwitch(x.name, i)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
export default StreepMap;
