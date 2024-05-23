import { ReactNode } from "react";

export interface IClient {
  name: string;
  phone: string;
  messenger: number | string;
}

export interface ISelectOptions{
  value: string;
  label: ReactNode
}