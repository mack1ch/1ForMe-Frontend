import { ITapBarItem } from "@/shared/interface/footer";
import Celendar from "../../../../../public/icons/header/calendar-grey.svg";
import FourUsers from "../../../../../public/icons/header/fourUsers-grey.svg";
import ChartBar from "../../../../../public/icons/header/chartBar-grey.svg";
import CircleUser from "../../../../../public/icons/header/userCircle-grey.svg";
import Messanger from "../../../../../public/icons/header/сhatCircleText.svg";

export const DTapBar: ITapBarItem[] = [
  {
    title: "Главная",
    path: "/app/dashboard",
    icon: Celendar,
  },
  {
    title: "Клиенты",
    path: "/app/clients",
    icon: FourUsers,
  },
  {
    icon: Messanger,
    title: "Чат",
    path: "/app/clients/messenger",
  },
  {
    title: "Аналитика",
    path: "/app/analytics",
    icon: ChartBar,
  },

  {
    title: "Профиль",
    path: "/app/profile",
    icon: CircleUser,
  },
];
