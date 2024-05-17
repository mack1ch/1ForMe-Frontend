import Link from "next/link";
import styles from "./ui.module.scss";
import Image from "next/image";
import Arrow from "../../../../../public/icons/clients/chevronRightBlack.svg";
import { IUser } from "@/shared/interface/user";
import { parseDateToDateAndMonth } from "@/shared/lib/parse/date";
export const ClientCard = ({ client }: { client: IUser }) => {
  const { day, month, dayOfWeek } = parseDateToDateAndMonth(
    client.closestTraining?.date.toString() || ""
  );
  return (
    <>
      <Link style={{ width: "100%" }} href={`/app/clients/client/${client.id}`}>
        <article className={styles.article}>
          <h3 className={styles.user}>
            {client?.name + " " + client?.surname}
          </h3>
          <div className={styles.training}>
            <span className={styles.divider} />
            <h4 className={styles.h4}>
              {client.closestTraining
                ? day + " " + month.name + " занятие"
                : "Занятий нет"}
            </h4>
            <span className={styles.arrow}>
              <Image src={Arrow} width={16} height={16} alt="Перейти" />
            </span>
          </div>
        </article>
      </Link>
    </>
  );
};
