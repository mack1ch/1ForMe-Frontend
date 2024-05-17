"use client";

import Link from "next/link";
import styles from "./ui.module.scss";
import Copy from "../../../../../public/icons/profile/copy.svg";
import Image from "next/image";
import { IUser } from "@/shared/interface/user";
import { useEffect, useState } from "react";
import { getAuthUser } from "../api";
export const ClientRecord = () => {
  const [user, setUser] = useState<IUser | null>();

  const copyTextToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(user?.trainerProfile?.link || "");
  };

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
      {user?.trainerProfile?.link && (
        <article className={styles.article}>
          <h2 className={styles.h2}>Ссылка для записи</h2>
          <div className={styles.link_layout}>
            <div className={styles.link}>
              <Link className={styles.href} href={user?.trainerProfile?.link}>
                {user.trainerProfile?.link}
              </Link>
            </div>
            <button
              onClick={() => copyTextToClipboard("Текст для копирования")}
              className={styles.copy}
            >
              <Image src={Copy} width={24} height={24} alt="Copy" />
            </button>
          </div>
        </article>
      )}
    </>
  );
};
