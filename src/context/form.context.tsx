import { createContext } from "react";
import { FormContextType } from "../interface/form.interface";

/**
 * FormContext to provide the form state and methods throughout the component tree.
 * @type {React.Context<FormContextType<any> | null>}
 */
export const FormContext = createContext<FormContextType<any> | null>(null);
