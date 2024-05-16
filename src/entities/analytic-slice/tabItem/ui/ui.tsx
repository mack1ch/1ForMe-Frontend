import { CSSProperties, ReactNode } from "react";
import styles from "./ui.module.scss";

export const TabItem = ({
  children,
  className,
  onClick,
  id,
  style,
}: {
  children: ReactNode;
  className: string;
  id: number;
  style?: CSSProperties;
  onClick: (arg: number) => void;
}) => {
  return (
    <>
      <article
        style={{ ...style }}
        onClick={() => onClick(id)}
        className={`${styles.tabItem} ${className}`}
      >
        {children}
      </article>
    </>
  );
};
