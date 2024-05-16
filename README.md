# @adimis/react-formix

## Overview

Welcome to `@adimis/react-formix`, a versatile and powerful React library for creating dynamic forms using a schema-based approach. This library leverages the power of React, Zod for schema validation, and react-hook-form for form state management. Whether you need to create a custom form from scratch using the `SchemaFormProvider` and `FormContext` or utilize prebuilt components for rapid development, `@adimis/react-formix` has you covered.

## Features

- **Schema-based form generation:** Define your form fields and validation rules using a JSON schema.
- **Built-in validation with Zod:** Ensure data integrity and provide meaningful feedback to users.
- **Flexible layout options:** Easily create responsive form layouts with FormFlexFields.
- **Conditional rendering:** Show or hide form fields based on the values of other fields.
- **Persist form state:** Save and restore form state using local storage or session storage.
- **Customizable form components:** Use prebuilt components or create your own custom render functions.
- **Generic TypeScript Typing:** Utilize TypeScript to define and enforce types for form fields, enhancing type safety and developer experience.
- **Dynamic field visibility:** Update field visibility dynamically based on user inputs.
- **Validation removal conditions:** Remove field validations dynamically based on certain conditions.
- **Developer tools support:** Enable developer tools for debugging and inspecting form state during development.

## Installation

Install the package via npm:

```bash
npm install @adimis/react-formix
```

Or with yarn:

```bash
yarn add @adimis/react-formix
```

## Usage

Here's an example of how to use `@adimis/react-formix` to create a basic signup form:

```tsx
"use client";

import React from "react";
import { z } from "zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  FormBody,
  FormContent,
  FormContext,
  FormDescription,
  FormFlexFields,
  FormFooter,
  FormHeader,
  FormTitle,
  ISchemaFormProps,
} from "@adimis/react-formix";

interface SignUp {
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

const App = () => {
  const schemaFormProps: ISchemaFormProps<SignUp> = {
    formLabel: "Example Barebone Form",
    formSlug: "example-barebone-form",
    persistFormResponse: "localStorage",
    devTools: true,
    formDisabled: false,
    enableConditionalRendering: true,
    schema: [
      {
        key: "username",
        label: "Username",
        description: "Enter your desired username.",
        autoComplete: "username",
        type: "text",
        placeholder: "Your username",
        defaultValue: "",
        colSpan: 1,
        validations: z
          .string()
          .min(1, "Username is required")
          .max(20, "Username must not exceed 20 characters"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <Input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "email",
        label: "Email",
        description: "Enter your email address.",
        autoComplete: "email",
        type: "email",
        placeholder: "Your email",
        defaultValue: "",
        colSpan: 1,
        validations: z
          .string()
          .email("Enter a valid email address")
          .min(1, "Email is required"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <Input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "address",
        label: "Address",
        description: "Enter your full address.",
        autoComplete: "address-line1",
        type: "text",
        placeholder: "Your address",
        defaultValue: "",
        colSpan: 1,
        validations: z
          .string()
          .min(10, "Address should be at least 10 characters"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <Input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "phone",
        label: "Phone",
        description: "Enter your phone number with country code.",
        autoComplete: "tel",
        type: "tel",
        placeholder: "+1234567890",
        defaultValue: "",
        colSpan: 1,
        validations: z
          .string()
          .regex(/^\+?(\d.*){10,}$/, "Enter a valid phone number"),
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <Input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
      {
        key: "password",
        label: "Password",
        description: "Enter a strong password.",
        autoComplete: "new-password",
        type: "password",
        placeholder: "Your password",
        colSpan: 1,
        defaultValue: "",
        validations: z
          .string()
          .min(8, "Password should be at least 8 characters")
          .max(20, "Password must not exceed 20 characters"),
        displayConditions: [
          {
            dependentField: "email",
            dependentFieldValue: "admin@adimis.in",
            operator: "===",
          },
        ],
        removeValidationConditions: [
          {
            dependentField: "email",
            dependentFieldValue: "admin@adimis.in",
            operator: "!==",
          },
        ],
        render: ({
          formDisabled,
          formItem,
          formMethods,
          submitButtonLoading,
        }) => (
          <Input
            type={formItem.type}
            id={formItem.key}
            disabled={formDisabled || submitButtonLoading}
            style={{
              width: "100%",
              height: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px 0",
            }}
            {...formMethods.register(formItem.key)}
          />
        ),
      },
    ],
    defaultValues: {
      email: "adimis.ai.001@gmail.com",
      phone: "919625183597",
    },
    onSubmit: (values) =>
      console.log(
        "On Submit Example Form Response: ",
        JSON.stringify(values, null, 4)
      ),
    onInvalidSubmit: (values) =>
      console.log(
        "On Submit Invalid Example Form Response: ",
        JSON.stringify(values, null, 4)
      ),
  };

  return (
    <FormContext {...schemaFormProps}>
      <FormBody>
        <FormHeader>
          <FormTitle />
          <FormDescription />
        </FormHeader>
        <FormContent>
          <FormFlexFields fluid />
        </FormContent>
        <FormFooter>
          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </FormFooter>
      </FormBody>
    </FormContext>
  );
};

export default App;
```

## Exports

### `SchemaFormProvider`

Wraps the form and provides the schema form context to its children. This component initializes the form schema and context, making it available to all nested components.

### `FormContext`

The main context component that uses the form schema and methods. It provides access to form state and functions for interacting with the form.

### `FormBody`

The main body of the form. It wraps all form elements and handles form submission. It ensures that the form's structure and layout are maintained consistently.

### `FormHeader`

The header section of the form. It is used to display the form title and description, providing a clear context for the form's purpose.

### `FormFooter`

The footer section of the form. Typically used for submit buttons or other form actions, it ensures that user actions are clearly presented at the end of the form.

### `FormContent`

The content section of the form. It wraps the main form fields, organizing them within the form's structure.

### `FormTitle`

Displays the form title. This component is used within `FormHeader` to show the main heading of the form.

### `FormDescription`

Displays the form description. This component is used within `FormHeader` to provide additional context or instructions for the form.

### `FormFlexFields`

Renders form fields in a flexible grid layout. This component helps in creating responsive forms with customizable grid settings such as column count and gap size.

### `FormField`

Wraps individual form fields and connects them to the form context. It uses `react-hook-form`'s `Controller` component to manage field state and validation.

### `FieldItem`

A wrapper for individual form items, providing a consistent structure and context for form fields.

### `FieldLabel`

Renders the label for a form field. It ensures that labels are consistently styled and correctly associated with their corresponding input elements.

### `FieldControl`

Renders the control element (input, select, etc.) for a form field. It manages the state and attributes necessary for the field's functionality and accessibility.

### `FieldDescription`

Renders the description for a form field. This component provides additional information or instructions about the field's purpose or expected input.

### `FieldErrorMessage`

Displays error messages for form fields. It shows validation errors, helping users correct their inputs.

### `useFormField`

A hook for accessing the form field context and state. It provides field-level information and methods for interacting with the form.

### `useSchemaFormContext`

A hook for accessing the schema form context. It provides access to the form's state and methods, enabling interaction with the form at a higher level.

## Type Interface

```typescript
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
  options?: Array<{ label: string; value: string }>;
  /** Conditions for displaying the field based on other field values. */
  displayConditions?: DisplayCondition<TFieldValues>[];
  /** Conditions for removing validation from the field based on other field values. */
  removeValidationConditions?: ValidationCondition<TFieldValues>[];
  /** Custom render function for the field. */
  render: FieldRenderFunction<TFieldValues>;
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
export interface FormContextType<TFieldValues extends FieldValues> {
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
  /** HTML attributes for the form container element. */
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  /** HTML attributes for the form element. */
  formProps?: React.HTMLAttributes<HTMLFormElement>;
  /** The content to be rendered within the form body. */
  children: React.ReactNode;
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
```

## Contributing

We welcome contributions to `@adimis/react-formix`. If you have suggestions for new features, improvements, or bug fixes, please open an issue or submit a pull request on our GitHub repository.

## License

This project is licensed under the GPL-3.0-only License. See the [LICENSE](https://github.com/AdimisDev/adimis-react-formix/blob/main/License) file for details.
