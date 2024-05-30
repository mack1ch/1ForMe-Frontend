import dayjs from "dayjs";

export function parseDateToDateAndMonth(dateStr: string): {
  day: number;
  dayOfWeek: string;
  month: { name: string; number: number };
  year: number;
} {
  const inputDate = new Date(dateStr);
  const monthNamesRu = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const dayNames = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ];
  const dateObj = { day: inputDate.getDate(), year: inputDate.getFullYear() };
  const dayOfWeek = dayNames[inputDate.getDay()];
  const monthObj = {
    name: monthNamesRu[inputDate.getMonth()],
    number: inputDate.getMonth() + 1,
  };
  return {
    day: dateObj.day,
    dayOfWeek: dayOfWeek,
    month: monthObj,
    year: dateObj.year,
  };
}

type Weekday =
  | "понедельник"
  | "вторник"
  | "среда"
  | "четверг"
  | "пятница"
  | "суббота"
  | "воскресенье";
export function parseWeekday(rusDay: Weekday | null): string {
  if (!rusDay) return "";
  const days: Record<Weekday, string> = {
    понедельник: "Пн",
    вторник: "Вт",
    среда: "Ср",
    четверг: "Чт",
    пятница: "Пт",
    суббота: "Сб",
    воскресенье: "Вс",
  };
  return days[rusDay];
}

export function parseDateToDoteFormate(dateString: string): string {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function parseTypeDateToDoteFormate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Форматируем дату в нужный вид
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
}

export function convertToWeekday(day: string): Weekday | null {
  switch (day) {
    case "понедельник":
    case "вторник":
    case "среда":
    case "четверг":
    case "пятница":
    case "суббота":
    case "воскресенье":
      return day as Weekday;
    default:
      return null;
  }
}

export function getMonthNameByMonthNumber(monthNumber?: number): string {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Мая",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  if (!monthNumber) return "";
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return "";
  }
}

export function getWeekdayNumber(day: string): number | null {
  switch (day) {
    case "ПН":
      return 1;
    case "ВТ":
      return 2;
    case "СР":
      return 3;
    case "ЧТ":
      return 4;
    case "ПТ":
      return 5;
    case "СБ":
      return 6;
    case "ВС":
      return 7;
    default:
      return null; // если введенная строка не соответствует дню недели
  }
}

export function getMonthNameByMonthNumberWithEnds(
  monthNumber?: number
): string {
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  if (!monthNumber) return "";
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return "";
  }
}

export function getWeekDateRange(weekNumber: number, year: number): string {
  const januaryFirst = new Date(year, 0, 1);
  const dayOfWeekOfFirstJanuary = januaryFirst.getDay();
  const firstThursdayOffset = dayOfWeekOfFirstJanuary <= 4 ? 1 : 8;
  const firstThursday = new Date(year, 0, firstThursdayOffset);

  const firstWeekNumber =
    Math.ceil(
      (januaryFirst.getTime() - firstThursday.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    ) + 1;

  const targetWeekNumber = weekNumber === 0 ? firstWeekNumber : weekNumber;
  const targetWeekStartDate = new Date(
    year,
    0,
    firstThursday.getDate() + (targetWeekNumber - 1) * 7
  );
  const targetWeekEndDate = new Date(
    year,
    0,
    firstThursday.getDate() + targetWeekNumber * 7 - 1
  );

  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const startMonth = months[targetWeekStartDate.getMonth()];
  const endMonth = months[targetWeekEndDate.getMonth()];

  return `${targetWeekStartDate.getDate()}–${targetWeekEndDate.getDate()} ${
    startMonth === endMonth ? startMonth : startMonth + "–" + endMonth
  }`;
}

export function formatDateToDayAndDateFormat(inputDate: string): string {
  const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const dateParts = inputDate.split("-").map((part) => parseInt(part, 10));
  const [year, monthIndex, day] = dateParts;
  const date = new Date(year, monthIndex - 1, day);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[monthIndex - 1];

  return `${dayOfWeek}, ${day} ${month}`;
}

export function convertDateFormatToDoteFormat(dateString?: string): string {
  if (dateString?.length === 0 || !dateString) return "";
  const [day, month, year] = dateString.split(".");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
