"use client";

import { CreateSubscription } from "@/features/training-slice/createSubscription";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { NewTrainings } from "@/widgets/newTrainings-slice/newTrainings";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <PageHeader onBack={() => router.back()}>Создать занятие</PageHeader>
      <PageLayout>
        <NewTrainings />
      </PageLayout>
    </>
  );
}
