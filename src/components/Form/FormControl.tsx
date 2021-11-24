import React from "react";

const FormControl = ({ type, ...rest }) => {
  switch (type) {
    case "textarea":
      return <textarea rows={4} {...rest}></textarea>;
    default:
      return (
        <input
          className="w-full p-1"
          type={type}
          autoComplete="off"
          {...rest}
        />
      );
  }
};

export default FormControl;
