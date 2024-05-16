export function formatMoneyToComma(input: string): string {
  // Разделитель для тысяч
  const separator = ",";

  // Разбиваем строку на массив, если она содержит десятичную точку
  const parts = input.split(".");

  // Часть перед десятичной точкой
  let integerPart = parts[0];

  // Часть после десятичной точки
  let decimalPart = parts.length > 1 ? "." + parts[1] : "";

  // Добавляем разделители для тысяч
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // Собираем результат
  return integerPart + decimalPart;
}

export function convertToCurrencyFormat(input?: string): string {
  if (!input) return "";
  const number = parseInt(input, 10);
  return number.toLocaleString("ru-RU"); // Меняем 'ru-RU' на нужную локаль
}
