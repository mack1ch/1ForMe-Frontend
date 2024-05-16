"use client";

import { useEffect, useState } from "react";
import styles from "./ui.module.scss";
import { TabItem } from "@/entities/analytic-slice/tabItem";
import { Statistics } from "@/features/analytics-slice/statistics";
import {
  getMonthNameByMonthNumber,
  parseDateToDateAndMonth,
} from "@/shared/lib/parse/date";
import { IApiTransaction } from "@/shared/interface/transaction";
import { getTransactions } from "../api";
import { TransactionCard } from "@/entities/transaction-slice/transactionCard";
import { ReactNode } from "react";
import { formatMoneyToComma } from "@/shared/lib/parse/money";

interface ITabItem {
  title: ReactNode;
  content: ReactNode;
}
export const Analytic = () => {
  const [active, setActive] = useState(0);
  const openTab = (e: number) => setActive(+e);
  const [transactions, setTransactions] = useState<IApiTransaction[]>();

  const DTabItems: ITabItem[] = [
    {
      title: "День",
      content: (
        <>
          {transactions?.map((item, index) => (
            <>
              <div key={index} className={styles.content}>
                <div className={styles.headerWrap}>
                  <h2 className={styles.date}>
                    {item.day} {getMonthNameByMonthNumber(item.month)}
                  </h2>
                  <h2 className={styles.count}>
                    {`${
                      formatMoneyToComma(item.totalCost.toString()) || 0
                    } ₽`.toUpperCase()}
                  </h2>
                </div>
                <div className={styles.renderCards}>
                  {item.transactions.map((item) => (
                    <TransactionCard transaction={item} key={item.id} />
                  ))}
                </div>
              </div>
            </>
          ))}
        </>
      ),
    },
    {
      title: "Неделя",
      content: (
        <>
          {transactions?.map((item, index) => (
            <>
              <div key={index} className={styles.content}>
                <div className={styles.headerWrap}>
                  <h2 className={styles.date}>
                    {item.day} {getMonthNameByMonthNumber(item.month)}
                  </h2>
                  <h2 className={styles.count}>
                    {`${
                      formatMoneyToComma(item.totalCost.toString()) || 0
                    } ₽`.toUpperCase()}
                  </h2>
                </div>
                <div className={styles.renderCards}>
                  {item.transactions.map((item) => (
                    <TransactionCard transaction={item} key={item.id} />
                  ))}
                </div>
              </div>
            </>
          ))}
        </>
      ),
    },
    {
      title: "Месяц",
      content: (
        <>
          {transactions?.map((item, index) => (
            <>
              <div key={index} className={styles.content}>
                <div className={styles.headerWrap}>
                  <h2 className={styles.date}>
                    {item.day} {getMonthNameByMonthNumber(item.month)}
                  </h2>
                  <h2 className={styles.count}>
                    {`${
                      formatMoneyToComma(item.totalCost.toString()) || 0
                    } ₽`.toUpperCase()}
                  </h2>
                </div>
                <div className={styles.renderCards}>
                  {item.transactions.map((transaction, index) => (
                    <TransactionCard
                      transaction={transaction}
                      isLast={index == item.transactions.length - 1}
                      key={transaction.id}
                    />
                  ))}
                </div>
              </div>
            </>
          ))}
        </>
      ),
    },
  ];
  useEffect(() => {
    async function getAllTransactions() {
      const transactionsArray: IApiTransaction[] | Error =
        await getTransactions();
      if (transactionsArray instanceof Error) return;
      setTransactions(transactionsArray);
    }
    getAllTransactions();
  }, []);

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
      <Statistics
        period={active === 0 ? "day" : active === 1 ? "week" : "month"}
      />
      {DTabItems[active] && DTabItems[active].content}
    </>
  );
};
