import Image from "next/image";
import styles from "./ui.module.scss";
import Divider from "../../../../../../public/assets/divider.svg";
import { CSSProperties } from "react";
export const DashDivider = ({ style }: { style?: CSSProperties }) => {
  return (
    <>
      <Image
        className={styles.divider}
        style={{ ...style }}
        layout={"responsive"}
        src={Divider}
        alt="Divider"
      />
    </>
  );
};
