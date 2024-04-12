import React, { ReactNode, RefObject } from "react";

interface Props {
  children?: ReactNode;
  type: string;
  placeholder: string;
  ref: RefObject<HTMLInputElement>;
}

function TextInput({ ref, children = "", type, placeholder }: Props) {
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          ref={ref}
          type={type}
          className="grow"
          placeholder={placeholder}
        />
        {children}
      </label>
    </div>
  );
}

export default TextInput;
