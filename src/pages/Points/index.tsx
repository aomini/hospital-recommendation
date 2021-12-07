import React from "react";
import instance from "src/utils/axios";
import DataTable from "src/components/DataTable";
import Actions from "./components/Actions";
import AddNew from "./components/AddNew";

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
      },
      { name: "Name" },
      { name: "Latitude" },
      { name: "Longitude" },
      {
        name: "Actions",
        cell(row: IResponse) {
          return (
            <Actions
              edit={row.edit || false}
              handleEdit={() => handleRowEdit(row)}
              handleDone={() => handleRowDone()}
              handleDelete={() => handleRowDelete(row)}
              handleClose={() => handleRowClose(row)}
            />
          );
        },
      },
    ];
  };

  const fetchPoints = () => {
    instance.get("/point").then((res: any) => {
      setPoints((points) => ({
        ...points,
        ...res,
      }));
    });
  };

  const handleRowEdit = (row: IResponse) => {
    setPoints((points: IPoint) => ({
      ...points,
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

  const handleRowDone = () => {};

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
      .then(() => {
        setPoints(
          (point: IPoint): IPoint => ({
            ...point,
            values,
            data: {
              ...point.data,
              count: point.data.count + 1,
              rows: [...point.data.rows],
            },
          })
        );
      })
      .catch(() => {});
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
