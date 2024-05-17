"use client";

import { TapBar } from "@/entities/footer-slice/tapBar";
import styles from "./ui.module.scss";
import { ReactNode, useEffect } from "react";
import { TapBarWithChildren } from "@/entities/footer-slice/tapBarWithChildren";
import { usePathname } from "next/navigation";
import { NewClient } from "@/entities/client-slice/newClientButton";
import { AddClientButton } from "@/entities/client-slice/addClientButton";
import { ConfigProvider, ThemeConfig } from "antd";

export const AppLayout = ({
  children,
  tapBarChildren,
  tapBarSubChildren,
}: Readonly<{
  children: ReactNode;
  tapBarChildren?: ReactNode;
  tapBarSubChildren?: ReactNode;
}>) => {
  const pathName = usePathname();
  if (pathName === "/app/clients") {
    return (
      <>
        <ConfigProvider theme={globalContext}>
          <div className={styles.page}>
            {children}
            <TapBar subChildren={<NewClient />} />
          </div>
        </ConfigProvider>
      </>
    );
  } else if (pathName === "/app/clients/new") {
    <>
      <ConfigProvider theme={globalContext}>
        <div className={styles.page}>
          {children}
          <TapBar subChildren={<AddClientButton />} />
        </div>
      </ConfigProvider>
    </>;
  }

  return (
    <>
      <ConfigProvider theme={globalContext}>
        <div className={styles.page}>
          {children}
          {tapBarChildren ? (
            <TapBarWithChildren>{tapBarChildren}</TapBarWithChildren>
          ) : (
            <TapBar subChildren={tapBarSubChildren} />
          )}
        </div>
      </ConfigProvider>
    </>
  );
};

export const globalContext: ThemeConfig = {
  token: {
    colorPrimary: "#E6F36C",
  },
  components: {
    Button: {
      colorPrimary: "#E6F36C",
      colorBgContainerDisabled: "#E3E3E3",
      colorTextDisabled: "rgba(0, 0, 0, 0.40)",
      colorPrimaryHover: "#E6F36C",
      colorPrimaryActive: "#ECFF3C",
      colorTextLightSolid: "#000",
      fontWeight: "600",
      primaryShadow: "none",
    },
    Input: {
      colorPrimaryHover: "#E6F36C",
      colorPrimary: "#E6F36C",
      activeShadow: "none",
    },
    DatePicker: {
      activeBorderColor: "#E6F36C",
      activeShadow: "none",
      fontSize: 16,
    },
    Select: {
      colorPrimary: "#E6F36C",
      controlOutline: "none",
    },
    Switch: {
      colorPrimary: "#E6F36C",
      colorPrimaryActive: "#E6F36C",
      colorPrimaryBg: "#e6f36c",
    },
  },
};
