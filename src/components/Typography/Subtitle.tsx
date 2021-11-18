interface SubtitleProps {
  children: any;
  className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ children, className = "" }) => {
  return <p className={`text-sm ${className}`}>{children}</p>;
};

export default Subtitle;
