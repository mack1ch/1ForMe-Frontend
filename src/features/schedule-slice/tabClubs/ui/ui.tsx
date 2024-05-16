"use client";

import styles from "./ui.module.scss";
import { useEffect, useState } from "react";
import { IClub, IStudio } from "@/shared/interface/studio";
import { getClubs, getSlots, getStudios } from "../api";
import { TabItem } from "@/entities/analytic-slice/tabItem";
import { ISlotsForStudio } from "@/shared/interface/slots";
import { parseDateToDateAndMonth } from "@/shared/lib/parse/date";
import { ClubCard } from "@/entities/schedule-slice/clubCard";

export const TabClubs = () => {
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [slots, setSlots] = useState<ISlotsForStudio[]>([]);
  const [activeStudio, setActiveStudio] = useState<number | null>(1);
  const [studios, setStudios] = useState<IStudio[]>([]);

  useEffect(() => {
    async function fetchData() {
      const clubsData = await getClubs();
      const slotsData = await getSlots(activeStudio || 0);
      const studiosData = await getStudios();
      if (
        clubsData instanceof Error ||
        slotsData instanceof Error ||
        studiosData instanceof Error
      )
        return;

      setClubs(clubsData);
      setSlots(slotsData);
      setStudios(studiosData);
    }
    fetchData();
  }, [activeStudio]);

  const openTab = (studioId: number) => setActiveStudio(studioId);
  const groupedSlots: Record<string, ISlotsForStudio[]> = {};

  slots.forEach((slot) => {
    const date = new Date(slot.date);
    const dayMonth = `${date.getDate()}-${date.getMonth()}`;
    if (!groupedSlots[dayMonth]) {
      groupedSlots[dayMonth] = [];
    }
    groupedSlots[dayMonth].push(slot);
  });

  return (
    <>
      <div className={styles.tabs}>
        <div className={styles.wrap}>
          {studios.map((studio) => (
            <TabItem
              key={studio.id}
              id={studio.id}
              className={activeStudio === studio.id ? styles.active : ""}
              onClick={() => openTab(studio.id)}
            >
              {studio.address}
            </TabItem>
          ))}
        </div>
      </div>
      <div className={styles.slots}>
        {Object.entries(groupedSlots).map(([dayMonth, slotsForDate]) => {
          const dateParts = dayMonth.split("-");
          const date = new Date();
          date.setDate(parseInt(dateParts[0], 10));
          date.setMonth(parseInt(dateParts[1], 10));

          const { dayOfWeek, month } = parseDateToDateAndMonth(date.toString());
          return (
            <div className={styles.slotGroup} key={dayMonth}>
              <h2 className={styles.h2}>
                {dayOfWeek}, {date.getDate()} {month.name}
              </h2>

              <div className={styles.renderCards}>
                {slotsForDate.map((slot) => (
                  <div className={styles.slotItem} key={slot.club.id}>
                    <ClubCard
                      date={date}
                      slotsForStudio={slot}
                      clubSlot={slot.clubSlots}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
