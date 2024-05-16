"use client";

import { PageLayout } from "@/screens/layout/pageLayout";
import { HeadingWithSlash } from "@/shared/ui/headeing-slice/headingWithSlash";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <PageHeader onBack={() => router.back()}>Тарифы</PageHeader>
      <PageLayout>Тарифы</PageLayout>
    </>
  );
}
