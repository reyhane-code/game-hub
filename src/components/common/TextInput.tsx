import React, { ReactNode, RefObject } from "react";

interface Props {
  children?: ReactNode;
  type: string;
  placeholder: string;
  refVal: RefObject<HTMLInputElement>;
  name?: string;
  onChange?: (event: any) => void;
}

function TextInput({
  refVal,
  children = "",
  type,
  placeholder,
  name,
  onChange,
}: Props) {
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          ref={refVal}
          type={type}
          className="grow"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
        {children}
      </label>
    </div>
  );
}

export default TextInput;
