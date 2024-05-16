"use client";

import { usePathname } from "next/navigation";
import styles from "./ui.module.scss";
import Link from "next/link";
import Settings from "../../../../../../public/icons/profile/faders.svg";
import Image from "next/image";
export const SettingsIcon = ({ href }: { href: string }) => {
  const pathname = usePathname();
  return (
    <>
      <Link
        className={`${styles.icon} ${href == pathname ? styles.active : ""}`}
        href={href}
      >
        <Image src={Settings} width={22} height={22} alt="Инфо" />
      </Link>
    </>
  );
};
