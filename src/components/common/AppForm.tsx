import React, { Suspense, lazy } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

interface AppFormProps {
  validationSchema?: ObjectSchema<any>;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
  onError?: (error: any) => any;
  doFinally?: (data: any) => any;
}

const AppForm: React.FC<AppFormProps> = ({
  validationSchema,
  initialValues,
  children,
  onSubmit,
  onError,
  doFinally,
}) => {
  const methods = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: initialValues,
  });

  const { handleSubmit, setError } = methods;

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (error: any) {
      const response = error?.response;
      const data = response?.data?.data;
      if (response && data) {
        Object.values(data).forEach((err: any) => {
          Object.entries(err).forEach(([field, message]: any) => {
            console.log(
              "Setting error for field:",
              field,
              "with message:",
              message
            );
            setError(field, {
              type: "server",
              message: message ?? "خطایی رخ داده مقدار ورودی را بررسی کنید",
            });
          });
        });
      }
      if (typeof onError === "function") {
        onError(error);
      }
    } finally {
      if (typeof doFinally === "function") {
        doFinally(data);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </form>
    </FormProvider>
  );
};

export default AppForm;
