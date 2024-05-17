import dayjs from "dayjs";
import { ReactNode } from "react";

export interface IRegisterWorkTimeCard {
  start: string | number | null;
  end: string | number | null;
  studio: number | string;
  date?: string;
  startRender: string;
  endRender: string;
  studioRender: string;
}

export interface ISelectOptions {
  value: string;
  label: ReactNode;
}
