import { ThemeConfig } from "antd";

export const TAuth: ThemeConfig = {
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
    }
}