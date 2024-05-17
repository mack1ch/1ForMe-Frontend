"use client";

import { SettingsForm } from "@/features/profile-slice/settingsForm";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <PageHeader onBack={() => router.back()}>Настройки</PageHeader>
      <PageLayout isMargin>
        <SettingsForm />
      </PageLayout>
    </>
  );
}
