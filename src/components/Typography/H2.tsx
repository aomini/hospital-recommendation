import React from "react";

interface H2Props {
  children: any;
  className?: string;
}

const H2: React.FC<H2Props> = ({ children }) => {
  return <h2 className="font-medium text-2xl">{children}</h2>;
};

export default H2;
