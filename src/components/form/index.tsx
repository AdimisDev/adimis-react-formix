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
import SchemaFormProvider from "@/context/form.provider";
import { useSchemaFormContext } from "@/hooks";

const FormContext = SchemaFormProvider;

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

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FieldItemContext);
  const { formMethods } = useSchemaFormContext();
  const { getFieldState, formState } = formMethods;

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    fieldItemId: `${id}-form-item`,
    fieldDescriptionId: `${id}-form-item-description`,
    fieldMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormBody = React.forwardRef<
  HTMLFormElement | HTMLDivElement,
  FormBodyProps
>(
  (
    { panel = true, containerProps, formProps, children },
    ref: React.LegacyRef<HTMLFormElement | HTMLDivElement>
  ) => {
    const { handleOnSubmit, handleOnInvalidSubmit, formMethods } =
      useSchemaFormContext();
    const Container = panel ? Card : "div";

    return (
      <FormBodyContext.Provider value={true}>
        <PanelContext.Provider value={panel}>
          <Container
            {...containerProps}
            ref={ref as React.LegacyRef<HTMLDivElement>}
          >
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
  }
);
FormBody.displayName = "FormBody";

const FormHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  useFormBodyContext();
  const panel = React.useContext(PanelContext);
  const Header = panel ? CardHeader : "div";
  return (
    <FormHeaderContext.Provider value={true}>
      <Header ref={ref} className={cn(className)} {...props}>
        {children}
      </Header>
    </FormHeaderContext.Provider>
  );
});
FormHeader.displayName = "FormHeader";

const FormFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  useFormBodyContext();
  const panel = React.useContext(PanelContext);
  const Footer = panel ? CardFooter : "div";
  return (
    <Footer ref={ref} className={cn(className)} {...props}>
      {children}
    </Footer>
  );
});
FormFooter.displayName = "FormFooter";

const FormContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  useFormBodyContext();
  const panel = React.useContext(PanelContext);
  const Content = panel ? CardContent : "div";
  return (
    <Content ref={ref} className={cn(className)} {...props}>
      {children}
    </Content>
  );
});
FormContent.displayName = "FormContent";

const FormTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  useFormHeaderContext();
  const panel = React.useContext(PanelContext);
  const Title = panel ? CardTitle : "h2";
  const { formLabel } = useSchemaFormContext();
  return (
    <Title ref={ref} className={cn(className)} {...props}>
      {children ? children : formLabel}
    </Title>
  );
});
FormTitle.displayName = "FormTitle";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  useFormHeaderContext();
  const panel = React.useContext(PanelContext);
  const { formDescription } = useSchemaFormContext();
  const Description = panel ? CardDescription : "p";
  return (
    <Description ref={ref} className={cn(className)} {...props}>
      {children ? children : formDescription}
    </Description>
  );
});
FormDescription.displayName = "FormDescription";

const FormFlexFields = <TFieldValues extends FieldValues = FieldValues>({
  fluid = false,
  style,
  className,
  columns = 2,
  gap = "16px",
}: FormFlexFieldProps) => {
  const { formMethods, formFields } = useSchemaFormContext<TFieldValues>();
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
                  maxWidth: "90%",
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

// SECTION: Form Fields Components
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

const FieldItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FieldItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FieldItemContext.Provider>
  );
});
FieldItem.displayName = "FieldItem";

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, fieldItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={fieldItemId}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

const FieldControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, fieldItemId, fieldDescriptionId, fieldMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
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
});
FieldControl.displayName = "FieldControl";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { fieldDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={fieldDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

const FieldErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, fieldMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={fieldMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FieldErrorMessage.displayName = "FieldErrorMessage";

export {
  useFormField,
  FormContext,
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
