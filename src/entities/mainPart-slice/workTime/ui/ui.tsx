import Link from "next/link";
import styles from "./ui.module.scss";
import Image from "next/image";
import ChevronRight from "../../../../../public/icons/dashboard/chevronRight.svg";
import { useEffect, useState } from "react";
import { IMainPartWorkTime } from "@/shared/interface/slots";
import { getSlots } from "../api";
import { formatDayCount } from "../model";

export const WorkTimeButton = () => {
  const [slots, setSlots] = useState<IMainPartWorkTime[]>();
  useEffect(() => {
    async function getAllSlots() {
      const fetchSlots = await getSlots();
      if (fetchSlots instanceof Error) return;
      setSlots(fetchSlots);
    }
    getAllSlots();
  }, []);
  function freeSlots() {
    let count = 0;
    slots?.forEach((slot) => {
      count += slot.count;
    });
    return count;
  }

  return (
    <>
      <Link href="/app/dashboard/worktime" className={styles.workTime}>
        <div className={styles.header}>
          <h4 className={styles.h4}>Рабочее время</h4>
          <Image src={ChevronRight} width={20} height={20} alt="Перейти" />
        </div>
        <p className={styles.status}>
          Свободно {formatDayCount(freeSlots())} для записи
        </p>
      </Link>
    </>
  );
};
