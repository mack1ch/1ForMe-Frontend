import { ReactNode } from "react";

export interface IClient {
  name: string;
  phone: string;
  messenger: number | string;
  userNameInMessenger?: string;
}

export interface ISelectOptions {
  value: string;
  label: ReactNode;
}
