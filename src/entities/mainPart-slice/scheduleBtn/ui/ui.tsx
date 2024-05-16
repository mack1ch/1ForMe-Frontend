"use client";

import Link from "next/link";
import styles from "./ui.module.scss";
import Image from "next/image";
import ChevronRight from "../../../../../public/icons/dashboard/chevronRight.svg";
import { useEffect, useState } from "react";
import { ISlotsForStudio } from "@/shared/interface/slots";
import { getSlots } from "../api";
import { countAvailableSlotsForStudios } from "../model";

export const ScheduleButton = () => {
  const [slots, setSlots] = useState<ISlotsForStudio[]>();
  useEffect(() => {
    async function getAllSlots() {
      const fetchSlots = await getSlots();
      if (fetchSlots instanceof Error) return;
      setSlots(fetchSlots);
    }
    getAllSlots();
  }, []);
  const slotsCount = countAvailableSlotsForStudios(slots);
  return (
    <>
      <Link href="/app/dashboard/schedule" className={styles.schedule}>
        <div className={styles.head}>
          <h4 className={styles.h4}>Расписание студий</h4>
          <Image src={ChevronRight} width={20} height={20} alt="Перейти" />
        </div>
        <p className={styles.p}>Свободно {slotsCount} слотов для записи</p>
      </Link>
    </>
  );
};
