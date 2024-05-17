import React from "react";
import { z } from "zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  FormBody,
  FormContent,
  FormixFormProvider,
  FormDescription,
  FormFlexFields,
  FormFooter,
  FormHeader,
  FormTitle,
} from "./components/form";
import { ISchemaFormProps } from "./interface/form.interface";

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

export interface ThemeStyle {
  container: {
    center: boolean;
    padding: string;
    screens: {
      "2xl": string;
      [key: string]: string;
    };
    [key: string]: boolean | string | { [key: string]: string };
  };
  extend: {
    colors: {
      border: string;
      input: string;
      ring: string;
      background: string;
      foreground: string;
      primary: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      secondary: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      destructive: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      muted: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      accent: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      popover: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      card: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      [key: string]: string | { [key: string]: string };
    };
    borderRadius: {
      lg: string;
      md: string;
      sm: string;
      [key: string]: string;
    };
    keyframes: {
      "accordion-down": {
        from: { height: string };
        to: { height: string };
      };
      "accordion-up": {
        from: { height: string };
        to: { height: string };
      };
      [key: string]: {
        from: { [key: string]: string };
        to: { [key: string]: string };
      };
    };
    animation: {
      "accordion-down": string;
      "accordion-up": string;
    };
    [key: string]: any;
  };
  [key: string]: any;
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

  // const theme: ThemeStyle = {
  //   container: {
  //     center: true,
  //     padding: "2rem",
  //     screens: {
  //       "2xl": "1400px",
  //     },
  //   },
  //   extend: {
  //     colors: {
  //       border: "var(--border)",
  //       input: "var(--input)",
  //       ring: "var(--ring)",
  //       background: "var(--background)",
  //       foreground: "var(--foreground)",
  //       primary: {
  //         DEFAULT: "var(--primary)",
  //         foreground: "var(--primary-foreground)",
  //       },
  //       secondary: {
  //         DEFAULT: "var(--secondary)",
  //         foreground: "var(--secondary-foreground)",
  //       },
  //       destructive: {
  //         DEFAULT: "var(--destructive)",
  //         foreground: "var(--destructive-foreground)",
  //       },
  //       muted: {
  //         DEFAULT: "var(--muted)",
  //         foreground: "var(--muted-foreground)",
  //       },
  //       accent: {
  //         DEFAULT: "var(--accent)",
  //         foreground: "var(--accent-foreground)",
  //       },
  //       popover: {
  //         DEFAULT: "var(--popover)",
  //         foreground: "var(--popover-foreground)",
  //       },
  //       card: {
  //         DEFAULT: "#141414",
  //         foreground: "var(--card-foreground)",
  //       },
  //     },
  //     borderRadius: {
  //       lg: "var(--radius)",
  //       md: "calc(var(--radius) - 2px)",
  //       sm: "calc(var(--radius) - 4px)",
  //     },
  //     keyframes: {
  //       "accordion-down": {
  //         from: { height: "0" },
  //         to: { height: "var(--radix-accordion-content-height)" },
  //       },
  //       "accordion-up": {
  //         from: { height: "var(--radix-accordion-content-height)" },
  //         to: { height: "0" },
  //       },
  //     },
  //     animation: {
  //       "accordion-down": "accordion-down 0.2s ease-out",
  //       "accordion-up": "accordion-up 0.2s ease-out",
  //     },
  //   },
  // };

  return (
    <FormixFormProvider {...schemaFormProps}>
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
    </FormixFormProvider>
  );
};

export default App;
