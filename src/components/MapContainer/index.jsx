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

const MapContainer = ({ markers, hoveredOriginId }) => {
  const mapRef = React.useRef(null);
  const [selectedOriginId, setSelectedOriginId] = React.useState(null);
  const [isClickOutsideDisabled, setIsClickOutsideDisabled] =
    React.useState(false);

  // const selectedData = data.find(({ id }) => selectedOriginId === id);
  const selectedData = selectedOriginId ? markers[selectedOriginId] : null;

  React.useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ latitude: lat, longitude: lng }) => {
      bounds.extend(new window.google.maps.LatLng(lat, lng));
    });
    mapRef.current.fitBounds(bounds);
  }, []);

  React.useEffect(() => {
    if (hoveredOriginId) {
      setSelectedOriginId(hoveredOriginId);
    }
  }, [hoveredOriginId]);

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
        ({ address, name, latitude: lat, longitude: lng }, index) => (
          <Marker
            key={index}
            position={{ lat, lng }}
            title={name}
            name={name}
            onClick={() => setSelectedOriginId(index)}
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
              setSelectedOriginId(null);
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
