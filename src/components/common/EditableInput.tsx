import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";

interface EditableInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

const EditableInput: React.FC<EditableInputProps> = ({
  value,
  onChange,
  label,
  disabled,
  className,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onChange(inputValue); // Notify parent of the change
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-1">
        {label}:
      </label>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur} // Save on blur
          autoFocus // Automatically focus the input when editing
          className={`${className} px-2 py-3 w-2/3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          disabled={disabled}
        />
      ) : (
        <span
          className="px-2 py-3 w-2/3 border border-gray-300 rounded-sm shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={handleInputClick}
        >
          <span className="text-gray-800">{inputValue}</span>
          <FaPen className="text-gray-500 hover:text-blue-500 transition duration-200" />
        </span>
      )}
    </div>
  );
};

export default EditableInput;
