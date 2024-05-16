import dayjs from "dayjs";
import { ReactNode } from "react";

export interface ISelectOptions {
  value: string;
  label: ReactNode;
}

export interface IFormData {
  tariffID: number | string | null;
  clubID: number | string | null;
}

export interface ITrainings {
  date?: string;
  dateInput?: dayjs.Dayjs;
}
