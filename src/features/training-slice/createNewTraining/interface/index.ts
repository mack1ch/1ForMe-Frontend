import { ITraining } from "@/shared/interface/training";
import dayjs from "dayjs";
import { ReactNode } from "react";

export interface ISelectOptions {
  value: string;
  label: ReactNode;
}

export interface IFormData {
  slotID: number | null;
  date: string | string[];
  dateInput?: dayjs.Dayjs | null;
  clientID: number[] | string[] | null;
  tariffID: number | string | null;
  clubID: number | string | null;
  isRepeated: boolean;
}

export interface ITrainingsResponse {
  existingTrainingsDates: Date[];
  trainings: ITraining[];
}
