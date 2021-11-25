import React from "react";
import styled from "styled-components";

import MapList from "src/components/MapList";
import MapComponent from "src/components/Map/Map";
import hospitals from "./hospitals";

const FlexContainer = styled.div`
  display: flex;
`;

const Map = () => {
  const [hoveredOriginId, setHoveredOriginId] = React.useState(null);

  return (
    <FlexContainer>
      <div style={{ flex: 1 }}>
        <MapComponent markers={hospitals} hoveredOriginId={hoveredOriginId} />
      </div>
      <div style={{ flex: 1, minWidth: 0, maxWidth: "375px" }}>
        <MapList items={hospitals} onHandleHover={setHoveredOriginId} />
      </div>
    </FlexContainer>
  );
};
export default Map;
