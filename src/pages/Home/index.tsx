import * as React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthLayout from "src/layout/AuthLayout";
import instance from "src/utils/axios";
import EditIcon from "src/assets/icons/EditIcon";
import DataTable from "src/components/DataTable";
import Tabs from "./components/Tabs";
import { H1 } from "src/components/Typography";
import { IconButton, StyledButton } from "src/components/Button";
import { Switch } from "@mui/material";

const getFieldValue = (list, key) =>
  list.HospitalDetails.find((x) => x.FieldItem.code === key)?.value?.value ||
  "";

const Home = () => {
  const [hospitalData, setHospitalData] = React.useState({
    rows: [],
    count: 0,
  });
  const history = useHistory();

  const [activeTabName, setActiveTabName] = React.useState<string>("published");

  const getHospitalList = React.useCallback(() => {
    instance
      .get(`/hospitals`, {
        params: {
          status: activeTabName,
          page: 1,
        },
      })
      .then((res) => {
        setHospitalData((prev) => ({ ...prev, ...res }));
      })
      .catch(() => {});
  }, [activeTabName]);

  React.useEffect(() => {
    getHospitalList();
  }, [getHospitalList]);

  const columns = [
    {
      name: "SN",
      cell: (_, index) => index + 1,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => getFieldValue(row, "name_of_hospital"),
    },

    {
      name: "Address",
      selector: (row) => getFieldValue(row, "address"),
    },
    {
      name: "Phone",
      selector: (row) => getFieldValue(row, "phone_number"),
    },

    {
      name: "Significance",
      selector: (row) => row.significance,
      cell: (row) => (
        <Switch
          checked={row.significance}
          onChange={() => onSignificanceChange(row)}
        />
      ),
    },

    {
      name: "Actions",
      width: "150px",
      cell: (row) => (
        <Link to={`/hospital/edit/${row.id}`}>
          <IconButton title="edit">
            <EditIcon />
          </IconButton>
        </Link>
      ),
    },
  ];

  const onSignificanceChange = (row) => {
    console.log(row);
  };

  const handleClick = (tab) => {
    setActiveTabName(tab);
  };

  const handleAdd = () => {
    instance
      .post("/hospitals")
      .then((res) => {
        history.push(`/hospital/edit/${res.data.id}`);
      })
      .catch();
  };
  return (
    <div>
      <div className="grid gap-2">
        <H1 className="mt-4 font-medium">Hospitals</H1>
        <div className="flex justify-between items-center">
          <Tabs activeTabName={activeTabName} handleClick={handleClick} />
          <StyledButton success bold onClick={handleAdd}>
            Add hospital
          </StyledButton>
        </div>
        <DataTable columns={columns} data={hospitalData.rows} />
      </div>
    </div>
  );
};

export default Home;
