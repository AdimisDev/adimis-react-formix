import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  FieldItemContextValue,
  FormBodyProps,
  FormFieldContextValue,
  FormFlexFieldProps,
  UseFormFieldReturn,
} from "@/interface/form.interface";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import FormixProvider from "@/context/form.provider";
import { useFormix } from "@/hooks";

const FormixFormProvider = FormixProvider;

const PanelContext = React.createContext<boolean>(true);
const FormBodyContext = React.createContext<boolean>(false);
const FormHeaderContext = React.createContext<boolean>(false);
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);
const FieldItemContext = React.createContext<FieldItemContextValue>(
  {} as FieldItemContextValue
);

const useFormBodyContext = () => {
  const context = React.useContext(FormBodyContext);
  if (!context) {
    throw new Error("Form components must be used within <FormBody>.");
  }
  return context;
};

const useFormHeaderContext = () => {
  const context = React.useContext(FormHeaderContext);
  if (!context) {
    throw new Error(
      "FormTitle and FormDescription must be used within <FormHeader>."
    );
  }
  return context;
};

const useFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(): UseFormFieldReturn<TFieldValues, TName> => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FieldItemContext);
  const { formMethods } = useFormix();
  const { getFieldState, formState } = formMethods;

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name as TName,
    fieldItemId: `${id}-form-item`,
    fieldDescriptionId: `${id}-form-item-description`,
    fieldMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormBody = ({
  panel = true,
  containerProps,
  formProps,
  children,
}: FormBodyProps) => {
  const { handleOnSubmit, handleOnInvalidSubmit, formMethods } = useFormix();
  const Container = panel ? Card : "div";

  return (
    <FormBodyContext.Provider value={true}>
      <PanelContext.Provider value={panel}>
        <Container {...containerProps}>
          <form
            onSubmit={formMethods.handleSubmit(
              handleOnSubmit,
              handleOnInvalidSubmit
            )}
            {...formProps}
          >
            {children}
          </form>
        </Container>
      </PanelContext.Provider>
    </FormBodyContext.Provider>
  );
};

const FormHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  useFormBodyContext();
  const panel = React.useContext(PanelContext);
  const Header = panel ? CardHeader : "div";
  return (
    <FormHeaderContext.Provider value={true}>
      <Header className={cn(className)} {...props}>
        {children}
      </Header>
    </FormHeaderContext.Provider>
  );
};

const FormFooter = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  useFormBodyContext();
  const panel = React.useContext(PanelContext);
  const Footer = panel ? CardFooter : "div";
  return (
    <Footer className={cn(className)} {...props}>
      {children}
    </Footer>
  );
};

const FormContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  useFormBodyContext();
  const panel = React.useContext(PanelContext);
  const Content = panel ? CardContent : "div";
  return (
    <Content className={cn(className)} {...props}>
      {children}
    </Content>
  );
};

const FormTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  useFormHeaderContext();
  const panel = React.useContext(PanelContext);
  const Title = panel ? CardTitle : "h2";
  const { formLabel } = useFormix();
  return (
    <Title className={cn(className)} {...props}>
      {children ? children : formLabel}
    </Title>
  );
};

const FormDescription = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  useFormHeaderContext();
  const panel = React.useContext(PanelContext);
  const { formDescription } = useFormix();
  const Description = panel ? CardDescription : "p";
  return (
    <Description className={cn(className)} {...props}>
      {children ? children : formDescription}
    </Description>
  );
};

const FormFlexFields = <TFieldValues extends FieldValues = FieldValues>({
  fluid = false,
  style,
  className,
  columns = 1,
  gap = "16px",
}: FormFlexFieldProps) => {
  const { formMethods, formFields } = useFormix<TFieldValues>();
  const { control } = formMethods;

  return (
    <div
      style={{
        ...(!fluid && style),
        ...(fluid && {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gap,
          ...style,
        }),
      }}
      className={className}
    >
      {formFields.map((formField, index) => (
        <div
          key={index}
          style={
            !fluid || formField.fieldStyle
              ? formField.fieldStyle
              : {
                  maxWidth: "100%",
                }
          }
          className={formField.fieldClassName}
        >
          <FormField
            control={control}
            name={formField.key}
            render={({ field }) => (
              <FieldItem>
                <FieldLabel />
                <FieldControl>
                  <Input placeholder={formField.placeholder} {...field} />
                </FieldControl>
                <FieldDescription>{formField.description}</FieldDescription>
                <FieldErrorMessage />
              </FieldItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FieldItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const id = React.useId();
  const fieldContext = React.useContext(FormFieldContext);

  if (!fieldContext) {
    throw new Error("FieldItem must be used within <FormField>");
  }

  return (
    <FieldItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FieldItemContext.Provider>
  );
};

const FieldLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) => {
  const { error, fieldItemId } = useFormField();
  const itemContext = React.useContext(FieldItemContext);

  if (!itemContext.id) {
    throw new Error("FieldLabel must be used within <FieldItem>");
  }

  return (
    <Label
      className={cn(error && "text-destructive", className)}
      htmlFor={fieldItemId}
      {...props}
    />
  );
};

const FieldControl = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot>) => {
  const { error, fieldItemId, fieldDescriptionId, fieldMessageId } =
    useFormField();
  const itemContext = React.useContext(FieldItemContext);

  if (!itemContext.id) {
    throw new Error("FieldControl must be used within <FieldItem>");
  }

  return (
    <Slot
      id={fieldItemId}
      aria-describedby={
        !error
          ? `${fieldDescriptionId}`
          : `${fieldDescriptionId} ${fieldMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};

const FieldDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { fieldDescriptionId } = useFormField();
  const itemContext = React.useContext(FieldItemContext);

  if (!itemContext.id) {
    throw new Error("FieldDescription must be used within <FieldItem>");
  }

  return (
    <p
      id={fieldDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

const FieldErrorMessage = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { error, fieldMessageId } = useFormField();
  const itemContext = React.useContext(FieldItemContext);

  if (!itemContext.id) {
    throw new Error("FieldErrorMessage must be used within <FieldItem>");
  }

  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={fieldMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
};

export {
  useFormField,
  FormixFormProvider,
  FormBody,
  FieldItem,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldErrorMessage,
  FormField,
  FormFlexFields,
  FormContent,
  FormHeader,
  FormFooter,
  FormTitle,
  FormDescription,
};
