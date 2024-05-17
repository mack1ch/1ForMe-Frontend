"use client";

import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { WorkTime } from "@/widgets/workTime-slice/workTime";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <PageHeader onBack={() => router.back()}>Рабочее время</PageHeader>
      <PageLayout isMargin>
        <WorkTime />
      </PageLayout>
    </>
  );
}
