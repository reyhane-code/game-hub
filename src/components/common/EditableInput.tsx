import React, { useMemo, useState } from "react";
import { FaPen } from "react-icons/fa6";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";

interface EditableInputProps {
  name: string; // Added name prop for react-hook-form
  label: string;
  disabled?: boolean;
  className?: string;
}

const EditableInput: React.FC<EditableInputProps> = ({
  name,
  label,
  disabled,
  className,
}) => {
  const { control } = useMemo(() => useFormContext() ?? {}, [useFormContext]); // Access form context

  let field: ControllerRenderProps<FieldValues, string> | undefined;
  let error: FieldError | undefined
  if (control) {
    const {
      field: fieldData,
      fieldState: { error: errorData },
    } = useController({
      name,
      control,
    });
    field = fieldData;
    error = errorData;
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (field) field.onChange(event.target.value); // Update react-hook-form state
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (field) field.onBlur(); // Trigger blur event for validation
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-lg font-medium mb-1 mx-1">{label}:</label>
      {disabled ? (
        <div className="px-2 py-3 w-full min-h-11 border border-gray-300 rounded-sm shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200">
          <span>{field?.value ?? ""}</span>
        </div>
      ) : isEditing ? (
        <input
          type="text"
          value={field?.value ?? undefined}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          className={`${className} px-2 py-3 w-full min-h-11 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          disabled={disabled}
        />
      ) : (
        <span
          className="px-2 py-3 w-full min-h-11 border border-gray-300 rounded-sm shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={handleInputClick}
        >
          <span>{field?.value ?? ""}</span>
          <FaPen className="text-gray-500 hover:text-blue-500 transition duration-200" />
        </span>
      )}
      <div className="w-full mt-1 flex min-h-4">
        {error && (
          <span className="text-red-500 text-xs lg:text-sm ms-auto me-1 w-max">
            {error.message}
          </span>
        )}
      </div>
      {/* Display validation error */}
    </div>
  );
};

export default EditableInput;
