import { ClientPaymentCard } from "@/entities/client-slice/clientPaymentCard";
import styles from "./ui.module.scss";
import { useEffect, useState } from "react";
import { ITransaction } from "@/shared/interface/transaction";
import { getUserTransactionById } from "../api";
import { LackData } from "@/shared/ui/error-slice/lackData";

export const ClientPaymentRender = ({ userID }: { userID: number }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>();
  useEffect(() => {
    async function getTransaction() {
      const transactionData: ITransaction[] | Error =
        await getUserTransactionById(userID);
      if (transactionData instanceof Error) return;
      setTransactions(transactionData);
    }
    getTransaction();
  }, [userID]);
  return (
    <>
      <section className={styles.layout}>
        {transactions && transactions?.length > 0 ? (
          transactions.map((item) => (
            <ClientPaymentCard key={item.id} transaction={item} />
          ))
        ) : (
          <LackData>Нет оплат</LackData>
        )}
      </section>
    </>
  );
};
