"use client";

import Image from "next/image";
import styles from "./ui.module.scss";
import Tariff from "../../../../../public/icons/profile/tariff.svg";
import { useEffect, useState } from "react";
import { ITariff } from "@/shared/interface/tariff";
import { getAuthUser, getUserTariffs } from "../api";
import Link from "next/link";
import Arrow from "../../../../../public/icons/profile/chevronRightBlack.svg";
import { IUser } from "@/shared/interface/user";
import { DashDivider } from "@/shared/ui/divider-slice/dashDivider/ui/ui";
import { convertTimeToMinutes } from "../model";

export const TariffCard = () => {
  const [tariffs, setTariffs] = useState<ITariff[]>();
  const [authUser, setAuthUser] = useState<IUser>();
  useEffect(() => {
    async function fetchData() {
      const fetchTariffs: ITariff[] | Error = await getUserTariffs();
      if (fetchTariffs instanceof Error) return;
      setTariffs(fetchTariffs);
      const user = await getAuthUser();
      if (user instanceof Error) return;
      setAuthUser(user);
    }
    fetchData();
  }, []);
  return (
    <>
      {tariffs && tariffs.length > 0 && (
        <article className={styles.layout}>
          <div className={styles.header}>
            <div className={styles.row}>
              <Image src={Tariff} width={24} height={24} alt="Tariff" />
              <h3 className={styles.title}>Тарифы</h3>
            </div>
            {authUser?.trainerProfile?.tax ? (
              <span className={styles.tax}>
                {authUser.trainerProfile?.tax}% студии
              </span>
            ) : (
              <Link className={styles.arrow} href="/app/profile/settings">
                <Image src={Arrow} width={24} height={24} alt="Перейти" />
              </Link>
            )}
          </div>
          <DashDivider />
          {tariffs?.map((item) => (
            <>
              <div className={styles.tariff_item}>
                <h5
                  style={{ textAlign: "left" }}
                  className={styles.tariff_text}
                >
                  {item.name}
                </h5>
                <h5
                  style={{ color: "#6E6E6E", textAlign: "right" }}
                  className={styles.tariff_text}
                >
                  {item.cost} ₽{" / "}
                  <span className={styles.light}>
                    {convertTimeToMinutes(item.duration)} мин.
                  </span>
                </h5>
              </div>
            </>
          ))}
        </article>
      )}
    </>
  );
};
