"use client";

import { TabClubs } from "@/features/schedule-slice/tabClubs";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <PageHeader onBack={() => router.back()}>Расписание</PageHeader>
      <PageLayout>
        <TabClubs />
      </PageLayout>
    </>
  );
}
