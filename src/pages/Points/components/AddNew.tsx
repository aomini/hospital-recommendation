import React from "react";
import { Button, TextField } from "@mui/material";

const AddNew = ({ values, handleChange, handleAdd }) => {
  return (
    <div className="p-4 grid gap-2 bg-gray-50 rounded shadow-md">
      <h2 className="text-gray-600 text-lg">Add new points</h2>
      <div className="grid grid-cols-4 gap-4 mb-10">
        <TextField
          id="name"
          name="name"
          label="Place name"
          size="small"
          variant="outlined"
          className="bg-gray-100"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          id="lat"
          name="lat"
          label="Latitude"
          size="small"
          variant="outlined"
          className="bg-gray-100"
          value={values.lat}
          onChange={handleChange}
        />
        <TextField
          id="lng"
          name="lng"
          label="Longitude"
          size="small"
          variant="outlined"
          className="bg-gray-100"
          value={values.lng}
          onChange={handleChange}
        />
        <Button className="max-w-max" variant="contained" onClick={handleAdd}>
          Add point
        </Button>
      </div>
    </div>
  );
};

export default AddNew;
