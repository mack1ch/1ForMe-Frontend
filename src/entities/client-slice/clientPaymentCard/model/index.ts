export function convertTimeFormat(input: string): string {
  const [hours, minutes] = input.split(":").map(Number);

  if (hours === 0) {
    return `${minutes} минут`;
  } else if (minutes === 0) {
    return `${hours} час`;
  } else if (hours === 1) {
    return `${hours} час ${minutes} минут`;
  } else {
    return `${hours} часов ${minutes} минут`;
  }
}
