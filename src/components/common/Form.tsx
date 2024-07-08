import React, { ReactNode } from "react";
import Button from "./Button";

interface Props {
  method?: HttpMethod;
  action?: string;
  className?: string;
  children: ReactNode;
  submitText: string;
  onSubmit : () => void
}

export enum HttpMethod {
  GET = "get",
  POST = "post",
}

function Form({ method, action, className, children, submitText, onSubmit }: Props) {
  return (
    <div className="flex flex-col p-3 w-[90vw] lg:w-[25vw] m-auto justify-center align-center">
      <form
        action={action}
        method={method}
        className={`${className} mt-5 w-full h-80 p-5 m-auto bg-gray-100 rounded-sm flex flex-col justify-between`}
        onSubmit={onSubmit}
      >
        {children}
        <Button color="outline" size="lg">
          {submitText}
        </Button>
      </form>
    </div>
  );
}

export default Form;
