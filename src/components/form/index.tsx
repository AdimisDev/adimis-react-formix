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
import SchemaFormProvider from "@/context/form.provider";
import { useSchemaFormContext } from "@/hooks";

/**
 * Provides a context for the form using the SchemaFormProvider.
 */
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

/**
 * Hook for accessing the FormBodyContext.
 * @throws {Error} If used outside of a FormBody component.
 */
const useFormBodyContext = () => {
  const context = React.useContext(FormBodyContext);
  if (!context) {
    throw new Error("Form components must be used within <FormBody>.");
  }
  return context;
};

/**
 * Hook for accessing the FormHeaderContext.
 * @throws {Error} If used outside of a FormHeader component.
 */
const useFormHeaderContext = () => {
  const context = React.useContext(FormHeaderContext);
  if (!context) {
    throw new Error(
      "FormTitle and FormDescription must be used within <FormHeader>."
    );
  }
  return context;
};

/**
 * Hook for accessing form field context and state.
 * @returns {UseFormFieldReturn} The form field context and state.
 * @throws {Error} If used outside of a FormField component.
 */
const useFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(): UseFormFieldReturn<TFieldValues, TName> => {
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
    name: fieldContext.name as TName,
    fieldItemId: `${id}-form-item`,
    fieldDescriptionId: `${id}-form-item-description`,
    fieldMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/**
 * Component for the main body of the form.
 * Expected Parent: None (It serves as the main wrapper for the form).
 * @param {FormBodyProps} props - The properties for the form body.
 * @returns {JSX.Element} The FormBody component.
 */
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

/**
 * Component for the header section of the form.
 * Expected Parent: FormBody.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the form header.
 * @returns {JSX.Element} The FormHeader component.
 */
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

/**
 * Component for the footer section of the form.
 * Expected Parent: FormBody.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the form footer.
 * @returns {JSX.Element} The FormFooter component.
 */
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

/**
 * Component for the content section of the form.
 * Expected Parent: FormBody.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the form content.
 * @returns {JSX.Element} The FormContent component.
 */
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

/**
 * Component for the title of the form.
 * Expected Parent: FormHeader.
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - The properties for the form title.
 * @returns {JSX.Element} The FormTitle component.
 */
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

/**
 * Component for the description of the form.
 * Expected Parent: FormHeader.
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The properties for the form description.
 * @returns {JSX.Element} The FormDescription component.
 */
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

/**
 * Component for rendering flexible form fields in a grid layout.
 * Expected Parent: FormBody or any context where SchemaFormProvider is used (due to useSchemaFormContext).
 * @param {FormFlexFieldProps} props - The properties for the flexible form fields.
 * @returns {JSX.Element} The FormFlexFields component.
 */
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

/**
 * Component for rendering a form field using react-hook-form's Controller.
 * Expected Parent: FormFlexFields or directly within FormBody.
 * @template TFieldValues - The type of field values.
 * @template TName - The name of the field.
 * @param {ControllerProps<TFieldValues, TName>} props - The properties for the Controller component.
 * @returns {JSX.Element} The FormField component.
 */
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
FormField.displayName = "FormField";

/**
 * Component for wrapping individual form items with context.
 * Expected Parent: FormField.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The properties for the div element.
 * @returns {JSX.Element} The FieldItem component.
 */
const FieldItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();
  const fieldContext = React.useContext(FormFieldContext);

  if (!fieldContext) {
    throw new Error("FieldItem must be used within <FormField>");
  }

  return (
    <FieldItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FieldItemContext.Provider>
  );
});
FieldItem.displayName = "FieldItem";

/**
 * Component for rendering a form field label.
 * Expected Parent: FieldItem.
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - The properties for the LabelPrimitive.Root component.
 * @returns {JSX.Element} The FieldLabel component.
 */
const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, fieldItemId } = useFormField();
  const itemContext = React.useContext(FieldItemContext);

  if (!itemContext.id) {
    throw new Error("FieldLabel must be used within <FieldItem>");
  }

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

/**
 * Component for rendering a form field control.
 * Expected Parent: FieldItem.
 * @param {React.ComponentPropsWithoutRef<typeof Slot>} props - The properties for the Slot component.
 * @returns {JSX.Element} The FieldControl component.
 */
const FieldControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, fieldItemId, fieldDescriptionId, fieldMessageId } =
    useFormField();
  const itemContext = React.useContext(FieldItemContext);

  if (!itemContext.id) {
    throw new Error("FieldControl must be used within <FieldItem>");
  }

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

/**
 * Component for rendering a form field description.
 * Expected Parent: FieldItem.
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The properties for the paragraph element.
 * @returns {JSX.Element} The FieldDescription component.
 */
const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { fieldDescriptionId } = useFormField();
  const itemContext = React.useContext(FieldItemContext);

  if (!itemContext.id) {
    throw new Error("FieldDescription must be used within <FieldItem>");
  }

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

/**
 * Component for rendering a form field error message.
 * Expected Parent: FieldItem.
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - The properties for the paragraph element.
 * @returns {JSX.Element | null} The FieldErrorMessage component, or null if there's no error message.
 */
const FieldErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
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
