import React from "react";
import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TransferWithinAStationOutlinedIcon from "@mui/icons-material/TransferWithinAStationOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";

export const SummaryDiv = styled.div`
  color: #5e5e5e;
  display: flex;
  align-items: center;
  gap: ${(props) => ("gap" in props ? props.gap : "5px")};
  font-size: 14px;
  margin-top: 10px;
`;

const MapList = ({ items = [], onHandleHover }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {items.slice(0, 10).map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            alignItems="center"
            onMouseEnter={() => onHandleHover(index)}
            onMouseLeave={() => onHandleHover(null)}
          >
            <div style={{ flex: 1 }}>
              <ListItemText
                primary={item.Name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item["Address"]}
                      <div style={{ color: "#7b7b7b" }}>
                        {item["Phone"] ? item["Phone"] : "-"}
                      </div>
                    </Typography>
                  </React.Fragment>
                }
              />
              <SummaryDiv></SummaryDiv>
              <SummaryDiv>
                <SummaryDiv gap={0} style={{ marginTop: 0 }}>
                  <AirplanemodeActiveOutlinedIcon fontSize="small" /> ----
                  <TransferWithinAStationOutlinedIcon fontSize="small" />
                </SummaryDiv>
                {item["Walking distance from Airport"]},{" "}
                {item["Walking duration from Airport"]}
              </SummaryDiv>
              <SummaryDiv>
                <SummaryDiv gap={0} style={{ marginTop: 0 }}>
                  <AirplanemodeActiveOutlinedIcon fontSize="small" /> ----
                  <AirportShuttleOutlinedIcon fontSize="small" />
                </SummaryDiv>
                {item["Driving distance from Airport"]},{" "}
                {item["Driving duration from Airport"]}
              </SummaryDiv>
            </div>
            {/* <img
              src={item.icon}
              alt={item.Nitle}
              width="120"
              style={{ marginLeft: "10px" }}
            /> */}
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};
export default MapList;
