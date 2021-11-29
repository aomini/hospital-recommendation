import * as React from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import instance from "src/utils/axios";
import EditIcon from "src/assets/icons/EditIcon";
import DataTable from "src/components/DataTable";
import Tabs from "./components/Tabs";
import { H1 } from "src/components/Typography";
import { IconButton, StyledButton } from "src/components/Button";
import { Pagination, PaginationItem, Switch } from "@mui/material";

const LIMIT = 10;

const getFieldValue = (list, key) =>
  list.HospitalDetails.find((x) => x.FieldItem.code === key)?.value?.value ||
  "";

const Home = () => {
  const [hospitalData, setHospitalData] = React.useState<any>({
    rows: [],
    count: 0,
  });
  const history = useHistory();
  const location = useLocation();

  const [activeTabName, setActiveTabName] = React.useState<string>("published");

  const getHospitalList = React.useCallback(() => {
    const page = new URLSearchParams(location.search).get("page") || 1;

    instance
      .get(`/hospitals`, {
        params: {
          status: activeTabName,
          page,
        },
      })
      .then((res) => {
        setHospitalData((prev) => ({ ...prev, ...res }));
      })
      .catch(() => {});
  }, [activeTabName, location.search]);

  React.useEffect(() => {
    getHospitalList();
  }, [getHospitalList]);

  const columns = () => {
    const page = new URLSearchParams(location.search).get("page");
    const sn = (index) => (parseInt(page || "1") - 1) * LIMIT + index + 1;
    return [
      {
        name: "SN",
        cell: (_, index) => <span>{sn(index)}</span>,
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
  };

  const onSignificanceChange = (row) => {
    const significance = !row.significance;
    console.log({ row, hospitalData });

    instance
      .patch(`/hospitals/${row.id}/significance`, {
        significance,
      })
      .then((res) => {
        setHospitalData((prev) => ({
          ...prev,
          rows: prev.rows.map((x) =>
            x.id === row.id ? { ...x, significance } : x
          ),
        }));
      })
      .catch((err) => {});
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
        <DataTable responsive columns={columns()} data={hospitalData.rows} />
        <div className="my-6 grid justify-center">
          <Pagination
            color="secondary"
            count={Math.ceil(hospitalData.count / LIMIT)}
            renderItem={(item) => {
              if (item.page)
                return (
                  <Link to={`${location.pathname}?page=${item.page}`}>
                    <PaginationItem {...item} />
                  </Link>
                );
              else return <PaginationItem {...item} />;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
