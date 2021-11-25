import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import MapContainer from "../MapContainer/index";

const MapWrapper = styled(Box)`
  position: sticky;
  top: 0;
  height: 100vh;
`;

const MapElement = styled(Box)`
  .gm-ui-hover-effect {
    display: none !important;
  }
  .gm-style .gm-style-iw-t::after {
    display: none;
  }
  .gm-style-iw.gm-style-iw-c {
    padding: 0;
    .gm-style-iw-d {
      overflow: hidden !important;
    }
  }
  .gmnoprint.gm-bundled-control.gm-bundled-control-on-bottom {
    top: 0;
  }
`;

const Map = (props) => (
  <MapWrapper>
    <MapContainer
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_KEY}`}
      loadingElement={<Box height="100%" />}
      containerElement={<Box height="100%" />}
      mapElement={<MapElement height="100%" />}
      {...props}
    />
  </MapWrapper>
);
export default Map;
