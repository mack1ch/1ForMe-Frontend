import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ChartBarBlack from "../../../../../../public/icons/header/chartBar-black.svg";
import Calendar from "../../../../../../public/icons/header/calendar-black.svg";
import FourUsersBlack from "../../../../../../public/icons/header/fourUsers-black.svg";
import UserCircleBlack from "../../../../../../public/icons/header/userCircle-black.svg";
import MessangerBlack from "../../../../../../public/icons/header/сhatCircleText-black.svg";
import { TTapBarItemTitle } from "@/shared/interface/footer";

export const getActiveIconByActiveTitle = (
  activeTitle?: TTapBarItemTitle
): StaticImport | undefined => {
  switch (activeTitle) {
    case "Аналитика": {
      return ChartBarBlack;
    }
    case "Главная": {
      return Calendar;
    }
    case "Клиенты": {
      return FourUsersBlack;
    }

    case "Профиль": {
      return UserCircleBlack;
    }
    case "Чат": {
      return MessangerBlack;
    }
    default: {
      return undefined;
    }
  }
};
