const mapConfigs = {
  DEFAULT_MAP_OPTIONS: {
    scrollWheel: false,
    mapTypeControl: false,
    fullScreenControl: false,
    streetViewControl: false,
  },
  DEFAULT_CENTER: { lat: 27.709094, lng: 85.32724 },
  DEFAULT_ZOOM: 5,
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
