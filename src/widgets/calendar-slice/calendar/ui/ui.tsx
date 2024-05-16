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
import { getAuthUser, getClubs, getTrainersByDate } from "../api";
import { LackData } from "@/shared/ui/error-slice/lackData";
import { IUser } from "@/shared/interface/user";
import { Select } from "antd";
import { ISelectOptions } from "../interface";

export const Calendar = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>("my");
  const todayDate = new Date().toISOString();
  const [selectFilterOptions, setSelectFilterOptions] = useState<
    ISelectOptions[]
  >([
    {
      value: "my",
      label: "Мои тренировки",
    },
  ]);
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
      const clubs = await getClubs();
      const user = await getAuthUser();
      if (
        trainings instanceof Error ||
        user instanceof Error ||
        clubs instanceof Error
      )
        return;
      setSelectFilterOptions((prev) => [
        {
          value: "my",
          label: "Мои тренировки",
        },
        ...clubs.map((club) => ({
          label: club.address + " / " + club.name,
          value: club.id.toString(),
        })),
      ]);
      setTrainings(trainings);
      setAuthUser(user);
    }
    fetchData();
  }, []);
  const currentFilter = selectFilterOptions?.find(
    (option) => option.value === selectedFilter?.toString()
  );
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h3 className={styles.h3}>{day + " " + month.name}</h3>
          <div className={styles.filter}>
            <Select
              value={currentFilter?.value}
              placeholder="Фильтр"
              variant="borderless"
              style={{ flex: 1, width: "80%" }}
              options={selectFilterOptions}
              onChange={(value) => setSelectedFilter(value)}
            />
            <h3 className={styles.h4}>/ {dayOfWeek}</h3>
          </div>
        </div>
        <CalendarDates
          activeItemIndex={activeItemIndex}
          handleItemClick={handleItemClick}
          handleDateClick={handleDateClick}
          weekDates={weekDates}
        />
        {selectedFilter ? (
          trainings && trainings?.length > 0 ? (
            trainings
              .filter((item) =>
                selectedFilter === "my"
                  ? item.trainer.id === authUser?.id
                  : item.club.id ===
                    (selectedFilter ? parseInt(selectedFilter) : 0)
              )
              .map((item) => (
                <TrainingCard
                  authTrainer={authUser}
                  training={item}
                  key={item.id}
                />
              ))
          ) : (
            <LackData>Нет занятий</LackData>
          )
        ) : trainings && trainings?.length > 0 ? (
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
1;
