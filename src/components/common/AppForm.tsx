import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

interface AppFormProps {
  validationSchema?: ObjectSchema<any>;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  onSubmit: (data: any) => Promise<void>;
}

const AppForm: React.FC<AppFormProps> = ({
  validationSchema,
  initialValues,
  children,
  onSubmit,
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
      if (error.response && error.response.data.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]: any) => {
            setError(field, { type: "server", message: message ?? "error" });
          }
        );
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default AppForm;
