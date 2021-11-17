interface PrimaryButtonProps {
  children: any;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
}) => {
  return (
    <button
      className={`bg-white hover:bg-gray-100 text-black font-medium px-4 py-3 rounded-sm ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
