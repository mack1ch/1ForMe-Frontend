"use client";

import { TabClubs } from "@/features/schedule-slice/tabClubs";
import { CreateNewTraining } from "@/features/training-slice/createNewTraining";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { useParams, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const params = useParams<{ time: string }>();
  return (
    <>
      <PageHeader onBack={() => router.back()}>Занятие</PageHeader>
      <PageLayout isMargin>
        <CreateNewTraining date={params.time} />
      </PageLayout>
    </>
  );
}
