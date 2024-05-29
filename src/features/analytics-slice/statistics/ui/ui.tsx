"use client";

import { StatisticsGraphItem } from "@/entities/analytic-slice/statisticsGraph";
import styles from "./ui.module.scss";
import { useEffect, useState } from "react";
import { IAnalytics } from "@/shared/interface/analytics";
import { getAnalyticsEntitiesByStartAndEndDate } from "../api";
import { findMaxCostSum } from "../model";
import {
  getMonthNameByMonthNumber,
  getMonthNameByMonthNumberWithEnds,
  getWeekDateRange,
} from "@/shared/lib/parse/date";
import { convertToCurrencyFormat } from "@/shared/lib/parse/money";
import { LackData } from "@/shared/ui/error-slice/lackData";

export const Statistics = ({
  period = "day",
}: {
  period: "month" | "day" | "week";
}) => {
  const [analytics, setAnalytics] = useState<IAnalytics[]>();
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    async function getAnalytics() {
      const analytics: IAnalytics[] | Error =
        await getAnalyticsEntitiesByStartAndEndDate(period);
      if (analytics instanceof Error) return;
      setAnalytics(analytics);
    }
    setActiveItemIndex(0);
    getAnalytics();
  }, [period]);
  const maxCost = findMaxCostSum(analytics);
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

  const getIncomeByPeriod = () => {
    if (
      !analytics ||
      activeItemIndex < 0 ||
      activeItemIndex >= analytics.length
    ) {
      return "отсутствует";
    }

    const activeItem = analytics[activeItemIndex];
    switch (period) {
      case "day":
        return activeItem.day
          ? `${activeItem.day} ${getMonthNameByMonthNumberWithEnds(
              activeItem.month
            )}`
          : "";
      case "week":
        return activeItem.week
          ? ` ${
              getWeekDateRange(activeItem.week, activeItem.year) ||
              "" + " " + getMonthNameByMonthNumberWithEnds(activeItem.month)
            } `
          : "";
      case "month":
        return `за ${getMonthNameByMonthNumber(activeItem.month)}`;
      default:
        return "Загрузка...";
    }
  };
  
  return (
    <>
      {analytics && analytics?.length ? (
        <section className={styles.layout}>
          <div className={styles.header}>
            <h2 className={styles.totalMoney}>
              {analytics &&
                convertToCurrencyFormat(
                  analytics[activeItemIndex]?.costSum.toString()
                ) + " ₽"}
            </h2>
            <h4 className={styles.date}>
              {analytics &&
                period &&
                `Доход ${getIncomeByPeriod().toLowerCase()}
`}
            </h4>
          </div>
          <div className={styles.graphLayout}>
            {analytics?.map((item, index) => (
              <StatisticsGraphItem
                period={period}
                index={index}
                handleSetActive={handleItemClick}
                isActive={activeItemIndex === index}
                maxCost={maxCost}
                analytics={item}
                key={item.day}
              />
            ))}
          </div>
        </section>
      ) : (
        <LackData>Нет доходов</LackData>
      )}
    </>
  );
};
