import React from "react";

interface H1Props {
  children: any;
  className?: string;
}

const H1: React.FC<H1Props> = ({ className, children }) => {
  return <h1 className={`font-medium text-3xl ${className}`}>{children}</h1>;
};

export default H1;
