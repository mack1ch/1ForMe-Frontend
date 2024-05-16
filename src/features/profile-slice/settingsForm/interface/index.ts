import dayjs from "dayjs";

export interface ISettingsFormUser {
  name: string;
  surname: string;
  birthday?: string;
  birthDayInput?: dayjs.Dayjs | null;
  experience?: number;
  phone: string;
  description?: string;
}
