"use client";

import { useEffect, useState } from "react";
import styles from "./ui.module.scss";
import { ITrainerSlot, TSlotDay } from "@/shared/interface/slots";
import { changeAuthUser, getAuthUser, getTrainerSlots } from "../api";
import { RegisterWorkTimeCard } from "@/entities/workTime-slice/registerWorkTimeCard";
import {
  convertToISODate,
  dateRange,
  dayParsing,
  dayParsingFromNumberToDayOfWeek,
  getDayDate,
} from "../model";
import { allDays, monthNames } from "../data";
import { message, Switch } from "antd";
import Image from "next/image";
import Plus from "../../../../../public/icons/workTime/plus.svg";
export const WorkTime = () => {
  const [slots, setSlots] = useState<ITrainerSlot[]>([]);
  const [isComponentDisabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    async function getAllSlots() {
      const slots: ITrainerSlot[] | Error = await getTrainerSlots();
      const user = await getAuthUser();
      if (slots instanceof Error || user instanceof Error) return;

      setSlots(slots);
      setDisabled(user.trainerProfile.isActive || false);
    }
    getAllSlots();
  }, []);

  const today = new Date();
  const weekDates = dateRange(today, 6);

  const handleComponentDisabledSet = async () => {
    setDisabled(!isComponentDisabled);
    try {
      const response = await changeAuthUser(!isComponentDisabled || false);
      if (response instanceof Error) {
        message.open({
          type: "error",
          content: "Не удалось выполнить запрос",
        });
      } else {
        message.open({
          type: "success",
          content: "Статус расписания успешно изменен",
        });
      }
    } catch {
      message.open({
        type: "error",
        content: "Проблема на сервере, мы уже работаем над устранением",
      });
    }
  };

  return (
    <>
      <section className={styles.global}>
        <div className={styles.state}>
          <h3 className={styles.h3}>Открыть запись</h3>
          <Switch
            value={isComponentDisabled}
            onChange={handleComponentDisabledSet}
          />
        </div>
        {[...weekDates].map((date, index) => {
          const day = allDays[
            date.getDay() === 0 ? 6 : date.getDay() - 1
          ] as TSlotDay;

          const slot = slots.find(
            (slot) => dayParsingFromNumberToDayOfWeek(slot.day) === String(day)
          );

          const dayOfMonth = date.getDate();
          const monthIndex = date.getMonth();
          const monthName = monthNames[monthIndex];
          const newMonthName =
            monthName.slice(0, 3) === "Май" ? "Мая" : monthName.slice(0, 3);

          const today = new Date();
          const dayOfWeek = today.getDay();

          let daysToAdd = 0;
          if (slot) {
            daysToAdd = slot.day - dayOfWeek;
          }
          const targetDate = new Date(today);
          targetDate.setDate(today.getDate() + daysToAdd);

          return (
            <div
              style={{ opacity: !isComponentDisabled ? "0.5" : "" }}
              key={index}
              className={styles.layout}
            >
              <>
                <div className={styles.h3Wrap}>
                  <h3 className={styles.h3}>{dayParsing(day)}</h3>
                  <h3 style={{ textWrap: "nowrap" }} className={styles.h3}>
                    {`${dayOfMonth} ${newMonthName.toLowerCase()}`}
                  </h3>
                </div>
                <div className={styles.wrap}>
                  {slot ? (
                    <RegisterWorkTimeCard
                      isArrowDisabled={!isComponentDisabled}
                      slot={slot}
                      date={convertToISODate(dayOfMonth, monthName)}
                      key={slot.id}
                    />
                  ) : (
                    <RegisterWorkTimeCard
                      date={convertToISODate(dayOfMonth, monthName)}
                      dayOfWeek={day}
                      isArrowDisabled={!isComponentDisabled}
                    />
                  )}
                  <button
                    // onClick={() => addEmptySlot(day as TSlotDay)}
                    className={styles.addNewSlot}
                  >
                    Добавить новый слот{" "}
                    <Image src={Plus} width={16} height={16} alt="Плюс" />
                  </button>
                </div>
              </>
            </div>
          );
        })}
      </section>
    </>
  );
};
