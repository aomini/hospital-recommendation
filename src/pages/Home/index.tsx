import * as React from "react";
import { format } from "date-fns";
import { Link, Switch, Route } from "react-router-dom";
import AuthLayout from "src/layout/AuthLayout";
import instance from "src/utils/axios";
import DataTable from "src/components/DataTable";
import { H1 } from "src/components/Typography";
import Tabs from "./components/Tabs";
import { IconButton, PrimaryButton } from "src/components/Button";
import EditIcon from "src/assets/icons/EditIcon";
import Edit from "./Edit";

const columns = [
  {
    name: "SN",
    cell: (_, index) => index + 1,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => "Hospital-" + row.id,
  },
  {
    name: "Significance",
    selector: (row) => row.significance,
    cell: (row) => (row.significance ? "significance" : "Not significance"),
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "Created At",
    cell: (row) => format(new Date(row.created_at), "MMM-dd-yyyy, hh:mm aa"),
  },
  {
    name: "Updated At",
    cell: (row) => format(new Date(row.updated_at), "MMM-dd-yyyy, hh:mm aa"),
  },
  {
    name: "Actions",
    width: "150px",
    cell: (row) => (
      <Link to={`/hospital/edit/${row.id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
    ),
  },
];

const Home = () => {
  const [hospitalData, setHospitalData] = React.useState({
    rows: [],
    count: 0,
  });

  const [activeTabName, setActiveTabName] =
    React.useState<string>("auto-draft");

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

  const handleClick = (tab) => {
    setActiveTabName(tab);
  };

  const handleAdd = () => {
    instance
      .post("/hospitals")
      .then((res) => {
        getHospitalList();
      })
      .catch();
  };
  return (
    <AuthLayout>
      <div className="grid gap-2">
        <H1 className="mt-4 font-medium">Hospitals</H1>
        <div className="flex justify-between items-center">
          <Tabs activeTabName={activeTabName} handleClick={handleClick} />
          <PrimaryButton onClick={handleAdd}>Add hospital</PrimaryButton>
        </div>
        <DataTable columns={columns} data={hospitalData.rows} />
      </div>
    </AuthLayout>
  );
};

export default Home;
