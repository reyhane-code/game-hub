import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { useController, useFormContext } from "react-hook-form";

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
  const { control, register } = useFormContext() ?? {}; // Access form context
  if (!register) return <div></div>;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "", // Set default value if needed
  });


  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.value); // Update react-hook-form state
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    field.onBlur(); // Trigger blur event for validation
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-lg font-medium mb-1">
        {label}:
      </label>
      {disabled ? (
        <div className="px-2 py-3 w-2/3 border border-gray-300 rounded-sm shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200">
          <span>{field.value}</span>
        </div>
      ) : isEditing ? (
        <input
          type="text"
          value={field.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          className={`${className} px-2 py-3 w-2/3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          disabled={disabled}
        />
      ) : (
        <span
          className="px-2 py-3 w-2/3 border border-gray-300 rounded-sm shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={handleInputClick}
        >
          <span>{field.value}</span>
          <FaPen className="text-gray-500 hover:text-blue-500 transition duration-200" />
        </span>
      )}
      {error && <span className="text-red-500">{error.message}</span>} {/* Display validation error */}
    </div>
  );
};

export default EditableInput;
