import * as React from "react";
import axios from "src/utils/axios";
import styled from "styled-components";
import MapList from "src/components/MapList";
import MapComponent from "src/components/Map/Map";

const FlexContainer = styled.div`
  display: flex;
`;

const Map = () => {
  const [hospitals, setHospitals] = React.useState<any>([]);
  const [hoveredOriginId, setHoveredOriginId] = React.useState(null);

  React.useEffect(() => {
    axios.get("hospitals/basic").then((resp) => {
      setHospitals(resp)
    });
  }, []);


  return (
    <FlexContainer>
      <div style={{ flex: 1 }}>
        <MapComponent markers={hospitals} setOrigin={setHoveredOriginId} hoveredOriginId={hoveredOriginId} />
      </div>
      <div style={{ flex: 1, minWidth: 0, maxWidth: "375px" }}>
        <MapList selectedMarkerID={hoveredOriginId} items={hospitals} onHandleHover={setHoveredOriginId} />
      </div>
    </FlexContainer>
  );
};
export default Map;
