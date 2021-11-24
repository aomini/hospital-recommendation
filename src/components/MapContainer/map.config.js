const mapConfigs = {
  DEFAULT_MAP_OPTIONS: {
    scrollWheel: false,
    mapTypeControl: false,
    fullScreenControl: false,
    streetViewControl: false,
  },
  DEFAULT_CENTER: { lat: -33.847927, lng: 150.6517938 },
  DEFAULT_ZOOM: 4,
  MARKER_SIZE: 35,
  PIXEL_OFFSET: {
    MARKER: {
      X: 0,
      Y: -35,
    },
  },
  DIRECTIONS_OPTIONS: { suppressMarkers: true, preserveViewport: true },
};
export default mapConfigs;
