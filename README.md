# @adimis/react-formix

## Overview

Welcome to `@adimis/react-formix`, a versatile and powerful React library for creating dynamic forms using a schema-based approach. This library leverages the power of React, Zod for schema validation, and react-hook-form for form state management. Whether you need to create a custom form from scratch using the `SchemaFormProvider` and `FormContext` or utilize prebuilt components for rapid development, `@adimis/react-formix` has you covered.

## Features

- **Schema-based form generation**: Define your form fields and validation rules using a JSON schema.
- **Built-in validation with Zod**: Ensure data integrity and provide meaningful feedback to users.
- **Flexible layout options**: Easily create responsive form layouts with `FormFlexFields`.
- **Conditional rendering**: Show or hide form fields based on the values of other fields.
- **Persist form state**: Save and restore form state using local storage or session storage.
- **Customizable form components**: Use prebuilt components or create your own custom render functions.

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

## Contributing

We welcome contributions to `@adimis/react-formix`. If you have suggestions for new features, improvements, or bug fixes, please open an issue or submit a pull request on our GitHub repository.

## License

This project is licensed under the GPL-3.0-only License. See the [LICENSE](LICENSE) file for details.
