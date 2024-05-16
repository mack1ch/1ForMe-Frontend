import { SelectProps } from "antd";
import { ISelectOptions } from "../interface";

export const customFilterOption: SelectProps<ISelectOptions>["filterOption"] = (
  input,
  option
) => {
  const inputValue = input.toLowerCase();
  const optionLabel = (option?.label ?? "").toString().toLowerCase();

  return optionLabel.includes(inputValue);
};
export const customFilterSort: SelectProps<ISelectOptions>["filterSort"] = (
  optionA,
  optionB
) =>
  ((optionA?.label ?? "") as string)
    .toLowerCase()
    .localeCompare((optionB?.label ?? "") as string);

interface IDateTime {
  formatTime: string;
  formatDate: string;
  formatClubID: string;
}

export function parseDateTime(input?: string): IDateTime[] {
  if (!input) return [];
  const [dateTimeStr, dateStr, clubIDStr] = input.split("%26");
  const [hh, mm] = dateTimeStr.split("%3A");
  const formatTime = hh + ":" + mm;
  const formatDate = dateStr.replace(".", ".").replace(".", ".");
  const formatClubID = clubIDStr;

  return [{ formatTime, formatDate, formatClubID }];
}

export function findOptionById(
  id: string | null,
  options?: ISelectOptions[]
): ISelectOptions | undefined {
  return options?.find((option) => option.value == id);
}

export function formatHoursCount(count: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["час", "часа", "часов"];
  return `${count} ${
    titles[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ]
  }`;
}

export function formatMinutesCount(count: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["минута", "минуты", "минут"];
  return `${count} ${
    titles[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ]
  }`;
}

export function formatDayCount(count: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["день", "дня", "дней"];
  return `${count} ${
    titles[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ]
  }`;
}
