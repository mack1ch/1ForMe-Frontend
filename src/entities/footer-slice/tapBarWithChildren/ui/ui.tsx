import { ReactNode } from "react";
import styles from "./ui.module.scss";

export const TapBarWithChildren = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <footer className={`${styles.tapBar} ${styles.childrenLayout}`}>
        {children}
      </footer>
    </>
  );
};
