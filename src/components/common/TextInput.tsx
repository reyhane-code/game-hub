import React, { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

interface Props {
  children?: ReactNode;
  type: string;
  placeholder: string;
  label?: string | number;
  name: string;
}

function TextInput({ type, placeholder, name, label, children }: Props) {
  const { control, register } = useFormContext() ?? {};

  if (!register) return <div></div>;
  
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "", // Set default value if needed
  });

  if (!register) return null;

  return (
    <div className="flex flex-col w-full h-max grow">
      <label className="input input-bordered flex items-center gap-2">
        {label}
        <input
          type={type}
          className="grow w-full"
          placeholder={placeholder}
          {...field}
        />
        {children}
      </label>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}

export default TextInput;
