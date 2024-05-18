import React, { HTMLAttributes, HTMLInputAutoCompleteAttribute } from "react";
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
  FieldError,
} from "react-hook-form";
import { z, ZodTypeAny } from "zod";

export type ZodSchemaObject<T> = Record<keyof T, ZodTypeAny>;

/**
 * Interface representing the schema for a form field.
 * @template TFieldValues - The type of field values.
 */
export interface IFieldSchema<TFieldValues extends FieldValues> {
  /** The key or path for the field within the form values. */
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
  /** The type of the field (e.g., text, select, radio group). */
  type?:
    | React.HTMLInputTypeAttribute
    | "textarea"
    | "select"
    | "multi-select"
    | "radio group"
    | "boolean";
  /** Options for select, multi-select, or radio group fields. */
  options?: Array<{ label: string; value: string | number }>;
  /** Conditions for displaying the field based on other field values. */
  displayConditions?: DisplayCondition<TFieldValues>[];
  /** Conditions for removing validation from the field based on other field values. */
  removeValidationConditions?: ValidationCondition<TFieldValues>[];
  /** Custom render function for the field. */
  render?: FieldRenderFunction<TFieldValues>;
}

/**
 * Interface representing the properties of the form schema.
 * @template TFieldValues - The type of field values.
 */
export interface ISchemaFormProps<TFieldValues extends FieldValues> {
  /** The unique identifier for the form. */
  formSlug: string;
  /** The label or title of the form. */
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
  validationMode?: ValidationMode;
  /** Re-validation mode (when re-validations are triggered). */
  reValidateMode?: ReValidateMode;
  /** Default values for the form fields. */
  defaultValues?:
    | DefaultValues<TFieldValues>
    | AsyncDefaultValues<TFieldValues>;
  /** Where to persist form responses (e.g., localStorage, sessionStorage). */
  persistFormResponse?: "localStorage" | "sessionStorage";
  /** Callback for form submission. Supports both normal and async functions. */
  onSubmit?: FormSubmitHandler<TFieldValues>;
  /** Callback for handling invalid form submissions. Supports both normal and async functions. */
  onInvalidSubmit?: SubmitErrorHandler<TFieldValues>;
  /** Callback for handling form changes. */
  onChange?: FormChangeHandler<TFieldValues>;
}

/**
 * Interface representing the context of a form.
 * @template TFieldValues - The type of field values.
 */
export interface FormixFormProviderType<TFieldValues extends FieldValues> {
  /** The label or title of the form. */
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
  handleOnSubmit: FormSubmitHandler<TFieldValues>;
  /** Handler for invalid form submission. */
  handleOnInvalidSubmit: SubmitErrorHandler<TFieldValues>;
  /** Function to render fields in a flexible layout. */
  renderFlexFields: (props: RenderFlexFieldsProps) => JSX.Element;
  /** Function to render the entire form. */
  renderForm: (data: RenderFormProps<TFieldValues>) => JSX.Element;
}

/**
 * Interface representing the properties for rendering the form.
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
  renderFields?: RenderFieldsFunction<TFieldValues>;
}

/**
 * Interface representing the properties for rendering flexible fields.
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
 * Interface representing the return value of the useSchemaForm hook.
 * @template TFieldValues - The type of field values.
 */
export interface UseSchemaFormReturn<TFieldValues extends FieldValues> {
  /** The label or title of the form. */
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
  handleOnSubmit: FormSubmitHandler<TFieldValues>;
  /** Handler for invalid form submission. */
  handleOnInvalidSubmit: SubmitErrorHandler<TFieldValues>;
  /** Function to render fields in a flexible layout. */
  renderFlexFields: (props: RenderFlexFieldsProps) => JSX.Element;
  /** Function to render the entire form. */
  renderForm: (data: RenderFormProps<TFieldValues>) => JSX.Element;
}

/**
 * Interface representing the properties for flexible fields in a form layout.
 */
export interface FormFlexFieldProps {
  /** Determines if the layout is fluid or responsive. */
  fluid?: boolean;
  /** Custom CSS styles for the flexible field container. */
  style?: React.CSSProperties;
  /** Custom CSS class name for the flexible field container. */
  className?: string;
  /** Number of columns in the grid layout. */
  columns?: number;
  /** Gap between the fields in the layout. */
  gap?: string;
}

/**
 * Interface representing the properties of the form body.
 */
export interface FormBodyProps {
  /** Determines if the form should be wrapped in a panel (default is true). */
  panel?: boolean;
  /** The content to be rendered within the form body. */
  children?: React.ReactNode;
  /** HTML attributes for the form container element. */
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  /** HTML attributes for the form element. */
  formProps?: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
}

/**
 * Interface representing the context value of an individual form field.
 * @template TFieldValues - The type of field values.
 * @template TName - The name of the field.
 */
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  /** The name of the field. */
  name: TName;
};

/**
 * Interface representing the context value of an individual field item.
 */
export type FieldItemContextValue = {
  /** The unique identifier for the field item. */
  id: string;
};

/**
 * Interface representing the return value of the useFormField hook.
 * @template TFieldValues - The type of field values.
 * @template TName - The name of the field.
 */
export interface UseFormFieldReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  /** The unique identifier for the field item. */
  id: string;
  /** The name of the field. */
  name: TName;
  /** The ID for the form item element. */
  fieldItemId: string;
  /** The ID for the form item description element. */
  fieldDescriptionId: string;
  /** The ID for the form item message element. */
  fieldMessageId: string;
  /** The error state of the field, if any. */
  error?: FieldError;
  /** Indicates if the field has been touched. */
  isTouched: boolean;
  /** Indicates if the field value has been modified. */
  isDirty: boolean;
  /** Indicates if the field is valid. */
  invalid: boolean;
  /** Indicates if the field is being validated. */
  isValidating: boolean;
}

/**
 * Type representing the function to fetch default values asynchronously.
 * @template TFieldValues - The type of field values.
 */
export type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

/**
 * Type representing the handler function for form submission.
 * @template TFieldValues - The type of field values.
 */
export type FormSubmitHandler<TFieldValues> = (
  values: TFieldValues
) => Promise<void> | void;

/**
 * Type representing the handler function for form changes.
 * @template TFieldValues - The type of field values.
 */
export type FormChangeHandler<TFieldValues extends FieldValues> = (
  formResponse: DeepPartialSkipArrayKey<TFieldValues>,
  formErrors: FieldErrors<TFieldValues>,
  canRemoveValidationForFields: Record<Path<TFieldValues>, boolean>
) => void;

/**
 * Type representing the function to render form fields.
 * @template TFieldValues - The type of field values.
 */
export type RenderFieldsFunction<TFieldValues extends FieldValues> = (params: {
  /** Whether the layout is fluid (responsive). */
  fluid: boolean;
  /** Number of columns in the layout. */
  columns?: number;
  /** The schema defining the fields in the form. */
  schema: IFieldSchema<TFieldValues>[];
  /** The set of visible fields in the form. */
  visibleFields: Set<Path<TFieldValues>>;
  /** Methods from react-hook-form for managing the form state. */
  formMethods: UseFormReturn<TFieldValues>;
  /** Whether the form is disabled. */
  formDisabled?: boolean;
  /** Whether the submit button is loading. */
  submitButtonLoading?: boolean;
}) => React.ReactNode;

/**
 * Type representing the function to render a form field.
 * @template TFieldValues - The type of field values.
 */
export type FieldRenderFunction<TFieldValues extends FieldValues> = (data: {
  /** Methods from react-hook-form for managing the form state. */
  formMethods: UseFormReturn<TFieldValues>;
  /** The schema definition of the form field. */
  formItem: IFieldSchema<TFieldValues>;
  /** The errors in the form state. */
  formErrors: FieldErrors<TFieldValues>;
  /** Whether the form is disabled. */
  formDisabled: boolean;
  /** Whether the submit button is loading. */
  submitButtonLoading?: boolean;
}) => React.ReactNode;

/**
 * Type representing the validation mode.
 */
export type ValidationMode =
  | "onBlur"
  | "onChange"
  | "onSubmit"
  | "onTouched"
  | "all";

/**
 * Type representing the re-validation mode.
 */
export type ReValidateMode = "onBlur" | "onChange" | "onSubmit";

/**
 * Interface representing a condition for displaying a field based on other field values.
 * @template TFieldValues - The type of field values.
 */
export interface DisplayCondition<TFieldValues extends FieldValues> {
  /** The dependent field whose value will determine the condition. */
  dependentField: Path<TFieldValues>;
  /** The operator used to compare the dependent field's value. */
  operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
  /** The value of the dependent field to compare against. */
  dependentFieldValue: TFieldValues[Path<TFieldValues>];
  /** The logical relation of the condition (e.g., "and"). */
  relation?: "and";
}

/**
 * Interface representing a condition for removing validation from a field based on other field values.
 * @template TFieldValues - The type of field values.
 */
export interface ValidationCondition<TFieldValues extends FieldValues> {
  /** The dependent field whose value will determine the condition. */
  dependentField: Path<TFieldValues>;
  /** The operator used to compare the dependent field's value. */
  operator: "===" | "!==" | "<" | "<=" | ">" | ">=";
  /** The value of the dependent field to compare against. */
  dependentFieldValue: TFieldValues[Path<TFieldValues>];
}

/**
 * Type representing the theme options.
 */
export type Theme = "dark" | "light" | "system";

/**
 * Interface representing the properties for the ThemeProvider component.
 */
export interface ThemeProviderProps {
  /** The child elements to be wrapped by the ThemeProvider. */
  children: React.ReactNode;
  /** The default theme to be used. */
  defaultTheme?: Theme;
  /** The key used for storing the theme preference in storage. */
  storageKey?: string;
}

/**
 * Interface representing the state of the ThemeProvider component.
 */
export interface ThemeProviderState {
  /** The current theme. */
  theme: Theme;
  /** Function to update the theme. */
  setTheme: (theme: Theme) => void;
}
