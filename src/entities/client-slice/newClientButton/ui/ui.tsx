"use client";

import { Button } from "antd";
import styles from "./ui.module.scss";
import { useRouter } from "next/navigation";

export const NewClient = () => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => router.push("/app/clients/new")}
        className={styles.but}
        style={{ width: "100%" }}
        type="primary"
        size="large"
      >
        НОВЫЙ КЛИЕНТ
      </Button>
    </>
  );
};
