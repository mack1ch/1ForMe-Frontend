import { ClientSubscriptionCard } from "@/entities/client-slice/clientSubscritionCard";
import styles from "./ui.module.scss";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { ISubscription } from "@/shared/interface/subscriptions";
import { getSubscriptions } from "../api";
import { LackData } from "@/shared/ui/error-slice/lackData";

export const ClientSubscriptions = ({ userID }: { userID?: number }) => {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>();
  useEffect(() => {
    async function getSubs() {
      const subs: ISubscription[] | Error = await getSubscriptions(userID!);
      if (subs instanceof Error) return;
      setSubscriptions(subs);
    }
    getSubs();
  }, [userID]);
  return (
    <>
      <div className={styles.layout}>
        <Button
          href={`/app/clients/client/${userID}/subscription`}
          size="large"
          type="primary"
          style={{ width: "100%" }}
          className={styles.btn}
        >
          Добавить абонемент
        </Button>
        {subscriptions && subscriptions?.length > 0 ? (
          subscriptions.map((item) => (
            <ClientSubscriptionCard key={item.id} subscription={item} />
          ))
        ) : (
          <LackData>Нет абонементов</LackData>
        )}
      </div>
    </>
  );
};
