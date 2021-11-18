interface IconButtonProps {
  children: any;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  className = "",
}) => {
  return (
    <button className={`text-base flex-col justify-center items-center p-3 ${className}`}>
      {children}
    </button>
  );
};

export default IconButton;
