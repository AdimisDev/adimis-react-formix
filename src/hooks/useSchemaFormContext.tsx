import { FormContextType } from "../interface/form.interface";
import { Context, useContext } from "react";
import { FieldValues } from "react-hook-form";
import { FormContext } from "../context/form.context";

/**
 * Custom hook to access the schema form context.
 * @template TFieldValues - The type of field values.
 * @returns {FormContextType<TFieldValues>} - The form context containing form state and methods.
 * @throws Will throw an error if the hook is used outside of a FormProvider.
 */
export function useSchemaFormContext<TFieldValues extends FieldValues>(): FormContextType<TFieldValues> {
  // Get the form context
  const context = useContext(
    FormContext as Context<FormContextType<TFieldValues>>
  );

  // If the context is not available, throw an error
  if (!context) {
    throw new Error("useSchemaFormContext must be used within a FormProvider");
  }

  // Return the form context
  return context;
}
