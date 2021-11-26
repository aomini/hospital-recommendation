import React from "react";

const FormControl = ({ type, inputClass = "", ...rest }) => {
  const [radioCheck, setRadioCheck] = React.useState(false);
  const handleClick = () => {
    setRadioCheck(!radioCheck);
  };
  switch (type) {
    case "textarea":
      return (
        <textarea
          rows={4}
          {...rest}
          className="input-focus p-2 rounded-md"
        ></textarea>
      );
    default:
      return (
        <>
          <input
            className={`${
              type === "radio"
                ? `w-3.5 h-3.5 !rounded-none mr-2 border border-gray-500 bg-white appearance-none cursor-pointer ${
                    radioCheck ? "bg-green-400" : ""
                  }`
                : "w-full p-1 input-focus"
            } ${inputClass}`}
            type={type}
            autoComplete="off"
            onClick={handleClick}
            {...rest}
          />
          {type === "radio" ? (
            <div
              className={`absolute  transform rotate-45 ml-2 mb-1 cursor-pointer bg-green-400 ${
                radioCheck ? "border-4 border-white w-2.5 h-4 border-l-0 border-t-0" : ""
              }`}
              onClick={handleClick}
            ></div>
          ) : (
            ""
          )}
        </>
      );
  }
};

export default FormControl;
