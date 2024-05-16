import Image from "next/image";
import styles from "./ui.module.scss";
import Divider from "../../../../../public/assets/divider.svg";
import { ITransaction } from "@/shared/interface/transaction";
import { DashDivider } from "@/shared/ui/divider-slice/dashDivider/ui/ui";
export const TransactionCard = ({
  isLast = false,
  transaction,
}: {
  isLast?: boolean;
  transaction: ITransaction;
}) => {
  return (
    <>
      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.firstLayout}>
            <h3 className={styles.name}>
              {transaction?.client?.name + " " + transaction?.client?.surname}
            </h3>
            <h4
              style={{
                color:
                  transaction?.status?.toLowerCase() === "не оплачено"
                    ? "#F36C6C"
                    : "#6FAE48",
              }}
              className={styles.sport}
            >
              {transaction.status.toLowerCase()}
            </h4>
          </div>
          <div className={styles.wrap}>
            <span className={styles.divider} />
            <div className={styles.secondLayout}>
              <h5 className={styles.price}>{transaction?.cost} ₽</h5>
              <h6 className={styles.date}>
                {transaction.training?.slot.beginning &&
                  transaction.training?.slot.end &&
                  `${transaction?.training?.slot.beginning} –
                ${transaction?.training?.slot.end}`}
              </h6>
            </div>
          </div>
        </article>
        {!isLast && <DashDivider />}
      </div>
    </>
  );
};
