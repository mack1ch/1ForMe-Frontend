import Link from "next/link";
import styles from "./ui.module.scss";
import Image from "next/image";
import ChevronRight from "../../../../../public/icons/dashboard/chevronRight.svg";
import { useEffect, useState } from "react";
import { ISlotsForStudio } from "@/shared/interface/slots";
import { getSlots } from "../api";
import { formatDayCount } from "../model";

export const WorkTimeButton = () => {
  const [slots, setSlots] = useState<ISlotsForStudio[]>();
  useEffect(() => {
    async function getAllSlots() {
      const fetchSlots = await getSlots();
      if (fetchSlots instanceof Error) return;
      setSlots(fetchSlots);
    }
    getAllSlots();
  }, []);
  const countSlots = slots ? 7 - slots?.length : 0;
  return (
    <>
      <Link href="/app/dashboard/worktime" className={styles.workTime}>
        <div className={styles.header}>
          <h4 className={styles.h4}>Рабочее время</h4>
          <Image src={ChevronRight} width={20} height={20} alt="Перейти" />
        </div>
        <p className={styles.status}>
          Свободно {formatDayCount(countSlots)} для записи
        </p>
      </Link>
    </>
  );
};
