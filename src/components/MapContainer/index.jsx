import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  InfoWindow,
  Marker,
} from "react-google-maps";
import OutsideClickHandler from "react-outside-click-handler";
import mapConfigs from "./map.config";
import InfoWindowContent from "../InfoWindow";

const {
  MARKER_SIZE,
  DEFAULT_ZOOM,
  DEFAULT_CENTER,
  DEFAULT_MAP_OPTIONS,
  PIXEL_OFFSET,
  // DIRECTIONS_OPTIONS,
} = mapConfigs;

const MapContainer = ({ markers, setOrigin, hoveredOriginId }) => {
  const mapRef = React.useRef(null);
  // const [selectedOriginId, setSelectedOriginId] = React.useState(null);
  const [isClickOutsideDisabled, setIsClickOutsideDisabled] =
    React.useState(false);

  const selectedData = hoveredOriginId
    ? markers.find(({ id }) => hoveredOriginId === id)
    : null;
  // const selectedData = selectedOriginId ? markers[selectedOriginId] : null;

  React.useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ latitude: lat, longitude: lng }) => {
      bounds.extend(new window.google.maps.LatLng(lat, lng));
    });
    mapRef.current.fitBounds(bounds);
  }, []);

  // React.useEffect(() => {
  //   if (hoveredOriginId) {
  //     setSelectedOriginId(hoveredOriginId);
  //   }
  // }, [hoveredOriginId]);

  const handleClick = (originID) => {
    setOrigin(originID);
    const el = document.querySelector(`.map-list-id-${originID}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={DEFAULT_CENTER}
      defaultOptions={{ ...DEFAULT_MAP_OPTIONS }}
      onDragStart={() => setIsClickOutsideDisabled(true)}
      onDragEnd={() => setIsClickOutsideDisabled(false)}
    >
      {markers.map(
        ({ id, address, name, latitude: lat, longitude: lng }, index) => (
          <Marker
            key={index}
            position={{ lat, lng }}
            title={name}
            name={name}
            onClick={() => handleClick(id)}
          />
        )
      )}

      {selectedData && (
        <InfoWindow
          position={{
            lat: selectedData.latitude,
            lng: selectedData.longitude,
          }}
          options={{
            pixelOffset: new window.google.maps.Size(
              PIXEL_OFFSET.MARKER.X,
              PIXEL_OFFSET.MARKER.Y
            ),
          }}
        >
          <OutsideClickHandler
            onOutsideClick={() => {
              setOrigin(null);
            }}
            disabled={isClickOutsideDisabled}
          >
            <InfoWindowContent {...selectedData} />
          </OutsideClickHandler>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
export default withScriptjs(withGoogleMap(MapContainer));
