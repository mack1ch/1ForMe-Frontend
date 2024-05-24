import { ClientInfoIcon } from "@/shared/ui/client-slice/clientInfoIcon";
import styles from "./ui.module.scss";
import { ChatIcon } from "@/shared/ui/client-slice/chatIcon";

export const ClientHeaderIcons = ({ paramsLink }: { paramsLink: string }) => {
  return (
    <>
      <div className={styles.layout}>
        <ChatIcon href={`/app/clients/client/${paramsLink}/messenger`} />
        <ClientInfoIcon href={`/app/clients/client/${paramsLink}/info`} />
      </div>
    </>
  );
};
