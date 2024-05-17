import React, { useMemo } from "react";
import { FieldValues } from "react-hook-form";
import {
  ISchemaFormProps,
  UseSchemaFormReturn,
} from "../interface/form.interface";
import useSchemaForm from "../hooks/useSchemaForm";
import { FormixFormProvider } from "./form.context";

/**
 * FormixProvider component that provides the formix form context to its children.
 * @template TFieldValues - The type of field values.
 * @param {ISchemaFormProps<TFieldValues> & { children: React.ReactNode }} props - The properties for the schema form provider.
 * @returns {JSX.Element} - The FormixProvider component.
 */
const FormixProvider = <TFieldValues extends FieldValues>(
  props: ISchemaFormProps<TFieldValues> & { children: React.ReactNode }
): JSX.Element => {
  // Use the custom useSchemaForm hook to get the form state and methods.
  const value: UseSchemaFormReturn<TFieldValues> = useSchemaForm(props);

  // Memoize the value to avoid unnecessary re-renders.
  const memonizedValue = useMemo(() => value, [value]);

  return (
    <FormixFormProvider.Provider value={memonizedValue}>
      {props.children}
    </FormixFormProvider.Provider>
  );
};

export default FormixProvider;
