"use client";

import { CreateNewTraining } from "@/features/training-slice/createNewTraining";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <PageHeader onBack={() => router.back()}>Занятие</PageHeader>
      <PageLayout isMargin>
        <CreateNewTraining />
      </PageLayout>
    </>
  );
}
