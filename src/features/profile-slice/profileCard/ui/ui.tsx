import { Avatar } from "@/entities/profile-slice/avatar";
import styles from "./ui.module.scss";
import { useEffect, useState } from "react";
import { IUser } from "@/shared/interface/user";
import { getAuthUser } from "../api";
import { parsePhoneNumber } from "@/shared/lib/parse/phone";
import Image from "next/image";
import { DashDivider } from "@/shared/ui/divider-slice/dashDivider/ui/ui";
import Lighting from "../../../../../public/icons/profile/lighting.svg";
import Confetti from "../../../../../public/icons/profile/сonfetti.svg";
import { parseDateToDateAndMonth } from "@/shared/lib/parse/date";
export const ProfileCard = () => {
  const [user, setUser] = useState<IUser | null>();
  const { day, month } = parseDateToDateAndMonth(
    user?.birthday?.toString() || ""
  );
  useEffect(() => {
    async function getUser() {
      const authUser: IUser | Error = await getAuthUser();
      if (authUser instanceof Error) return;
      setUser(authUser);
    }
    getUser();
  }, []);

  return (
    <>
      <article className={styles.profile}>
        {user && (
          <>
            <div className={styles.user}>
              <Avatar avatarLink={user.avatar} />
              <div className={styles.column}>
                <h3 className={styles.user_name}>
                  {user.name || user.surname
                    ? user.name + " " + user.surname
                    : "Измените имя"}
                </h3>
                <p className={styles.user_phone}>
                  {parsePhoneNumber(user.phone)}
                </p>
              </div>
            </div>
            <div className={styles.studiosRender}>
              {user.trainerProfile?.studios?.map((studio) => (
                <div key={studio.id} className={styles.studio}>
                  {studio.name}
                </div>
              ))}
            </div>
            <div className={styles.tags}>
              {user.trainerProfile?.experience && (
                <div className={styles.experience}>
                  <Image src={Lighting} width={16} height={16} alt="Lighting" />
                  {user.trainerProfile?.experience} лет опыта
                </div>
              )}
              {user.trainerProfile?.category && (
                <div className={styles.category}>
                  {user.trainerProfile?.category}
                </div>
              )}
              {user.birthday && (
                <div className={styles.dateOfBirth}>
                  <Image
                    src={Confetti}
                    width={16}
                    height={16}
                    alt="День рождения"
                  />
                  {day} {month.name}
                </div>
              )}
              {user.trainerProfile.sports &&
                user.trainerProfile.sports.length > 0 &&
                user.trainerProfile.sports.map((sport, index) => (
                  <div key={index} className={styles.category}>
                    {sport.name}
                  </div>
                ))}
            </div>
            {user.trainerProfile?.description && <DashDivider />}
            {user.trainerProfile?.description && (
              <div className={styles.description}>
                <h4 className={styles.h4}>О себе</h4>
                <p className={styles.p}>{user.trainerProfile?.description}</p>
              </div>
            )}
          </>
        )}
      </article>
    </>
  );
};
