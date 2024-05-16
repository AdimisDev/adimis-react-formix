import React, { HTMLAttributes } from "react";
import { HTMLInputAutoCompleteAttribute } from "react";
import {
  FieldErrors,
  FieldValues,
  FieldPath,
  Path,
  DefaultValues,
  UseFormReturn,
  SubmitErrorHandler,
  CriteriaMode,
  DeepPartialSkipArrayKey,
} from "react-hook-form";
import { z, ZodTypeAny } from "zod";

export type ZodSchemaObject<T> = Record<keyof T, ZodTypeAny>;

/**
 * Interface for defining a field schema.
 * @template TFieldValues - The type of field values.
 */
export interface IFieldSchema<TFieldValues extends FieldValues> {
  /** The key/path for the field within the form values. */
  key: Path<TFieldValues>;
  /** The label for the field, displayed in the form UI. */
  label?: string;
  /** A brief description of the field's purpose. */
  description?: string;
  /** Help text providing additional information about the field. */
  helpText?: string;
  /** AutoComplete attribute for the field. */
  autoComplete?: HTMLInputAutoCompleteAttribute;
  /** Placeholder text for the field. */
  placeholder?: string;
  /** Default value for the field. */
  defaultValue?: TFieldValues[Path<TFieldValues>];
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Validation schema for the field using Zod. */
  validations?: z.ZodType<TFieldValues[Path<TFieldValues>], any>;
  /** CSS styles for the field. */
  fieldStyle?: React.CSSProperties;
  /** CSS class name for the field. */
  fieldClassName?: string;
  /** Column span for the field in a grid layout. */
  colSpan?: number;
  /** The type of the field (e.g., text, select, radio group). */
  type?:
    | React.HTMLInputTypeAttribute
    | "textarea"
    | "select"
    | "multi-select"
    | "radio group"
    | "boolean";
  /** Options for select, multi-select, or radio group fields. */
  options?: Array<{
    label: string;
    value: string;
  }>;
  /** Conditions for displaying the field based on other field values. */
  displayConditions?: {
    dependentField: Path<TFieldValues>;
    operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
    dependentFieldValue: TFieldValues[Path<TFieldValues>];
    relation?: "and";
  }[];
  /** Conditions for removing validation from the field based on other field values. */
  removeValidationConditions?: {
    dependentField: Path<TFieldValues>;
    operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
    dependentFieldValue: TFieldValues[Path<TFieldValues>];
    relation?: "and";
  }[];
  /** Custom render function for the field. */
  render: (data: {
    formMethods: UseFormReturn<TFieldValues, any, undefined>;
    formItem: IFieldSchema<TFieldValues>;
    formErrors: FieldErrors<TFieldValues>;
    formDisabled: boolean;
    submitButtonLoading?: boolean;
  }) => React.ReactNode;
}

/**
 * Type for asynchronously fetching default values.
 * @template TFieldValues - The type of field values.
 */
export type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

/**
 * Interface for schema form properties.
 * @template TFieldValues - The type of field values.
 */
export interface ISchemaFormProps<TFieldValues extends FieldValues> {
  /** The unique identifier for the form. */
  formSlug: string;
  /** The label/title of the form. */
  formLabel: string;
  /** A brief description of the form. */
  formDescription?: string;
  /** The schema defining the fields in the form. */
  schema: IFieldSchema<TFieldValues>[];
  /** Whether to enable developer tools for form debugging. */
  devTools?: boolean;
  /** Whether to show validation errors. */
  showValidationErrors?: boolean;
  /** Criteria mode for validation. */
  criteriaMode?: CriteriaMode;
  /** CSS styles for the form. */
  formStyle?: React.CSSProperties;
  /** CSS class name for the form. */
  formClassName?: string;
  /** Whether the form is disabled. */
  formDisabled?: boolean;
  /** Whether to enable conditional rendering of fields. */
  enableConditionalRendering?: boolean;
  /** Whether to enable validations. */
  enableValidations?: boolean;
  /** Validation mode (when validations are triggered). */
  validationMode?:
    | "onBlur"
    | "onChange"
    | "onSubmit"
    | "onTouched"
    | "all"
    | undefined;
  /** Re-validation mode (when re-validations are triggered). */
  reValidateMode?: "onBlur" | "onChange" | "onSubmit" | undefined;
  /** Default values for the form fields. */
  defaultValues?:
    | DefaultValues<TFieldValues>
    | AsyncDefaultValues<TFieldValues>;
  /** Where to persist form responses (e.g., localStorage, sessionStorage). */
  persistFormResponse?: "localStorage" | "sessionStorage" | undefined;
  /** Callback for form submission. */
  onSubmit?: (values: TFieldValues) => Promise<void> | void;
  /** Callback for handling invalid form submissions. */
  onInvalidSubmit?: SubmitErrorHandler<TFieldValues>;
  /** Callback for handling form changes. */
  onChange?: (
    formResponse: DeepPartialSkipArrayKey<TFieldValues>,
    formErrors: FieldErrors<TFieldValues>,
    canRemoveValidationForFields: Record<Path<TFieldValues>, boolean>
  ) => void;
}

/**
 * Interface for form context type.
 * @template TFieldValues - The type of field values.
 */
export interface FormContextType<TFieldValues extends FieldValues> {
  /** The label/title of the form. */
  formLabel: string;
  /** The unique identifier for the form. */
  formSlug: string;
  /** The key used for the form. */
  formKey: string;
  /** A brief description of the form. */
  formDescription?: string;
  /** The fields schema in the form. */
  formFields: IFieldSchema<TFieldValues>[];
  /** Methods from react-hook-form for managing the form state. */
  formMethods: UseFormReturn<TFieldValues>;
  /** The set of visible fields in the form. */
  visibleFields: Set<Path<TFieldValues>>;
  /** Whether the form is disabled. */
  formDisabled: boolean;
  /** Whether the submit button is loading. */
  submitButtonLoading: boolean;
  /** Handler for form submission. */
  handleOnSubmit: (values: TFieldValues) => void;
  /** Handler for invalid form submission. */
  handleOnInvalidSubmit: (errors: FieldErrors<TFieldValues>) => void;
  /** Function to render fields in a flexible layout. */
  renderFlexFields: (props: RenderFlexFieldsProps) => JSX.Element;
  /** Function to render the entire form. */
  renderForm: (data: RenderFormProps<TFieldValues>) => JSX.Element;
}

/**
 * Interface for rendering form properties.
 * @template TFieldValues - The type of field values.
 */
export interface RenderFormProps<TFieldValues extends FieldValues> {
  /** Whether the form should be fluid (responsive). */
  fluid?: boolean;
  /** CSS styles for the form container. */
  style?: React.CSSProperties;
  /** Number of columns in the form layout. */
  columns?: number;
  /** Gap between form fields. */
  gap?: string;
  /** Custom header for the form. */
  header?: React.ReactNode;
  /** Custom footer for the form. */
  footer?: React.ReactNode;
  /** CSS styles for the submit button. */
  submitButtonStyle?: React.CSSProperties;
  /** Text for the submit button. */
  submitButtonText?: React.ReactNode;
  /** Loader for the submit button when loading. */
  submitButtonLoader?: React.ReactNode;
  /** Function to render form fields. */
  renderFields?: (params: {
    fluid: boolean;
    columns?: number;
    schema: IFieldSchema<TFieldValues>[];
    visibleFields: Set<Path<TFieldValues>>;
    formMethods: UseFormReturn<TFieldValues, any, undefined>;
    formDisabled?: boolean;
    submitButtonLoading?: boolean;
  }) => React.ReactNode;
}

/**
 * Interface for rendering flexible fields.
 */
export interface RenderFlexFieldsProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the layout is fluid (responsive). */
  fluid: boolean;
  /** Number of columns in the layout. */
  columns: number;
  /** Gap between fields in the layout. */
  gap: string;
}

/**
 * Interface for the return value of the useSchemaForm hook.
 * @template TFieldValues - The type of field values.
 */
export interface UseSchemaFormReturn<TFieldValues extends FieldValues> {
  /** The label/title of the form. */
  formLabel: string;
  /** The unique identifier for the form. */
  formSlug: string;
  /** The key used for the form. */
  formKey: string;
  /** A brief description of the form. */
  formDescription?: string;
  /** The fields schema in the form. */
  formFields: IFieldSchema<TFieldValues>[];
  /** Methods from react-hook-form for managing the form state. */
  formMethods: UseFormReturn<TFieldValues>;
  /** The set of visible fields in the form. */
  visibleFields: Set<Path<TFieldValues>>;
  /** Whether the submit button is loading. */
  submitButtonLoading: boolean;
  /** Whether the form is disabled. */
  formDisabled: boolean;
  /** Handler for form submission. */
  handleOnSubmit: (values: TFieldValues) => void;
  /** Handler for invalid form submission. */
  handleOnInvalidSubmit: (errors: FieldErrors<TFieldValues>) => void;
  /** Function to render fields in a flexible layout. */
  renderFlexFields: (props: RenderFlexFieldsProps) => JSX.Element;
  /** Function to render the entire form. */
  renderForm: (data: RenderFormProps<TFieldValues>) => JSX.Element;
}

export interface FormFlexFieldProps {
  fluid?: boolean;
  style?: React.CSSProperties;
  className?: string;
  columns?: number;
  gap?: string;
}

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

export interface FormBodyProps {
  panel?: boolean;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  formProps?: React.HTMLAttributes<HTMLFormElement>;
  children: React.ReactNode;
}

export type FieldItemContextValue = {
  id: string;
};