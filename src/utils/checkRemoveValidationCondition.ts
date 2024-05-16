import { ValidationCondition } from "@/interface/form.interface";
import { FieldValues } from "react-hook-form";

export function checkRemoveValidationCondition<
  TFieldValues extends FieldValues
>(
  data?: ValidationCondition<TFieldValues>[],
  formResponse?: Record<string, any>
): boolean {
  if (!data || !formResponse) {
    return false;
  }

  const canRemoveError = data.every((condition) => {
    const { dependentField, operator, dependentFieldValue } = condition;
    const actualValue = formResponse[dependentField];

    switch (operator) {
      case "===":
        return actualValue === dependentFieldValue;
      case "!==":
        return actualValue !== dependentFieldValue;
      case "<":
        return actualValue < dependentFieldValue;
      case "<=":
        return actualValue <= dependentFieldValue;
      case ">":
        return actualValue > dependentFieldValue;
      case ">=":
        return actualValue >= dependentFieldValue;
      default:
        return false;
    }
  });

  return canRemoveError;
}
