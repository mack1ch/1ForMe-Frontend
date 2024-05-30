import styles from "./ui.module.scss";
import Arrow from "../../../../../public/icons/clients/chevronRightBlack.svg";
import Image from "next/image";
import {
  ETransactionStatus,
  ITransaction,
} from "@/shared/interface/transaction";
import { parseDateToDateAndMonth } from "@/shared/lib/parse/date";
import { convertTimeFormat } from "../model";
export const ClientPaymentCard = ({
  transaction,
}: {
  transaction: ITransaction;
}) => {
  const { day, month, dayOfWeek } = parseDateToDateAndMonth(
    transaction.createdAt.toString()
  );

  return (
    <>
      <article className={styles.article}>
        <div className={styles.left}>
          <h4 className={styles.date}>
            {day} {month.name}
          </h4>
          <h5 className={styles.time}>
            {transaction.training?.slot.beginning &&
              transaction.training?.slot.end &&
              `${transaction?.training?.slot.beginning} –
                ${transaction?.training?.slot.end}`}
          </h5>
          <h5
            style={{
              color:
                transaction?.status?.toLowerCase() === "unpaid"
                  ? "#9F0000"
                  : "#6FAE48",
            }}
            className={styles.type}
          >
            {ETransactionStatus[transaction.status] ||
              ETransactionStatus[transaction.status]}
          </h5>
        </div>
        <div className={styles.right}>
          <div className={styles.right_date}>
            <h4 className={styles.cost}>{transaction.cost} ₽</h4>
            <h5 className={styles.sport}>
              {transaction.tariff?.sport?.name} /{" "}
              {convertTimeFormat(transaction?.tariff.duration)}
            </h5>
          </div>
          <picture className={styles.icon}>
            <Image src={Arrow} width={16} height={16} alt="Перейти" />
          </picture>
        </div>
      </article>
    </>
  );
};
