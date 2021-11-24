import React from "react";

interface H3Props {
  children: any;
  className?: string;
}

const H3: React.FC<H3Props> = ({ children }) => {
  return <h3 className="font-medium text-xl">{children}</h3>;
};

export default H3;
