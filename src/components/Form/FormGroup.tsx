import React from "react";

const FormGroup = ({ children, type = "" }) => {
  return (
    <div
      className={`${
        type === "radio"
          ? "flex flex-row-reverse justify-end items-center"
          : "w-full grid "
      }`}
    >
      {children}
    </div>
  );
};

export default FormGroup;
