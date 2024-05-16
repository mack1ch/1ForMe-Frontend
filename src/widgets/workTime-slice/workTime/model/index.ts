import { TSlotDay } from "@/shared/interface/slots";

export const dayParsing = (regularity: TSlotDay | undefined) => {
  switch (regularity) {
    case "ПН": {
      return "Пн";
    }
    case "ВС": {
      return "Вс";
    }
    case "ВТ": {
      return "Вт";
    }
    case "СР": {
      return "Ср";
    }
    case "ПТ": {
      return "Пт";
    }
    case "СБ": {
      return "Сб";
    }
    case "ЧТ": {
      return "Чт";
    }
    default: {
      return "";
    }
  }
};

export const dayParsingFromNumberToDayOfWeek = (day: number | undefined) => {
  switch (day) {
    case 1: {
      return "ПН";
    }
    case 2: {
      return "ВТ";
    }
    case 3: {
      return "СР";
    }
    case 4: {
      return "ЧТ";
    }
    case 5: {
      return "ПТ";
    }
    case 6: {
      return "СБ";
    }
    case 7: {
      return "ВС";
    }
    default: {
      return "";
    }
  }
};

export const getDayDate = (day: number, allDays: string[]): string => {
  const today = new Date();
  const dayIndex = day - 1; // Учитываем, что номер дня начинается с 1
  const dayDiff = dayIndex - today.getDay();
  const targetDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + dayDiff
  );
  const dayOfMonth = targetDate.getDate();
  const month = targetDate.toLocaleString("ru", { month: "long" });
  return `${dayOfMonth} ${month}`;
};
export function dateRange(start: Date, days: number): Date[] {
  const dates: Date[] = [];

  for (let i = 0; i <= days; i++) {
    const newDate = new Date(start);
    newDate.setDate(start.getDate() + i);
    dates.push(newDate);
  }

  return dates;
}

export function convertToISODate(day: number, month: string): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const monthsMap: { [key: string]: number } = {
    январь: 0,
    февраль: 1,
    март: 2,
    апрель: 3,
    май: 4,
    июнь: 5,
    июль: 6,
    август: 7,
    сентябрь: 8,
    октябрь: 9,
    ноябрь: 10,
    декабрь: 11,
  };

  const monthIndex = monthsMap[month.toLowerCase()];

  const isoDate = new Date(year, monthIndex, day + 1)
    .toISOString()
    .split("T")[0];

  return isoDate;
}
