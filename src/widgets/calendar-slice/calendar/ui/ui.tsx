import { CalendarDates } from "@/features/calendar-slice/calendarDates";
import styles from "./ui.module.scss";
import { TrainingCard } from "@/entities/client-slice/trainingCard";
import {
  parseDateToDateAndMonth,
  parseDateToDoteFormate,
  parseTypeDateToDoteFormate,
} from "@/shared/lib/parse/date";
import { useEffect, useState } from "react";
import {
  IApiTraining,
  IDoteCount,
  ITraining,
} from "@/shared/interface/training";
import { getAuthUser, getTrainersByDate } from "../api";
import { LackData } from "@/shared/ui/error-slice/lackData";
import { IUser } from "@/shared/interface/user";

export const Calendar = () => {
  const todayDate = new Date().toISOString();
  const { day, month, dayOfWeek } = parseDateToDateAndMonth(todayDate);
  const [authUser, setAuthUser] = useState<IUser>();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>();
  const currentDate = new Date();
  const [trainings, setTrainings] = useState<ITraining[]>();
  // Определяем дату два дня назад
  const twoDaysAgo = new Date(currentDate);
  twoDaysAgo.setDate(currentDate.getDate() - 1);
  // Определяем 20 дат после текущей даты
  const nextDates = [];
  for (let i = 1; i <= 10; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    nextDates.push(nextDate);
  }
  const weekDates = [twoDaysAgo, currentDate, ...nextDates].map((date) => ({
    date: date.toISOString().slice(0, 10),
    dayOfWeek: date.toLocaleDateString("ru-RU", {
      weekday: "long",
      timeZone: "UTC",
    }),
  }));
  useEffect(() => {
    const currentDateIndex = weekDates.findIndex(({ date }) => {
      const [year, month, day] = date.split("-").map(Number);
      return (
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth() + 1 &&
        day === currentDate.getDate()
      );
    });
    setActiveItemIndex(currentDateIndex);
    // Индекс текущей даты в массиве weekDates
  }, []);

  const handleItemClick = (index: number) => {
    setActiveItemIndex((prevState) => {
      // Если индекс уже активный, ничего не меняем
      if (prevState === index) {
        return prevState;
      } else {
        // Иначе устанавливаем новый активный индекс
        return index;
      }
    });
  };

  const handleDateClick = (date: string) => {
    const afterDateSet = () => {
      // Получение поездов после установки даты
      async function fetchData() {
        const trains: ITraining[] | Error = await getTrainersByDate(
          parseDateToDoteFormate(date)
        );
        if (trains instanceof Error) return;
        setTrainings(trains);
      }
      fetchData();
    };
    // Вызов функции обратного вызова после установки даты
    afterDateSet();
  };

  useEffect(() => {
    async function fetchData() {
      const trainings: ITraining[] | Error = await getTrainersByDate(
        parseTypeDateToDoteFormate(currentDate.toString())
      );
      const user = await getAuthUser();
      if (trainings instanceof Error || user instanceof Error) return;

      setTrainings(trainings);
      setAuthUser(user);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h3 className={styles.h3}>{day + " " + month.name}</h3>
          <h3 className={styles.h4}>/ {dayOfWeek}</h3>
        </div>
        <CalendarDates
          activeItemIndex={activeItemIndex}
          handleItemClick={handleItemClick}
          handleDateClick={handleDateClick}
          weekDates={weekDates}
        />
        {trainings && trainings?.length > 0 ? (
          trainings?.map((item) => (
            <TrainingCard
              authTrainer={authUser}
              training={item}
              key={item.id}
            />
          ))
        ) : (
          <LackData>Нет занятий</LackData>
        )}
      </div>
    </>
  );
};
