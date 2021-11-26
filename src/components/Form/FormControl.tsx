import React from "react";

const FormControl = ({ type, inputClass="", ...rest }) => {
  switch (type) {
    case "textarea":
      return <textarea rows={4} {...rest} className="input-focus p-2 rounded-md"></textarea>;
    default:
      return (
        <input
          className={`w-full p-1 input-focus ${inputClass}`}
          type={type}
          autoComplete="off"
          {...rest}
        />
      );
  }
};

export default FormControl;
