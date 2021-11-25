import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const InfoWindow = ({
  name_of_hospital: Name,
  address: Address,
  phone_number: Phone,
  distance_from_airport,
  distance_from_koteshwor,
  distance_from_sanga,
  distance_from_thankot,
}) => {
  return (
    <Card sx={{ maxWidth: 375, minWidth: 300, background: "white" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Name}
          </Typography>
          <Typography
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
            variant="body2"
            color="text.secondary"
          >
            <AddLocationIcon fontSize="small" /> {Address}
          </Typography>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            variant="body2"
            color="text.secondary"
          >
            <PermPhoneMsgIcon fontSize="small" /> {Phone ? Phone : "-"}
          </Typography>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Airport</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Koteshwor</TableCell>
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
          {/* <SummaryDiv>
            <SummaryDiv gap={0} style={{ marginTop: 0 }}>
              <AirplanemodeActiveOutlinedIcon fontSize="small" /> ----
              <TransferWithinAStationOutlinedIcon fontSize="small" />
            </SummaryDiv>
            {rest["Walking distance from Airport"]},{" "}
            {rest["Walking duration from Airport"]}
          </SummaryDiv>
          <SummaryDiv>
            <SummaryDiv gap={0} style={{ marginTop: 0 }}>
              <AirplanemodeActiveOutlinedIcon fontSize="small" /> ----
              <AirportShuttleOutlinedIcon fontSize="small" />
            </SummaryDiv>
            {rest["Driving distance from Airport"]},{" "}
            {rest["Driving duration from Airport"]}
          </SummaryDiv> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default InfoWindow;
