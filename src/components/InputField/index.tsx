import ExclamationCircleIcon from "src/assets/icons/ExclamationCircleIcon";

interface InputProps {
  htmlFor: string;
  label: string;
  placeholder: string;
  className?: string;
  inputType: any;
  error?: string;
  field: any;
}

const InputField: React.FC<InputProps> = ({
  htmlFor,
  label,
  className,
  inputType,
  placeholder,
  error,
  field,
}) => {
  return (
    <section>
      <label htmlFor={htmlFor} className="font-medium">
        {label}
      </label>
      <br />
      <input
        className={`${className} p-3 border border-gray-400 rounded-md text-gray-800 ${
          error ? "border-2 border-red-500" : ""
        }`}
        type={inputType}
        placeholder={placeholder}
        {...field}
      />
      {error ? (
        <span className="flex items-center text-xs text-red-500 font-medium mt-1">
          <ExclamationCircleIcon className="text-red-500 h-4 w-4 mr-1" />
          {error}
        </span>
      ) : (
        ""
      )}
    </section>
  );
};

export default InputField;
