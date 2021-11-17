interface PrimaryButtonProps {
  children: any;
  className?: string;
  type?: any;
  onClick?(a: any): void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  type = "submit",
  onClick = () => null,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white hover:bg-gray-100 text-red-500 font-medium px-4 py-3 rounded-sm ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
