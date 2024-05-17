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
import { ThemeProvider } from "./context/theme.provider";

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
            <FormFlexFields fluid />
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
