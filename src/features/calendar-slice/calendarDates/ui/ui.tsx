"use client";

import { CalendarItem } from "@/entities/calendar-slice/calendarItem";
import styles from "./ui.module.scss";
import { IWeekDays } from "../interface";
import { useEffect, useState } from "react";
import { getDotes } from "../api";
import { IDoteCount } from "@/shared/interface/training";

export const CalendarDates = ({
  weekDates,
  activeItemIndex,
  handleItemClick,
  handleDateClick,
}: {
  weekDates: IWeekDays[];
  activeItemIndex?: number | null;
  handleItemClick: (index: number) => void;
  handleDateClick: (date: string) => void;
}) => {
  const [dotesCount, setDotesCount] = useState<IDoteCount[]>();
  const handleClick = (index: number, date: string) => {
    handleItemClick(index);
    handleDateClick(date);
  };
  useEffect(() => {
    async function fetchData() {
      const dotes = await getDotes();
      if (dotes instanceof Error) return;
      setDotesCount(dotes);
    }
    fetchData();
  }, []);
  return (
    <>
      <section className={styles.layout}>
        {weekDates.map(({ date, dayOfWeek, dopeCount }, index) => {
          const currentDate = new Date(date);
          const doteCount = dotesCount?.find(
            (dote) =>
              dote.day === currentDate.getDate() &&
              dote.month === currentDate.getMonth() + 1
          );
          return (
            <CalendarItem
              dayOfWeek={dayOfWeek}
              key={index}
              index={date}
              onClick={() => handleClick(index, date)}
              active={activeItemIndex === index}
              dopeCount={doteCount?.trainingCount || 0}
            />
          );
        })}
      </section>
    </>
  );
};
