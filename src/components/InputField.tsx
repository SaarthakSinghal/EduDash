import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  valueAsNumber = false,
  valueAsDate = false,
  register,
  name,
  error,
  inputProps,
}: InputFieldProps) => {

  return (
    <div className="flex w-full max-w-[30%] flex-col gap-2 ">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        className="w-full rounded-md p-2 text-sm ring-[1.5px] ring-gray-300"
        {...register(name)}
        valueAsDate={valueAsDate}
        valueAsNumber={valueAsNumber}
        {...inputProps}
      />
      {error?.message ? (
        <p className="text-[10px] text-red-400">
          {error?.message ? error.message.toString() : ""}
        </p>
      ) : <div className="h-4"></div>}
    </div>
  );
};


export default InputField;
