import { useState } from "react";
import styles from "./ui.module.scss";
import Image from "next/image";
import Arrow from "../../../../../public/icons/clients/arrowDown.svg";
import { DashDivider } from "@/shared/ui/divider-slice/dashDivider/ui/ui";
import { ClientSubscriptionTraining } from "@/shared/ui/client-slice/clientSubscriptionTraining";
import { ISubscription } from "@/shared/interface/subscriptions";
import { convertToCurrencyFormat } from "@/shared/lib/parse/money";
import { parseDateToDateAndMonth } from "@/shared/lib/parse/date";
export const ClientSubscriptionCard = ({
  subscription,
}: {
  subscription: ISubscription;
}) => {
  const [isCardOpen, setCardOpen] = useState(false);
  const { day, month, dayOfWeek } = parseDateToDateAndMonth(
    subscription.nextTraining?.date.toString()
  );
  return (
    <>
      {subscription.client?.id ? (
        <article className={styles.subscription}>
          <div className={styles.closeWrap}>
            <div className={styles.left}>
              <h3 className={styles.h3}>
                {subscription.finishedTrainingsCount}/
                {subscription.trainings?.length}
              </h3>
              <div className={styles.tagsWrap}>
                <span className={styles.tag}>
                  {subscription?.transaction?.tariff?.sport?.name}
                </span>
                {subscription.transaction.training?.type && (
                  <span className={styles.tag}>
                    {subscription.transaction.training?.type?.name}
                  </span>
                )}
              </div>
              <span className={styles.date}>
                Следующее:{" "}
                <strong className={styles.strong}>
                  {day} {month.name}
                </strong>
              </span>
            </div>
            <div className={styles.right}>
              <span className={styles.divider} />
              <div className={styles.costAndStatus}>
                <h4 className={styles.h4}>
                  {convertToCurrencyFormat(
                    subscription.transaction.tariff.cost.toString()
                  ) + " ₽"}
                </h4>
                <p className={styles.p}>{subscription.transaction.status}</p>
              </div>
              <button
                onClick={() => setCardOpen(!isCardOpen)}
                className={styles.icon}
              >
                <Image
                  className={
                    isCardOpen ? styles.icon__open : styles.icon__close
                  }
                  src={Arrow}
                  width={16}
                  height={16}
                  alt="Открыть"
                />
              </button>
            </div>
          </div>
          <>
            {isCardOpen && <DashDivider />}
            <div
              style={{
                height: isCardOpen ? "auto" : "0",
              }}
              className={styles.openWrap}
            >
              <div className={styles.info}>
                <h5 className={styles.h5}>
                  Одно занятие:{" "}
                  <strong className={styles.strong}>
                    {Math.round(
                      subscription?.transaction?.tariff?.cost /
                        subscription?.trainings?.length
                    )}
                    {" ₽"}
                  </strong>
                </h5>
                <h5 className={styles.h5}>
                  {Math.round(
                    subscription.transaction.tariff.cost /
                      subscription?.trainings?.length
                  )}
                  ₽ × {subscription.trainings?.length} занятий:{" "}
                  <strong className={styles.strong}>
                    {" "}
                    {convertToCurrencyFormat(
                      subscription.transaction.tariff.cost.toString()
                    ) + " ₽"}{" "}
                  </strong>
                </h5>
              </div>
              <div className={styles.trainingTags}>
                {subscription.trainings?.map((item) => (
                  <ClientSubscriptionTraining training={item} key={item.id} />
                ))}
              </div>
            </div>
          </>
        </article>
      ) : (
        <article className={styles.subscription}>
          <div className={styles.closeWrap}>
            <div className={styles.left}>
              <h3 className={styles.h3}>
                {subscription.finishedTrainingsCount}/
                {subscription.trainings?.length}
              </h3>
              <div className={styles.tagsWrap}>
                <span className={styles.tag}>
                  {subscription?.transaction?.tariff?.sport?.name}
                </span>
                {subscription.transaction.training?.type && (
                  <span className={styles.tag}>
                    {subscription.transaction.training?.type?.name}
                  </span>
                )}
              </div>
              <span className={styles.date}>
                Следующее:{" "}
                <strong className={styles.strong}>
                  {day} {month.name}
                </strong>
              </span>
            </div>
            <div className={styles.right}>
              <span className={styles.divider} />
              <div className={styles.costAndStatus}>
                <h4 className={styles.h4}>
                  {convertToCurrencyFormat(
                    subscription.transaction.tariff.cost.toString()
                  ) + " ₽"}
                </h4>
                <p className={styles.p}>{subscription.transaction.status}</p>
              </div>
              <button
                onClick={() => setCardOpen(!isCardOpen)}
                className={styles.icon}
              >
                <Image
                  className={
                    isCardOpen ? styles.icon__open : styles.icon__close
                  }
                  src={Arrow}
                  width={16}
                  height={16}
                  alt="Открыть"
                />
              </button>
            </div>
          </div>
          <>
            {isCardOpen && <DashDivider />}
            <div
              style={{
                height: isCardOpen ? "auto" : "0",
              }}
              className={styles.openWrap}
            >
              <div className={styles.info}>
                <h5 className={styles.h5}>
                  Одно занятие:{" "}
                  <strong className={styles.strong}>
                    {subscription?.transaction?.tariff?.cost /
                      subscription?.trainings?.length}
                    {" ₽"}
                  </strong>
                </h5>
                <h5 className={styles.h5}>
                  {subscription.transaction.tariff.cost /
                    subscription?.trainings?.length}
                  ₽ × {subscription.trainings?.length} занятий:{" "}
                  <strong className={styles.strong}>
                    {" "}
                    {convertToCurrencyFormat(
                      subscription.transaction.tariff.cost.toString()
                    ) + " ₽"}{" "}
                  </strong>
                </h5>
              </div>
              <div className={styles.trainingTags}>
                {subscription.trainings?.map((item) => (
                  <ClientSubscriptionTraining training={item} key={item.id} />
                ))}
              </div>
            </div>
          </>
        </article>
      )}
    </>
  );
};
