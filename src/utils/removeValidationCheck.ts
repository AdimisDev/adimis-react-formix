import { checkRemoveValidationCondition } from "./checkRemoveValidationCondition";
import { IFieldSchema, ValidationCondition } from "../interface/form.interface";
import { FieldErrors, FieldValues } from "react-hook-form";

export function onErrorRemoveValidationCheck<TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
  schema: IFieldSchema<TFieldValues>[],
  formResponse: Record<string, any>,
  setCanRemoveValidationFor: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
): boolean {
  try {
    const allRemoveValidationChecks: boolean[] = Object.keys(errors).map(
      (key) => {
        const errorFieldRemoveValidationConditions:
          | ValidationCondition<TFieldValues>[]
          | undefined = schema.find(
          (field) => field.key === key
        )?.removeValidationConditions;

        const fieldValidationRemoveApproved = checkRemoveValidationCondition(
          errorFieldRemoveValidationConditions,
          formResponse
        );

        if (fieldValidationRemoveApproved) {
          setCanRemoveValidationFor((prev) => {
            return {
              ...prev,
              [key]: true,
            };
          });
        } else {
          setCanRemoveValidationFor((prev) => {
            return {
              ...prev,
              [key]: false,
            };
          });
        }
        return fieldValidationRemoveApproved;
      }
    );

    const isEveryCheckValid = allRemoveValidationChecks.every((valid) => valid);

    return isEveryCheckValid;
  } catch (error) {
    throw new Error("onErrorRemoveValidationCheck:\n" + JSON.stringify(error));
  }
}

export function onChangeRemoveValidationCheck<TFieldValues extends FieldValues>(
  schema: IFieldSchema<TFieldValues>[],
  formResponse: Record<string, any>,
  setCanRemoveValidationFor: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
) {
  const isEveryCheckValid = Object.keys(formResponse).map((key) => {
    const errorFieldRemoveValidationConditions:
      | ValidationCondition<TFieldValues>[]
      | undefined = schema.find(
      (field) => field.key === key
    )?.removeValidationConditions;

    const fieldValidationRemoveApproved = checkRemoveValidationCondition(
      errorFieldRemoveValidationConditions,
      formResponse
    );

    if (fieldValidationRemoveApproved) {
      setCanRemoveValidationFor((prev) => {
        return {
          ...prev,
          [key]: true,
        };
      });
    } else {
      setCanRemoveValidationFor((prev) => {
        return {
          ...prev,
          [key]: false,
        };
      });
    }
    return fieldValidationRemoveApproved;
  });
  return isEveryCheckValid;
}
