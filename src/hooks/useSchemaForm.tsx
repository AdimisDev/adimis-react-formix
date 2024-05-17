import { useCallback, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Path,
  useForm,
  useWatch,
  FieldValues,
  FieldErrors,
  DeepPartialSkipArrayKey,
} from "react-hook-form";
import {
  ISchemaFormProps,
  RenderFlexFieldsProps,
  RenderFormProps,
  UseSchemaFormReturn,
} from "../interface/form.interface";
import {
  onChangeRemoveValidationCheck,
  onErrorRemoveValidationCheck,
} from "../utils/removeValidationCheck";
import { updateFieldVisibility } from "../utils/updateFieldVisibility";
import { generateDynamicSchema } from "../utils/generateDynamicSchema";
import { getInitialValues } from "../utils/getInitialValues";
import { handleStorage } from "../utils/handleStorage";
import { useEnterKeySubmit } from "./useEnterKeySubmit";

/**
 * Custom hook for handling schema-based forms with validation and conditional rendering.
 * @template TFieldValues - The type of field values.
 * @param {ISchemaFormProps<TFieldValues>} props - Properties for the schema form.
 * @returns {UseSchemaFormReturn<TFieldValues>} - The state and methods for managing the schema form.
 * The useSchemaForm hook is designed to manage complex forms with dynamic schemas, conditional rendering, and custom validation logic. It simplifies the process of creating forms by handling state management, validation, and rendering in a standardized way. This hook can be particularly useful in applications where forms need to be dynamically generated based on schemas and where the visibility and validation of fields depend on the values of other fields.
 */
const useSchemaForm = <TFieldValues extends FieldValues>(
  props: ISchemaFormProps<TFieldValues>
): UseSchemaFormReturn<TFieldValues> => {
  const {
    schema,
    formSlug,
    formLabel,
    criteriaMode,
    formDisabled,
    defaultValues,
    validationMode,
    reValidateMode,
    formDescription,
    persistFormResponse,
    onSubmit,
    onInvalidSubmit,
    onChange,
    enableConditionalRendering = false,
    enableValidations = true,
  } = props;

  /** Unique key for the form, based on the form slug. */
  const formKey = useMemo(() => `adimis-schema-form-${formSlug}`, [formSlug]);

  /** Generate dynamic Zod schema based on the field schema. */
  const zodSchema = useMemo(() => generateDynamicSchema(schema), [schema]);

  /** State for managing the loading state of the submit button. */
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  /** State for tracking which fields can have their validations removed. */
  const [canRemoveValidationForFields, setCanRemoveValidationForFields] =
    useState<Record<string, boolean>>({});

  /** State for tracking which fields are visible. */
  const [visibleFields, setVisibleFields] = useState<Set<Path<TFieldValues>>>(
    new Set(schema?.map((item) => item.key) || [])
  );

  /** Initial values for the form fields, possibly fetched from storage. */
  const initialValues = useMemo(
    () =>
      getInitialValues<TFieldValues>(
        formKey,
        schema,
        persistFormResponse,
        defaultValues
      ),
    [formKey, schema, persistFormResponse, defaultValues]
  );

  /** Methods from react-hook-form for managing form state and validation. */
  const formMethods = useForm<TFieldValues>({
    defaultValues: initialValues,
    mode: validationMode ?? "onChange",
    criteriaMode: criteriaMode ?? "all",
    reValidateMode: reValidateMode ?? "onChange",
    resolver: enableValidations ? zodResolver(zodSchema) : undefined,
  });

  /**
   * Handler for form submission.
   * @param {TFieldValues} values - The form values.
   */
  const handleOnSubmit = useCallback(
    async (values: TFieldValues) => {
      setSubmitButtonLoading(true);
      try {
        if (onSubmit) {
          await onSubmit(values);
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      } finally {
        setSubmitButtonLoading(false);
      }
    },
    [onSubmit]
  );

  /**
   * Handler for invalid form submission.
   * @param {FieldErrors<TFieldValues>} errors - The form validation errors.
   */
  const handleOnInvalidSubmit = useCallback(
    async (errors: FieldErrors<TFieldValues>) => {
      console.log("Validation errors:", errors);
      setSubmitButtonLoading(true);

      const stripRefsFromErrors = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(stripRefsFromErrors);
        } else if (obj && typeof obj === "object") {
          const newObj: any = {};
          for (const key of Object.keys(obj)) {
            if (key !== "ref") {
              newObj[key] = stripRefsFromErrors(obj[key]);
            }
          }
          return newObj;
        }
        return obj;
      };

      const sanitizedErrors = stripRefsFromErrors(errors);
      console.log("Sanitized validation errors:", sanitizedErrors);

      if (enableConditionalRendering) {
        const formResponse = formMethods.getValues();
        const isValidForSubmission = onErrorRemoveValidationCheck<TFieldValues>(
          sanitizedErrors,
          schema,
          formResponse,
          setCanRemoveValidationForFields
        );

        console.log("Form response:", formResponse);

        try {
          if (isValidForSubmission && onSubmit) {
            await onSubmit(formResponse);
          } else if (onInvalidSubmit) {
            await onInvalidSubmit(sanitizedErrors);
          }
        } catch (error) {
          console.error("Error during form submission process:", error);
        } finally {
          setSubmitButtonLoading(false);
        }
      } else {
        console.log(
          "Conditional rendering is disabled. Processing errors directly."
        );
        try {
          if (onInvalidSubmit) {
            await onInvalidSubmit(sanitizedErrors);
          }
        } catch (error) {
          console.error("Error during form submission process:", error);
        } finally {
          setSubmitButtonLoading(false);
        }
      }
    },
    [formMethods, schema, enableConditionalRendering, onSubmit, onInvalidSubmit]
  );

  /** Watch for changes in form values. */
  const formValues = useWatch<TFieldValues>({
    control: formMethods.control,
  });

  /**
   * Effect to handle changes in form values.
   * Triggers the onChange callback if provided.
   */
  useEffect(() => {
    if (onChange) {
      onChange(
        formValues,
        formMethods.formState.errors,
        canRemoveValidationForFields
      );
    }
  }, [
    formValues,
    formMethods.formState.errors,
    canRemoveValidationForFields,
    onChange,
  ]);

  /**
   * Effect to handle conditional rendering and visibility of fields.
   */
  useEffect(() => {
    if (enableConditionalRendering) {
      onChangeRemoveValidationCheck<TFieldValues>(
        schema,
        formValues,
        setCanRemoveValidationForFields
      );
      updateFieldVisibility<TFieldValues>(schema, formValues, setVisibleFields);
    }
  }, [formValues, schema, enableConditionalRendering]);

  /**
   * Effect to handle persistence of form responses in storage.
   */
  useEffect(() => {
    handleStorage<DeepPartialSkipArrayKey<TFieldValues>>(
      formKey,
      formValues,
      persistFormResponse
    );
  }, [formValues, formKey, persistFormResponse]);

  /** Use Enter key to submit the form. */
  useEnterKeySubmit(
    formMethods.handleSubmit(handleOnSubmit, handleOnInvalidSubmit),
    formKey
  );

  /**
   * Renders fields in a flexible layout (e.g., grid).
   * @param {RenderFlexFieldsProps} props - Properties for rendering fields.
   * @returns {JSX.Element} - The rendered fields.
   */
  const renderFlexFields = ({
    fluid,
    columns,
    gap,
    ...props
  }: RenderFlexFieldsProps) => {
    const fields = schema.map((field) => {
      if (visibleFields.has(field.key)) {
        return (
          <div
            key={field.key}
            style={
              !fluid || field.fieldStyle
                ? field.fieldStyle
                : {
                    maxWidth: "100%",
                  }
            }
            className={field.fieldClassName}
          >
            {field.render ? (
              field.render({
                formMethods,
                formItem: field,
                formErrors: formMethods.formState.errors,
                formDisabled: formDisabled ? true : false,
                submitButtonLoading: submitButtonLoading,
              })
            ) : (
              <input
                placeholder={field.placeholder}
                {...formMethods.register(field.key)}
              />
            )}
          </div>
        );
      }
      return null;
    });

    return (
      <div
        style={
          !props.style && fluid
            ? {
                display: "grid",
                gridTemplateColumns: `repeat(${columns || 1}, 1fr)`,
                gap: gap || "16px",
              }
            : props.style
        }
        {...props}
      >
        {fields}
      </div>
    );
  };

  /**
   * Renders the entire form.
   * @param {RenderFormProps<TFieldValues>} data - Properties for rendering the form.
   * @returns {JSX.Element} - The rendered form.
   */
  const renderForm = (data: RenderFormProps<TFieldValues>) => {
    const {
      fluid,
      columns,
      footer,
      header,
      renderFields,
      style,
      gap,
      submitButtonLoader,
      submitButtonStyle,
      submitButtonText,
    } = data;
    return (
      <div style={style}>
        {header ? header : <h2>{formLabel}</h2>}
        <form
          onSubmit={formMethods.handleSubmit(
            handleOnSubmit,
            handleOnInvalidSubmit
          )}
        >
          {renderFields
            ? renderFields({
                fluid: fluid ? true : false,
                schema,
                visibleFields,
                formMethods,
                formDisabled,
                submitButtonLoading,
                columns,
              })
            : renderFlexFields({
                fluid: fluid ? true : false,
                columns: columns || 1,
                gap: gap || "16px",
              })}
          {footer ? (
            footer
          ) : (
            <button
              type="submit"
              style={
                submitButtonStyle || !fluid
                  ? submitButtonStyle
                  : { marginTop: "5rem" }
              }
            >
              {submitButtonLoading
                ? submitButtonLoader ?? "Loader..."
                : submitButtonText ?? "Submit"}
            </button>
          )}
        </form>
      </div>
    );
  };

  return {
    /** The label/title of the form. */
    formLabel,
    /** The unique identifier for the form. */
    formSlug,
    /** The key used for the form. */
    formKey,
    /** A brief description of the form. */
    formDescription,
    /** The fields schema in the form. */
    formFields: schema,
    /** Methods from react-hook-form for managing the form state. */
    formMethods,
    /** The set of visible fields in the form. */
    visibleFields,
    /** Whether the submit button is loading. */
    submitButtonLoading,
    /** Whether the form is disabled. */
    formDisabled: !!formDisabled,
    /** Handler for form submission. */
    handleOnSubmit,
    /** Handler for invalid form submission. */
    handleOnInvalidSubmit,
    /** Function to render fields in a flexible layout. */
    renderFlexFields,
    /** Function to render the entire form. */
    renderForm,
  };
};

export default useSchemaForm;
