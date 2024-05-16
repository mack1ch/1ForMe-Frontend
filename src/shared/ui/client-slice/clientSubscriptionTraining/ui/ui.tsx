import Image from "next/image";
import styles from "./ui.module.scss";
import Trash from "../../../../../../public/icons/clients/trash.svg";
import Arrow from "../../../../../../public/icons/clients/caretRight.svg";
import { ITraining } from "@/shared/interface/training";
import { formatDateToDayAndDateFormat } from "@/shared/lib/parse/date";

export const ClientSubscriptionTraining = ({
  isDisabled = false,
  training,
}: {
  isDisabled?: boolean;
  training: ITraining;
}) => {
  return (
    <>
      <button disabled={isDisabled} className={styles.button}>
        {formatDateToDayAndDateFormat(training.date.toString())}
      </button>
    </>
  );
};
