"use client";

import { TabItem } from "@/entities/analytic-slice/tabItem";
import styles from "./ui.module.scss";

import { useState } from "react";
import { ReactNode } from "react";
import { ClientClasses } from "@/features/client-slice/clientClasses";
import { ClientSubscriptions } from "@/features/client-slice/clientSubscriptions"; 
import { ClientPaymentRender } from "@/features/client-slice/clientPaymentsRender";

interface ITabItem {
  title: ReactNode;
  content: ReactNode;
}
export const Client = ({ userID }: { userID: number }) => {
  const [active, setActive] = useState(0);
  const openTab = (e: number) => setActive(+e);

  const DTabItems: ITabItem[] = [
    { title: "Абонементы", content: <ClientSubscriptions userID={userID} /> },
    { title: "Занятия", content: <ClientClasses userID={userID} /> },
    { title: "Оплаты", content: <ClientPaymentRender userID={userID} /> },
  ];

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.wrap}>
          {DTabItems.map((item, i) => (
            <>
              <TabItem
                id={i}
                key={i + 1}
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

      <div className={styles.content}>
        <div className={styles.renderCards}>
          {DTabItems[active] && DTabItems[active].content}
        </div>
      </div>
    </>
  );
};
