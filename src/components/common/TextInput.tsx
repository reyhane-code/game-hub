import React, { ReactNode } from "react";
import { ControllerRenderProps, FieldError, FieldValues, useController, useFormContext } from "react-hook-form";

interface Props {
  children?: ReactNode;
  type: string;
  placeholder: string;
  label?: string | number;
  name: string;
}

function TextInput({ type, placeholder, name, label, children }: Props) {
  // Access form context at the top level
  const { control, register } = useFormContext() || { control: null }; // Provide a fallback

  // If control is not available, render a regular input
  if (!control || !register) {
    return (
      <div className="flex flex-col w-full h-max grow">
        <label className="input input-bordered flex flex-col items-center w-full">
          <span className="text-sm mx-1">{label}</span>
          <input
            type={type}
            className="grow w-full"
            placeholder={placeholder}
            defaultValue="" // Set default value to avoid uncontrolled warning
          />
          {children}
        </label>
      </div>
    );
  }

  // Use useController to get field and error state
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-col w-full h-max grow">
      <label className="input input-bordered flex flex-col items-center w-full">
        <span className="text-sm mx-1">{label}</span>
        <input
          type={type}
          className="grow w-full"
          placeholder={placeholder}
          {...field} // Spread field properties to handle value and onChange
        />
        {children}
      </label>
      <div className="w-full mt-1 flex min-h-4">
        {error && (
          <span className="text-red-500 text-xs lg:text-sm ms-auto me-1 w-max">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default TextInput;
