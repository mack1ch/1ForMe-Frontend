import styles from "./ui.module.scss";
import ArrowRight from "../../../../../public/icons/calendar/chevronRightBlack.svg";
import Image from "next/image";
import { parseDateToDateAndMonth } from "@/shared/lib/parse/date";
import { IUser } from "@/shared/interface/user";
import { ITraining } from "@/shared/interface/training";
import { useEffect, useState } from "react";
import Link from "next/link";
export const TrainingCard = ({
  training,
  isKnowClient = false,
  authTrainer,
}: {
  training: ITraining;
  isKnowClient?: boolean;
  authTrainer?: IUser;
}) => {
  const { day, month, dayOfWeek } = parseDateToDateAndMonth(
    training?.date.toString()
  );
  const [isMyTraining, setIsMyTraining] = useState<boolean>(true);
  useEffect(() => {
    setIsMyTraining(authTrainer?.id === training.trainer.id);
  }, [authTrainer?.id, training.trainer.id]);

  return (
    <>
      {training.id && isMyTraining ? (
        <Link
          href={`/app/training/${training.id}/edit`}
          style={{ width: "100%" }}
        >
          <article
            style={{ opacity: isMyTraining ? "" : "0.5" }}
            className={styles.article}
          >
            <section className={styles.leftWrap}>
              <div className={styles.trainingInfo}>
                <h4 className={styles.h4}>
                  {isKnowClient
                    ? day + " " + month.name.toLocaleLowerCase()
                    : training.client.name + " " + training.client.surname}
                </h4>
                <div className={styles.column}>
                  <h5 className={styles.h5}>
                    {training.subscription
                      ? training?.subscription?.transaction?.tariff?.sport?.name
                      : training?.transaction?.tariff?.sport?.name}
                  </h5>
                  <h5 className={styles.h5}>
                    {training.subscription
                      ? training?.subscription.transaction.tariff?.name
                      : training?.type?.name}
                  </h5>
                </div>
              </div>
              <div className={styles.training}>
                <span className={styles.divider} />
                <div className={styles.wrapInfo}>
                  <h5 className={styles.address}>
                    {training.club.address}, {training.club.name}
                  </h5>
                  <h4 className={styles.time}>
                    {training.slot.beginning} - {training.slot.end}
                  </h4>
                  <h4 className={styles.status}>
                    {isMyTraining
                      ? training.subscription?.transaction.status ||
                        training.transaction.status
                      : training.trainer.name + " " + training.trainer.surname}
                  </h4>
                </div>
              </div>
            </section>
            <span className={styles.arrow}>
              <Image src={ArrowRight} width={16} height={16} alt="Перейти" />
            </span>
          </article>
        </Link>
      ) : (
        <article
          style={{ opacity: isMyTraining ? "" : "0.5" }}
          className={styles.article}
        >
          <section className={styles.leftWrap}>
            <div className={styles.trainingInfo}>
              <h4 className={styles.h4}>
                {isKnowClient
                  ? day + " " + month.name.toLocaleLowerCase()
                  : training.client.name + " " + training.client.surname}
              </h4>
              <div className={styles.column}>
                <h5 className={styles.h5}>
                  {training.subscription
                    ? training?.subscription?.transaction?.tariff?.sport?.name
                    : training?.transaction?.tariff?.sport?.name}
                </h5>
                <h5 className={styles.h5}>
                  {training.subscription
                    ? training?.type?.name
                    : training?.type?.name}
                </h5>
              </div>
            </div>
            <div className={styles.training}>
              <span className={styles.divider} />
              <div className={styles.wrapInfo}>
                <h5 className={styles.address}>
                  {training.club.address}, {training.club.name}
                </h5>
                <h4 className={styles.time}>
                  {training.slot.beginning} - {training.slot.end}
                </h4>
                <h4 className={styles.status}>
                  {isMyTraining
                    ? training.transaction?.status
                    : training.trainer.name + " " + training.trainer.surname}
                </h4>
              </div>
            </div>
          </section>
          <span className={styles.arrow}>
            <Image src={ArrowRight} width={16} height={16} alt="Перейти" />
          </span>
        </article>
      )}
    </>
  );
};
