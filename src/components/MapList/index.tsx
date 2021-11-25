import React from "react";
import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TransferWithinAStationOutlinedIcon from "@mui/icons-material/TransferWithinAStationOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import NatureIcon from "@mui/icons-material/Nature";

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
      {items.slice(0, 10).map((item: any, index) => {
        const {
          id,
          name_of_hospital: name,
          address,
          phone_number,
          website,
          distance_from_airport,
          distance_from_koteshwor,
          distance_from_sanga,
          distance_from_thankot,
        } = item;
        return (
          <React.Fragment key={id}>
            <ListItem
              alignItems="center"
              onMouseEnter={() => onHandleHover(index)}
              onMouseLeave={() => onHandleHover(null)}
            >
              <div style={{ flex: 1 }}>
                <ListItemText
                  primary={name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {address}

                        <div style={{ color: "#7b7b7b" }}>
                          {phone_number ? phone_number : "-"}
                        </div>
                        {website ? (
                          <a
                            href={website}
                            style={{ display: "block", color: "#2366fe" }}
                          >
                            Visit website
                          </a>
                        ) : null}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <TableContainer component={Paper}>
                  <Table>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600 }}>Airport</TableCell>
                      <TableCell style={{ fontWeight: 600 }}>
                        Koteshwor
                      </TableCell>
                    </TableRow>
                    <TableBody>
                      <TableRow>
                        <TableCell>{distance_from_airport}</TableCell>
                        <TableCell>{distance_from_koteshwor}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600 }}>Sanga</TableCell>
                      <TableCell style={{ fontWeight: 600 }}>Thankot</TableCell>
                    </TableRow>
                    <TableBody>
                      <TableRow>
                        <TableCell>{distance_from_sanga}</TableCell>
                        <TableCell>{distance_from_thankot}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};
export default MapList;
