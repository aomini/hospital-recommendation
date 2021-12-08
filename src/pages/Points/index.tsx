import * as React from "react";
import { TextField } from "@mui/material";
import instance from "src/utils/axios";
import DataTable from "src/components/DataTable";
import Actions from "./components/Actions";
import AddNew from "./components/AddNew";
import { notifyError, notifySuccess } from "src/utils/notify";

type Values = {
  name: string;
  lat: string;
  lng: string;
};

interface IResponse {
  id: Number;
  name: string;
  lat: string;
  lng: string;
  edit?: boolean;
}

type IPoint = {
  values: Values;
  edit: Values;
  data: {
    count: number;
    rows: IResponse[];
  };
};

const values: Values = {
  name: "",
  lat: "",
  lng: "",
};

const initialData = {
  values,
  edit: values,
  data: {
    count: 0,
    rows: [],
  },
};

const Points = () => {
  const [points, setPoints] = React.useState<IPoint>(initialData);

  React.useEffect(() => {
    fetchPoints();
  }, []);

  const columns = () => {
    return [
      {
        name: "SN",
        cell(_, index) {
          return index + 1;
        },
        width: "100px",
      },
      {
        name: "Name",
        sortable: true,
        selector: (row) => row.name,
        cell(row) {
          return (
            <TextField
              id="name"
              name="name"
              placeholder="Name"
              size="small"
              disabled={!row.edit}
              value={row.edit ? points.edit.name : row.name}
              onChange={handleRowChange}
            />
          );
        },
      },
      {
        name: "Latitude",
        sortable: true,
        selector: (row) => row.lat,
        cell(row) {
          return (
            <TextField
              id="lat"
              name="lat"
              placeholder="Latitude"
              type="number"
              size="small"
              color="primary"
              disabled={!row.edit}
              value={row.edit ? points.edit.lat : row.lat}
              onChange={handleRowChange}
            />
          );
        },
      },
      {
        name: "Longitude",
        sortable: true,
        selector: (row) => row.lng,
        cell(row) {
          return (
            <TextField
              id="lng"
              name="lng"
              placeholder="Longitude"
              type="number"
              size="small"
              disabled={!row.edit}
              value={row.edit ? points.edit.lng : row.lng}
              onChange={handleRowChange}
            />
          );
        },
      },
      {
        name: "Actions",
        cell(row: IResponse) {
          return (
            <Actions
              edit={!!row.edit}
              handleEdit={() => handleRowEdit(row)}
              handleDone={() => handleRowDone(row)}
              handleDelete={() => handleRowDelete(row)}
              handleClose={() => handleRowClose(row)}
            />
          );
        },
      },
    ];
  };

  const fetchPoints = () => {
    instance.get("/point").then((res) => {
      setPoints(
        (points: IPoint): IPoint => ({
          ...points,
          ...res,
        })
      );
    });
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setPoints((points: IPoint) => ({
      ...points,
      edit: {
        ...points.edit,
        [name]: value,
      },
    }));
  };

  const handleRowEdit = (row: IResponse) => {
    const { name, lat, lng } = row;
    setPoints((points: IPoint) => ({
      ...points,
      edit: {
        name,
        lng,
        lat,
      },
      data: {
        ...points.data,
        rows: points.data.rows.map(
          (x: IResponse): IResponse => ({
            ...x,
            edit: x.id === row.id ? true : false,
          })
        ),
      },
    }));
  };

  const handleRowDone = (row) => {
    instance
      .put(`/point/${row.id}`, {
        ...row,
        ...points.edit,
      })
      .then(() => {
        setPoints((points: IPoint) => ({
          ...points,
          edit: values,
          data: {
            ...points.data,
            rows: points.data.rows.map((x) =>
              x.id === row.id
                ? {
                    ...row,
                    ...points.edit,
                    edit: false,
                  }
                : x
            ),
          },
        }));
        notifySuccess("Successfully updated");
      })
      .catch((err) => {
        notifyError("Failed to update");
        console.log(err);
      });
  };

  const handleRowDelete = (row: IResponse) => {
    instance
      .delete(`/point/${row.id}`)
      .then(() => {
        setPoints(
          (points: IPoint): IPoint => ({
            ...points,
            data: {
              ...points.data,
              count: points.data.count - 1,
              rows: points.data.rows.filter(
                (x: IResponse): boolean => x.id !== row.id
              ),
            },
          })
        );
      })
      .catch(() => {});
  };

  const handleRowClose = (row: IResponse) => {
    setPoints(
      (points: IPoint): IPoint => ({
        ...points,
        data: {
          ...points.data,
          rows: points.data.rows.map(
            (x: IResponse): IResponse => ({
              ...x,
              edit: row.id === x.id ? false : x.edit,
            })
          ),
        },
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoints((points) => ({
      ...points,
      values: { ...points.values, [name]: value },
    }));
  };

  const handleAdd = () => {
    const payload = points.values;
    instance
      .post("/point", payload)
      .then((res: { data: IResponse }) => {
        setPoints(
          (point: IPoint): IPoint => ({
            ...point,
            values,
            data: {
              ...point.data,
              count: point.data.count + 1,
              rows: [...point.data.rows, res.data],
            },
          })
        );
        notifySuccess("Successfully created");
      })
      .catch(() => {
        notifyError("Failed to create");
      });
  };

  return (
    <div>
      <div className="grid gap-4">
        <AddNew
          values={points.values}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
        <DataTable data={points.data.rows} columns={columns()} />
      </div>
    </div>
  );
};

export default Points;
