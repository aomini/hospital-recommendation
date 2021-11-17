import ExclamationCircleIcon from "src/assets/icons/ExclamationCircleIcon";

interface InputProps {
  htmlFor: string;
  label: string;
  //   id: string;
  //   name: string;
  //   placeholder: string;
  className?: string;
  inputType: any;
  error?: string;
}

const InputField: React.FC<InputProps> = ({
  //   id,
  //   name,
  //   placeholder,
  htmlFor,
  label,
  className,
  inputType,
  error,
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="font-medium">
        {label}
      </label>
      <br />
      <input
        className={`${className} p-3 border border-gray-400 w-full rounded-md ${
          error ? "border-2 border-red-500" : ""
        }`}
        type={inputType}
        // id={id}
        // name={name}
        // placeholder={placeholder}
      />
      {error ? (
        <span className="flex items-center text-xs text-red-500 font-medium mt-1">
          <ExclamationCircleIcon className="text-red-500 h-4 w-4 mr-1" />
          {error}
        </span>
      ) : (
        ""
      )}
    </>
  );
};

export default InputField;
