import React, { ReactNode } from "react";

interface Props {
  method?: HttpMethod;
  action?: string;
  className?: string;
  children: ReactNode;
  onSubmit: (e: any) => void;
}

export enum HttpMethod {
  GET = "get",
  POST = "post",
}

function Form({ method, action, className, children, onSubmit }: Props) {
  return (
    <div className="flex flex-col p-3 w-[90vw] lg:w-[25vw] m-auto justify-center align-center">
      <form
        action={action}
        method={method}
        className={`${className} mt-5 w-full p-5 m-auto bg-gray-100 rounded-sm flex flex-col`}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
}

export default Form;
