import Image from "next/image";
import styles from "./ui.module.scss";
import Plus from "../../../../../public/icons/clubs/plus.svg";
import { IClubSlot, ISlotsForStudio } from "@/shared/interface/slots";
import Link from "next/link";

export const ClubCard = ({
  clubSlot,
  slotsForStudio,
  date,
}: {
  clubSlot: IClubSlot[];
  slotsForStudio: ISlotsForStudio;
  date: Date;
}) => {
  if (!clubSlot) return;
  return (
    <>
      <article className={styles.clubCard}>
        <div className={styles.info}>
          <div className={styles.info__text}>
            <h4 className={styles.name}>{slotsForStudio.club.name}</h4>
            <h5 className={styles.freeSlots}>
              {clubSlot.length} свободных слотов по часу
            </h5>
          </div>
        </div>
        <div className={styles.tags}>
          {clubSlot
            .filter((item) => item.isAvailable)
            .map((item, index) => (
              <Link
                key={index}
                className={styles.tag}
                href={`/app/dashboard/schedule/clubs/${
                  item.beginning +
                  "&" +
                  date.toLocaleDateString("ru-RU") +
                  "&" +
                  slotsForStudio.club.id
                }/newtraining`}
              >
                {item.beginning}
                <Image src={Plus} width={16} height={16} alt="Plus" />
              </Link>
            ))}
        </div>
      </article>
    </>
  );
};
