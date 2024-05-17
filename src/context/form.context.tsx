import { createContext } from "react";
import { FormixFormProviderType } from "../interface/form.interface";

/**
 * FormixFormProvider to provide the form state and methods throughout the component tree.
 * @type {React.Context<FormixFormProviderType<any> | null>}
 */
export const FormixFormProvider = createContext<FormixFormProviderType<any> | null>(null);
