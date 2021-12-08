import React from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Actions = ({
  edit = false,
  handleEdit,
  handleDone,
  handleDelete,
  handleClose,
}) => {
  return (
    <div className="flex gap-2">
      {!edit && (
        <IconButton type="button" onClick={handleEdit}>
          <EditOutlinedIcon />
        </IconButton>
      )}
      {edit && (
        <IconButton type="button" color="success" onClick={handleDone}>
          <DoneOutlinedIcon />
        </IconButton>
      )}
      {!edit && (
        <IconButton type="button" color="error">
          <DeleteOutlineOutlinedIcon onClick={handleDelete} />
        </IconButton>
      )}
      {edit && (
        <IconButton type="button" color="error" onClick={handleClose}>
          <CloseOutlinedIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Actions;
