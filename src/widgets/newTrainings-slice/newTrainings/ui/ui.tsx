"use client";

import { TabItem } from "@/entities/analytic-slice/tabItem";
import { DTabItems } from "../data";
import styles from "./ui.module.scss";
import { useState } from "react";

export const NewTrainings = () => {
  const [active, setActive] = useState(0);
  const openTab = (e: number) => setActive(+e);

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.wrap}>
          {DTabItems.map((item, i) => (
            <>
              <TabItem
                id={i}
                key={i}
                className={i === active ? styles.active : ""}
                onClick={openTab}
                data-index={i}
              >
                {item.title}
              </TabItem>
            </>
          ))}
        </div>
      </div>
      {DTabItems[active] && DTabItems[active].content}
    </>
  );
};
