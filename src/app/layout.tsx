import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ServiceWorker } from "@/shared/pwa/serviceWorker";

export const metadata: Metadata = {
  title: "1ForMe",
  description:
    "1ForMe - студия персональных и сплит тренировок для двоих. Место где можно побыть наедине с собой.",
  manifest: "/manifest.json",
};

const RF_Dewi = localFont({
  src: [
    {
      path: "../../public/font/RFDewi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/RFDewi-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/RFDewi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={RF_Dewi.className}>
        <ServiceWorker />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
