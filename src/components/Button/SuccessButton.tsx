interface SuccessButtonProps {
  children: any;
  className?: string;
  type?: any;
}

const SuccessButton: React.FC<SuccessButtonProps> = ({
  children,
  className = "",
  type = "submit",
}) => {
  return (
    <button
      className={`${className} px-3 py-2 bg-green-400 text-white`}
      type={type}
    >
      {children}
    </button>
  );
};

export default SuccessButton;
