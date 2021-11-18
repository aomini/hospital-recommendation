interface BodyTextProps {
  children: any;
  className?: string;
}

const BodyText: React.FC<BodyTextProps> = ({ children, className = "" }) => {
  return <p className={`text-base ${className}`}>{children}</p>;
};

export default BodyText;
