"use client";

import { CreateSubscription } from "@/features/training-slice/createSubscription";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <PageHeader onBack={() => router.back()}>Новый абонемент</PageHeader>
      <PageLayout isMargin>
        <CreateSubscription />
      </PageLayout>
    </>
  );
}
