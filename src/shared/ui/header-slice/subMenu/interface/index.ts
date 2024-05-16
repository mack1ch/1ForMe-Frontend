import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export interface ISubMenu {
  label: ReactNode;
  value: ReactNode;
  icon?: StaticImport;
}
