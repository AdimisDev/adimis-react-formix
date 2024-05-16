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
- **Customizable Theme:** Customize form themes to match your application's design.
- **Latest React and NextJs Support:** Built to support the latest versions of React and Next.js for modern web development.

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
  ThemeProvider,
  ThemeColors,
} from "@adimis/react-formix";
import "@adimis/react-formix/dist/style.css";

interface SignUp {
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  gender: string;
  terms: boolean;
  file: File;
  date: Date;
  year: number;
  expertise: string[];
}

const Form = () => {
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
        validations: z
          .string()
          .min(1, "Username is required")
          .max(20, "Username must not exceed 20 characters"),
      },
      {
        key: "email",
        label: "Email",
        description: "Enter your email address.",
        autoComplete: "email",
        type: "email",
        placeholder: "Your email",
        defaultValue: "",
        validations: z
          .string()
          .email("Enter a valid email address")
          .min(1, "Email is required"),
      },
      {
        key: "address",
        label: "Address",
        description: "Enter your full address.",
        autoComplete: "address-line1",
        type: "text",
        placeholder: "Your address",
        defaultValue: "",
        validations: z
          .string()
          .min(10, "Address should be at least 10 characters"),
      },
      {
        key: "phone",
        label: "Phone",
        description: "Enter your phone number with country code.",
        autoComplete: "tel",
        type: "tel",
        placeholder: "+1234567890",
        defaultValue: "",
        validations: z
          .string()
          .regex(/^\+?(\d.*){10,}$/, "Enter a valid phone number"),
      },
      {
        key: "password",
        label: "Password",
        description: "Enter a strong password.",
        autoComplete: "new-password",
        type: "password",
        placeholder: "Your password",
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

  const themeColors: ThemeColors = {
    root: {
      background: "#ffffff",
      foreground: "#1e1e1e",
      card: "#ffffff",
      "card-foreground": "#1e1e1e",
      popover: "#ffffff",
      "popover-foreground": "#1e1e1e",
      primary: "#3b82f6",
      "primary-foreground": "#d9eefe",
      secondary: "#f3f4f6",
      "secondary-foreground": "#2e2e2e",
      muted: "#f3f4f6",
      "muted-foreground": "#68737d",
      accent: "#f3f4f6",
      "accent-foreground": "#2e2e2e",
      destructive: "#ff6b6b",
      "destructive-foreground": "#d9eefe",
      border: "#d1d5db",
      input: "#d1d5db",
      ring: "#3b82f6",
      radius: "1rem",
    },
    dark: {
      background: "#1e1e1e",
      foreground: "#d9eefe",
      card: "#1e1e1e",
      "card-foreground": "#d9eefe",
      popover: "#1e1e1e",
      "popover-foreground": "#d9eefe",
      primary: "#4f46e5",
      "primary-foreground": "#2e2e2e",
      secondary: "#1f2937",
      "secondary-foreground": "#d9eefe",
      muted: "#1f2937",
      "muted-foreground": "#a0aec0",
      accent: "#1f2937",
      "accent-foreground": "#d9eefe",
      destructive: "#b91c1c",
      "destructive-foreground": "#d9eefe",
      border: "#1f2937",
      input: "#1f2937",
      ring: "#609ff2",
    },
  };

  return (
    <ThemeProvider defaultTheme="dark" themeColors={themeColors}>
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
            <button
              type="submit"
              style={{
                backgroundColor: "#111111",
                color: "#f1f1f1",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Submit
            </button>
          </FormFooter>
        </FormBody>
      </FormContext>
    </ThemeProvider>
  );
};

export default Form;
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

### `ThemeProvider`

Provides theme context to its children, allowing for dynamic theme changes and customization across the application.

### `useTheme`

A hook for accessing the theme context. It provides the current theme and a function to update the theme.

## Contributing

We welcome contributions to `@adimis/react-formix`. If you have suggestions for new features, improvements, or bug fixes, please open an issue or submit a pull request on our GitHub repository.

## License

This project is licensed under the GPL-3.0-only License. See the [LICENSE](https://github.com/AdimisDev/adimis-react-formix/blob/main/License) file for details.

## Additional Information

You can find detailed documentation in the docs folder. Open the index.html file located at `node_modules\@adimis\react-formix\docs\index.html` in a live server to access the documentation.
