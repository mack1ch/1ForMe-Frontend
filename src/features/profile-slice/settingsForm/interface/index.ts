import dayjs from "dayjs";
import { ReactNode } from "react";

export interface ISettingsFormUser {
  name: string;
  surname: string;
  birthday?: string;
  birthDayInput?: dayjs.Dayjs | null;
  experience?: number;
  phone: string;
  studiosID?: string[] | number[];
  description?: string;
 
  sports?: string[] | number[];
}

export interface ISelectOptions {
  value: string;
  label: ReactNode;
}
