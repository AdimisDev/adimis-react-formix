# @adimis/react-formix

Welcome to `@adimis/react-formix`, the ultimate React library for creating dynamic, schema-based forms. Built with modern web development in mind, this library harnesses the power of React, Zod for robust schema validation, and react-hook-form for seamless form state management. Whether you need to build custom forms from the ground up or use prebuilt components for rapid deployment, `@adimis/react-formix` is your go-to solution.

## Key Features

- **Schema-Based Form Generation**: Define your form fields and validation rules using a JSON schema.
- **Zod-Powered Validation**: Leverage Zod for strong data validation and meaningful feedback.
- **Flexible Layout Options**: Create responsive and dynamic form layouts effortlessly.
- **Conditional Rendering**: Dynamically show or hide form fields based on other field values.
- **State Persistence**: Save and restore form state using local storage or session storage.
- **Custom Render Functions**: Specify custom render functions inside the schema array's object.
- **TypeScript Support**: Utilize generic TypeScript typing for form field types.
- **Dynamic Field Visibility**: Update field visibility in real-time based on user input.
- **Dynamic Validation**: Remove field validations dynamically based on specific conditions.
- **Developer Tools**: Integrate developer tools for debugging and inspecting form state.
- **Customizable Themes**: Adapt form themes to align with your application's design.
- **Latest React and Next.js Support**: Ensure compatibility with modern web development practices.

## Installation and Setup

1. **Install the package via npm:**

   ```bash
   npm install @adimis/react-formix
   ```

2. **Import the style in your `main.tsx` or `index.tsx` file:**

   ```typescript
   import "@adimis/react-formix/dist/style.css";
   ```

3. **Install and setup Tailwind CSS:** [Tailwind CSS Docs](https://tailwindcss.com/)

4. **Add the following to your `index.css` file:**

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     :root {
       --background: #ffffff;
       --foreground: #0a0f1a;
       --card: #ffffff;
       --card-foreground: #0a0f1a;
       --popover: #ffffff;
       --popover-foreground: #0a0f1a;
       --primary: #1d2b53;
       --primary-foreground: #e6f7ff;
       --secondary: #eaf3ff;
       --secondary-foreground: #1d2b53;
       --muted: #eaf3ff;
       --muted-foreground: #697a96;
       --accent: #eaf3ff;
       --accent-foreground: #1d2b53;
       --destructive: #f97066;
       --destructive-foreground: #e6f7ff;
       --border: #d8e1ed;
       --input: #d8e1ed;
       --ring: #0a0f1a;
       --radius: 0.5rem;
     }

     .dark {
       --background: #0a0f1a;
       --foreground: #e6f7ff;
       --card: #0a0f1a;
       --card-foreground: #e6f7ff;
       --popover: #0a0f1a;
       --popover-foreground: #e6f7ff;
       --primary: #e6f7ff;
       --primary-foreground: #1d2b53;
       --secondary: #1f2c38;
       --secondary-foreground: #e6f7ff;
       --muted: #1f2c38;
       --muted-foreground: #99aabb;
       --accent: #1f2c38;
       --accent-foreground: #e6f7ff;
       --destructive: #66171d;
       --destructive-foreground: #e6f7ff;
       --border: #1f2c38;
       --input: #1f2c38;
       --ring: #a3b5c6;
     }
   }

   @layer base {
     * {
       @apply border-border;
     }

     body {
       @apply bg-background text-foreground;
     }
   }
   ```

5. **Install required dependencies:**

   ```bash
   npm i tailwindcss-animate
   ```

6. **Setup your `tsconfig.config.js` file:**

   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     darkMode: ["class"],
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
       container: {
         center: true,
         padding: "2rem",
         screens: {
           "2xl": "1400px",
         },
       },
       extend: {
         colors: {
           border: "var(--border)",
           input: "var(--input)",
           ring: "var(--ring)",
           background: "var(--background)",
           foreground: "var(--foreground)",
           primary: {
             DEFAULT: "var(--primary)",
             foreground: "var(--primary-foreground)",
           },
           secondary: {
             DEFAULT: "var(--secondary)",
             foreground: "var(--secondary-foreground)",
           },
           destructive: {
             DEFAULT: "var(--destructive)",
             foreground: "var(--destructive-foreground)",
           },
           muted: {
             DEFAULT: "var(--muted)",
             foreground: "var(--muted-foreground)",
           },
           accent: {
             DEFAULT: "var(--accent)",
             foreground: "var(--accent-foreground)",
           },
           popover: {
             DEFAULT: "var(--popover)",
             foreground: "var(--popover-foreground)",
           },
           card: {
             DEFAULT: "var(--card)",
             foreground: "var(--card-foreground)",
           },
         },
         borderRadius: {
           lg: "var(--radius)",
           md: "calc(var(--radius) - 2px)",
           sm: "calc(var(--radius) - 4px)",
         },
         keyframes: {
           "accordion-down": {
             from: { height: "0" },
             to: { height: "var(--radix-accordion-content-height)" },
           },
           "accordion-up": {
             from: { height: "var(--radix-accordion-content-height)" },
             to: { height: "0" },
           },
         },
         animation: {
           "accordion-down": "accordion-down 0.2s ease-out",
           "accordion-up": "accordion-up 0.2s ease-out",
         },
       },
     },
     plugins: [require("tailwindcss-animate")],
   };
   ```

## Usage

Here's an example of how to create a basic signup form using `@adimis/react-formix`:

```tsx
"use client";

import { z } from "zod";
import { Input } from "./components/input";
import { Button } from "./components/button";
import {
  FormBody,
  FormContent,
  FormixFormProvider,
  FormDescription,
  FormFlexFields,
  FormFooter,
  FormHeader,
  FormTitle,
  ISchemaFormProps,
  ThemeProvider,
} from "@adimis/react-formix"; // 120.3k (gzipped: 34.3k)
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
    <ThemeProvider defaultTheme="dark">
      <FormixFormProvider {...schemaFormProps}>
        <FormBody>
          <FormHeader>
            <FormTitle />
            <FormDescription />
          </FormHeader>
          <FormContent>
            <FormFlexFields fluid columns={2} />
          </FormContent>
          <FormFooter>
            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </FormFooter>
        </FormBody>
      </FormixFormProvider>
    </ThemeProvider>
  );
};

export default App;
```

## Exports

### Core Components

#### `FormixProvider`

Wraps the form and provides the Formix context to its children. This component initializes the form schema and context, making it accessible to all nested components.

#### `useFormix`

A hook for accessing the Formix context. It provides access to the form's state and methods, enabling high-level interaction with the form.

### Styled Components

#### `FormixFormProvider`

The primary context component that utilizes the form schema and methods. It offers access to form state and functions for seamless form interaction.

#### `FormBody`

The main body of the form. It wraps all form elements and handles form submission, maintaining a consistent structure and layout.

#### `FormHeader`

The header section of the form, used to display the form title and description, providing clear context for the form's purpose.

#### `FormFooter`

The footer section of the form, typically used for submit buttons or other form actions, ensuring user actions are clearly presented at the end of the form.

#### `FormContent`

The content section of the form, wrapping the main form fields and organizing them within the form's structure.

#### `FormTitle`

Displays the form title. This component is used within `FormHeader` to show the main heading of the form.

#### `FormDescription`

Displays the form description. This component is used within `FormHeader` to provide additional context or instructions for the form.

#### `FormFlexFields`

Renders form fields in a flexible grid layout, helping in creating responsive forms with customizable grid settings such as column count and gap size.

#### `FormField`

Wraps individual form fields and connects them to the form context using `react-hook-form`'s `Controller` component to manage field state and validation.

#### `FieldItem`

A wrapper for individual form items, providing a consistent structure and context for form fields.

#### `FieldLabel`

Renders the label for a form field, ensuring that labels are consistently styled and correctly associated with their corresponding input elements.

#### `FieldControl`

Renders the control element (input, select, etc.) for a form field, managing the state and attributes necessary for the field's functionality and accessibility.

#### `FieldDescription`

Renders the description for a form field, providing additional information or instructions about the field's purpose or expected input.

#### `FieldErrorMessage`

Displays error messages for form fields, showing validation errors to help users correct their inputs.

#### `useFormField`

A hook for accessing the form field context and state, providing field-level information and methods for interacting with the form.

#### `ThemeProvider`

Provides theme context to its children, allowing for dynamic theme changes and customization across the application.

#### `useTheme`

A hook for accessing the theme context, providing the current theme and a function to update the theme.

## Contributing

We welcome contributions to `@adimis/react-formix`. If you have suggestions for new features, improvements, or bug fixes, please open an issue or submit a pull request on our [GitHub repository](https://github.com/AdimisDev/adimis-react-formix).

## License

This project is licensed under the GPL-3.0-only License. See the [LICENSE](https://github.com/AdimisDev/adimis-react-formix/blob/main/License) file for details.

## Additional Information

For detailed documentation, refer to the `docs` folder. Open the `index.html` file located at `node_modules/@adimis/react-formix/docs/index.html` in a live server to access the documentation.
