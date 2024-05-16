export function formatDayCount(count: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["слот", "слота", "слотов"];
  return `${count} ${
    titles[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ]
  }`;
}
