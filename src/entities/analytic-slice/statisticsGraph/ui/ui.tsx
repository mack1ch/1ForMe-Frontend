import styles from "./ui.module.scss";
import {
  getMonthNameByMonthNumber,
  getMonthNameByMonthNumberWithEnds,
  getWeekDateRange,
} from "@/shared/lib/parse/date";
import { IAnalytics } from "@/shared/interface/analytics";
import { convertToCurrencyFormat } from "@/shared/lib/parse/money";

export const StatisticsGraphItem = ({
  analytics,
  maxCost,
  isActive = false,
  handleSetActive,
  period = "day",
  index,
}: {
  analytics?: IAnalytics;
  index: number;
  maxCost?: number;
  isActive?: boolean;
  period: "month" | "day" | "week";
  handleSetActive: (index: number) => void;
}) => {
  if (!analytics) return;
  const currentCost = analytics?.costSum;
  const height = currentCost && maxCost ? (currentCost / maxCost) * 100 : 0;
  const getDate = () => {
    if (analytics && period) {
      switch (period) {
        case "day":
          return (
            analytics.day &&
            analytics?.day +
              " " +
              getMonthNameByMonthNumberWithEnds(analytics?.month)
                ?.slice(0, 3)
                .toLocaleLowerCase()
          );

        case "week":
          if (!analytics.week) {
            return "";
          }

          const weekRange = getWeekDateRange(analytics.week, analytics.year);
          if (!weekRange) {
            return "";
          }

          const parts = weekRange.split(" ");

          // Извлекаем части из массива
          const day1 = parts[0].split("–")[0]; // "27"
          const day2 = parts[0].split("–")[1]; // "2"
          const month1 = parts[1].split("–")[0]; // "май"
          const month2 = parts[1].split("–")[1]; // "июн"

          if (month1 === month2) {
            return `${day1} - ${day2} ${month1}`;
          } else {
            return `${day1} ${month1} - ${day2} ${month2}`;
          }
        case "month":
          return getMonthNameByMonthNumber(analytics.month);

        default:
          return "Загрузка...";
      }
    } else {
      return "Секунду...";
    }
  };
  return (
    <>
      <div onClick={() => handleSetActive(index)} className={styles.layout}>
        <h4 className={styles.count}>
          {convertToCurrencyFormat(analytics?.costSum.toString())}
        </h4>
        <article
          style={{ height: height, background: isActive ? "#E6F36C" : "" }}
          className={styles.rectangle}
        />
        <p className={styles.date}>{getDate()}</p>
      </div>
    </>
  );
};
