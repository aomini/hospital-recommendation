interface InputProps {
  htmlFor: string;
  label: string;
  //   id: string;
  //   name: string;
  //   placeholder: string;
  className?: string;
}

const InputField: React.FC<InputProps> = ({
  //   id,
  //   name,
  //   placeholder,
  htmlFor,
  label,
  className,
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="font-medium">
        {label}
      </label>
      <br />
      <input
        className={`${className} p-3 border border-gray-400 w-full rounded-md`}
        type="text"
        // id={id}
        // name={name}
        // placeholder={placeholder}
      />
    </>
  );
};

export default InputField;
