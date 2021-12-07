import * as React from "react";
interface IconButtonProps {
  children: any;
  className?: string;
  title: string;
  onClick?(a: any): void;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  className = "",
  title,
  onClick = () => null,
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`text-base flex flex-col justify-center items-center p-3 ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
