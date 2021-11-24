import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import TransferWithinAStationOutlinedIcon from "@mui/icons-material/TransferWithinAStationOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import { SummaryDiv } from "../MapList";

const InfoWindow = ({ Name, Address, Phone, ...rest }) => {
  return (
    <Card sx={{ maxWidth: 375, minWidth: 300 }}>
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
            }}
            variant="body2"
            color="text.secondary"
          >
            <PermPhoneMsgIcon fontSize="small" /> {Phone ? Phone : "-"}
          </Typography>
          <SummaryDiv>
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
          </SummaryDiv>
          <Typography
            style={{ marginTop: 10, color: "#bababa" }}
            variant="body2"
            color="text.secondary"
          >
            hospital, establishment
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};
export default InfoWindow;
