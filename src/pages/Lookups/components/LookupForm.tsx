import React from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PrimaryButton } from "src/components/Button";
import { H1 } from "src/components/Typography";
import instance from "src/utils/axios";
import { notifyError, notifySuccess } from "src/utils/notify";

const Input = (props) => (
  <input autoComplete="off" className="input-focus" {...props} />
);

const initialValue = {
  label: "",
  value: "",
};

const initialEditValue = {
  index: null,
  row: { id: null },
  data: {
    label: "",
    value: "",
  },
};

const LookupForm = ({ setActiveId }) => {
  const [data, setData] = React.useState<any>({});
  const [newData, setNewData] = React.useState({
    data: initialValue,
  });
  const [editValue, setEditValue] = React.useState({
    ...initialEditValue,
  });
  const { id } = useParams();

  React.useEffect(() => {
    return () => {
      setActiveId(null);
    };
  }, [setActiveId]);

  const getValues = React.useCallback(() => {
    instance
      .get(`/lookup-values/${id}`)
      .then((values) => {
        setData(values);
      })
      .catch(() => {});
    setEditValue((prev) => ({ ...prev, ...initialEditValue }));
    setActiveId(id);
  }, [id, setActiveId]);

  React.useEffect(() => {
    getValues();
  }, [getValues]);

  const columns = [
    {
      name: "SN",
      width: "60px",
      cell: (row, index) => index + 1,
    },
    {
      name: "Label",
      cell: (row, index) => (
        <Input
          type="text"
          name="label"
          value={editValue.row.id === row.id ? editValue.data.label : row.label}
          disabled={editValue.row.id !== row.id}
          onChange={(e) =>
            editValue.row.id === row.id
              ? handleEditChange(e, row)
              : handleChange(e, row)
          }
        />
      ),
    },
    {
      name: "Values",
      cell: (row, index) => (
        <Input
          type="text"
          name="value"
          value={editValue.row.id === row.id ? editValue.data.value : row.value}
          disabled={editValue.row.id !== row.id}
          onChange={(e) =>
            editValue.row.id === row.id
              ? handleEditChange(e, row)
              : handleChange(e, row)
          }
        />
      ),
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div>
          {editValue.index !== null && editValue.index === index ? (
            <div>
              <PrimaryButton onClick={() => handleSave(row)}>
                Save
              </PrimaryButton>
              <PrimaryButton onClick={() => handleCancel()}>
                Cancel
              </PrimaryButton>
            </div>
          ) : (
            <div>
              <PrimaryButton onClick={() => handleEdit(row, index)}>
                Edit
              </PrimaryButton>
              <PrimaryButton onClick={() => handleDelete(row)}>
                Delete
              </PrimaryButton>
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleSave = (row) => {
    const { label, value } = editValue.data;

    instance
      .put(`/lookup-values/${row.id}`, {
        label,
        value,
      })
      .then((res) => {
        setData((data) => ({
          ...data,
          LookupValues: data.LookupValues.map((values) =>
            values.id === row.id ? { ...values, label, value } : values
          ),
        }));
        setEditValue((prev) => ({
          ...prev,
          ...initialEditValue,
        }));
      })
      .catch((err) => {});
  };

  const handleEdit = (row, index) => {
    const { label, value } = row;
    setEditValue((prev) => ({
      ...prev,
      index,
      row,
      data: {
        label,
        value,
      },
    }));
  };

  const handleDelete = (row) => {
    instance
      .delete(`lookup-values/${row.id}`)
      .then((res) => {
        setData((data) => ({
          ...data,
          LookupValues: data.LookupValues.filter((x) => x.id !== row.id),
        }));
      })
      .catch(() => {});
  };

  const handleChange = (e, row) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      LookupValues: data.LookupValues.map((values) =>
        values.id === row.id ? { ...values, [name]: value } : values
      ),
    }));
  };

  const handleEditChange = (e, row) => {
    const { name, value } = e.target;
    setEditValue((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const handleCancel = () => {
    setEditValue((prev) => ({
      ...prev,
      ...initialEditValue,
    }));
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const { label, value } = newData.data;
    if (!label || !value) {
      if (!label) {
        notifyError("Label cannot be empty!");
      }
      if (!value) {
        notifyError("Value cannot be empty!");
      }

      return;
    }
    instance
      .post(`/lookup-values/${id}`, {
        ...newData.data,
      })
      .then((res) => {
        setData((data) => ({
          ...data,
          LookupValues: [...data.LookupValues, res.data],
        }));
        setNewData((data) => ({ ...data, data: initialValue }));
        notifySuccess("Created successfully!");
      })
      .catch(() => {});
  };

  return (
    <div>
      <div className="grid gap-4">
        <ToastContainer />
        <section className="bg-white p-3">
          <H1>Add New</H1>
          <form className="mt-2" onSubmit={(e) => handleCreate(e)}>
            <Input
              name="label"
              placeholder="label"
              value={newData.data.label}
              onChange={handleCreateChange}
              className="p-2 border border-gray-400 rounded-md input-focus"
            />
            <Input
              className="p-2 border border-gray-400 rounded-md mx-2 input-focus !bg-white"
              name="value"
              placeholder="value"
              value={newData.data.value}
              onChange={handleCreateChange}
            />
            <PrimaryButton className="px-3 py-2 text-gray-50 bg-green-600 hover:bg-green-700 rounded-md w-32">
              Add
            </PrimaryButton>
          </form>
        </section>
        <DataTable columns={columns} data={data.LookupValues || []} />
      </div>
    </div>
  );
};

export default LookupForm;
