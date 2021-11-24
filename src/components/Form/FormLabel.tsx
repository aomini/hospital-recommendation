import React from "react";

interface IFormProps extends React.ComponentPropsWithoutRef<"label"> {
  className?: string;
  children?: React.ReactNode;
}

const FormLabel: React.FC<IFormProps> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <label className={`cursor-pointer ${className}`} {...rest}>
      {children}
    </label>
  );
};

export default FormLabel;
