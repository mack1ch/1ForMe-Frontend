import styles from "./ui.module.scss";
import { parseDateToDateAndMonth, parseWeekday } from "@/shared/lib/parse/date";

type Weekday =
  | "понедельник"
  | "вторник"
  | "среда"
  | "четверг"
  | "пятница"
  | "суббота"
  | "воскресенье";

export const CalendarItem = ({
  active,
  onClick,
  index,
  dopeCount,
  dayOfWeek,
}: {
  active: boolean;
  index: string;
  dayOfWeek: string;
  dopeCount?: number;
  onClick?: (arg: number) => void;
}) => {
  const { day } = parseDateToDateAndMonth(index);
  return (
    <>
      <div className={styles.layout}>
        <article
          onClick={onClick && (() => onClick(Number(index)))}
          className={`${styles.article} ${active && styles.active}`}
        >
          <h5 className={styles.day}>{day}</h5>
          <h6 className={styles.dayOfWeek}>
            {parseWeekday(dayOfWeek as Weekday)}
          </h6>
        </article>
        <div className={styles.dopeLayout}>
          {Array.from({ length: Math.min(3, dopeCount || 0) }).map(
            (_, index) => (
              <span className={styles.dope} key={index} />
            )
          )}
        </div>
      </div>
    </>
  );
};
