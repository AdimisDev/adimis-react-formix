import "./src/style/global.css";
import { useFormix } from "./src/hooks/useFormix";
import FormixProvider from "./src/context/form.provider";
import { ThemeProvider, useTheme } from "@/context/theme.provider";
import {
  FieldDescription,
  FormBody,
  FormContent,
  FormixFormProvider,
  FieldControl,
  FormDescription,
  FormField,
  FormFlexFields,
  FormFooter,
  FormHeader,
  FieldItem,
  FieldLabel,
  FormTitle,
  useFormField,
  FieldErrorMessage,
} from "./src/components/form";

export * from "./src/interface/form.interface";
export {
  useFormix,
  FormixProvider,
  ThemeProvider,
  useTheme,
  FieldDescription,
  FormBody,
  FormContent,
  FormixFormProvider,
  FieldControl,
  FormDescription,
  FormField,
  FormFlexFields,
  FormFooter,
  FormHeader,
  FieldItem,
  FieldLabel,
  FormTitle,
  useFormField,
  FieldErrorMessage,
};
