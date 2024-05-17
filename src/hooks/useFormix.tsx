import { FormixFormProviderType } from "../interface/form.interface";
import { Context, useContext } from "react";
import { FieldValues } from "react-hook-form";
import { FormixFormProvider } from "../context/form.context";

/**
 * Custom hook to access the formix form context.
 * @template TFieldValues - The type of field values.
 * @returns {FormixFormProviderType<TFieldValues>} - The form context containing form state and methods.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 */
export function useFormix<TFieldValues extends FieldValues>(): FormixFormProviderType<TFieldValues> {
  // Get the form context
  const context = useContext(
    FormixFormProvider as Context<FormixFormProviderType<TFieldValues>>
  );

  // If the context is not available, throw an error
  if (!context) {
    throw new Error("useFormix must be used within a FormProvider");
  }

  // Return the form context
  return context;
}
