import { ISelectOptions } from "../interface";

export const getOptionLabel = (
  value: string | number,
  options: ISelectOptions[]
) => {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : "";
};

export function findOptionById(
  id: string | null,
  options?: ISelectOptions[]
): ISelectOptions | undefined {
  return options?.find((option) => option.value == id);
}
