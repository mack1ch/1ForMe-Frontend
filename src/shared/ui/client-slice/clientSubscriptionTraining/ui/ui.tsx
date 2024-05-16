import Image from "next/image";
import styles from "./ui.module.scss";

import Arrow from "../../../../../../public/icons/clients/caretRight.svg";
import { ITraining } from "@/shared/interface/training";
import { formatDateToDayAndDateFormat } from "@/shared/lib/parse/date";
import { useRouter } from "next/navigation";

export const ClientSubscriptionTraining = ({
  isDisabled = false,
  training,
}: {
  isDisabled?: boolean;
  training: ITraining;
}) => {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push(`/app/training/${training.id}/edit`)}
        disabled={isDisabled}
        className={styles.button}
      >
        {formatDateToDayAndDateFormat(training.date.toString())}
        <Image src={Arrow} width={16} height={16} alt="Перейти" />
      </button>
    </>
  );
};
