import React from "react";

interface CardProps {
  backgroundColor?: string; //optional, if the user does provide it, it should be string
  children: any;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  backgroundColor = "bg-white",
  children,
  className = "",
}) => {
  return (
    <div className={`${backgroundColor} rounded-sm shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
