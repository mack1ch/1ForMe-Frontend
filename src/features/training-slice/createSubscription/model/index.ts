import { SelectProps } from "antd";
import { ISelectOptions } from "../interface";

export const customFilterOption: SelectProps<ISelectOptions>["filterOption"] = (
  input,
  option
) => ((option?.label ?? "") as string).includes(input);

export const customFilterSort: SelectProps<ISelectOptions>["filterSort"] = (
  optionA,
  optionB
) =>
  ((optionA?.label ?? "") as string)
    .toLowerCase()
    .localeCompare((optionB?.label ?? "") as string);
