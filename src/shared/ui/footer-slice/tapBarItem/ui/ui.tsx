"use client";

import { ITapBarItem, TTapBarItemTitle } from "@/shared/interface/footer";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getActiveIconByActiveTitle } from "../model";
import styles from "./ui.module.scss";
import Image from "next/image";

export const TapBarItem = ({
  tapBarItemProps,
}: {
  tapBarItemProps: ITapBarItem;
}) => {
  const pathname = usePathname();
  const [activeTapBarItem, setActiveTapBarItem] = useState<
    TTapBarItemTitle | undefined
  >(tapBarItemProps.path === pathname ? tapBarItemProps.title : undefined);
  const [activeIcon, setActiveIcon] = useState<StaticImport | undefined>(
    undefined
  );
  useEffect(() => {
    setActiveTapBarItem(
      tapBarItemProps.path === pathname ? tapBarItemProps.title : undefined
    );
    setActiveIcon(getActiveIconByActiveTitle(activeTapBarItem));
  }, [activeTapBarItem, pathname, tapBarItemProps.path, tapBarItemProps.title]);
  return (
    <>
      <Link
        className={`${styles.tapBar_item} ${
          tapBarItemProps.path === pathname ? styles.tapBarItem__active : ""
        }`}
        href={tapBarItemProps.path}
      >
        <Image
          src={activeIcon ? activeIcon : tapBarItemProps.icon}
          width={24}
          height={24}
          alt="Icon"
        />
        <nav
          className={
            tapBarItemProps.path === pathname
              ? styles.tapBarItem__active
              : styles.tapBar
          }
        >
          {tapBarItemProps.title}
        </nav>
      </Link>
    </>
  );
};
