export function numberToOrdinal(n: number): string {
  const units = [
    "",
    "первое",
    "второе",
    "третье",
    "четвёртое",
    "пятое",
    "шестое",
    "седьмое",
    "восьмое",
    "девятое",
  ];
  const tens = [
    "",
    "десятое",
    "двадцатое",
    "тридцатое",
    "сороковое",
    "пятидесятое",
    "шестидесятое",
    "семидесятое",
    "восьмидесятое",
    "девяностое",
  ];

  if (n < 1 || n > 99) {
    return "Число должно быть от 1 до 99";
  }

  if (n < 10) {
    return units[n];
  }

  const unit = n % 10;
  const ten = Math.floor(n / 10);

  return `${tens[ten]} ${units[unit]}`;
}
