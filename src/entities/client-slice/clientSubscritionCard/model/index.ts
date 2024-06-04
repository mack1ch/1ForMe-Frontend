export function addDaysToDate(dateString: string, daysToAdd: number): string {
  // Парсим строку даты в объект Date
  let date = new Date(dateString);

  // Добавляем N дней
  date.setDate(date.getDate() + daysToAdd);

  // Преобразуем дату в формат DD.MM.YYYY
  let day = date.getUTCDate().toString().padStart(2, "0");
  let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  let year = date.getUTCFullYear().toString();

  let formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
}
