import { ReactNode } from "react";

export interface IClientEditForm {
  name?: string;
  phone: string;
  comment?: string;
  messenger?: string | number;
}
export interface ISelectOptions {
  value: string;
  label: ReactNode;
}
