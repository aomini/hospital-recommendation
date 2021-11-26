import React from "react";

interface IFormProps extends React.ComponentPropsWithoutRef<"label"> {
  className?: string;
  children?: React.ReactNode;
  type?: string;
}

const FormLabel: React.FC<IFormProps> = (props) => {
  const { children, className, type, ...rest } = props;
  return (
    <label className={`cursor-pointer ${type === "radio" ? "" : "mb-1.5"} ${className}`} {...rest}>
      {children}
    </label>
  );
};

export default FormLabel;
