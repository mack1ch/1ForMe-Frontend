import { ISelectOptions } from "../interface";

export const getOptionLabel = (
  value: string | number,
  options: ISelectOptions[]
) => {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : "";
};

