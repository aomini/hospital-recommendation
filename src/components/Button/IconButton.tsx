interface IconButtonProps {
  children: any;
  className?: string;
  onClick?(a: any): void;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  className = "",
  onClick = () => null,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-base flex flex-col justify-center items-center p-3 ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
