import React, { ReactNode } from "react";
import styles from "./ui.module.scss";
import { DTapBar } from "../data";
import { TapBarItem } from "@/shared/ui/footer-slice/tapBarItem";

export const TapBar = ({ subChildren }: { subChildren?: ReactNode }) => {
  
  return (
    <>
      {subChildren ? (
        <>
          <div className={styles.footer_layout}>
            <div style={{ width: "100%" }}>{subChildren}</div>
            <footer className={styles.tapBar}>
              {DTapBar.map((item, index) => (
                <TapBarItem tapBarItemProps={item} key={index} />
              ))}
            </footer>
          </div>
        </>
      ) : (
        <footer className={styles.tapBar}>
          {DTapBar.map((item, index) => (
            <TapBarItem tapBarItemProps={item} key={index} />
          ))}
        </footer>
      )}
    </>
  );
};
