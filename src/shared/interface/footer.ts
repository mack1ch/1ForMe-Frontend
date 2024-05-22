import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ITapBarItem {
  title: TTapBarItemTitle;
  path: string;
  icon: StaticImport;
}

export type TTapBarItemTitle =
  | "Главная"
  | "Клиенты"
  | "Аналитика"
  | "Профиль"
  | "Мессенджер";
