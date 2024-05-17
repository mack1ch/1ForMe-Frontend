"use client";

import { ClientRecord } from "@/features/profile-slice/clientRecord";
import { ProfileCard } from "@/features/profile-slice/profileCard";
import { TariffCard } from "@/features/profile-slice/tariffCard";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { SettingsIcon } from "@/shared/ui/profile-slice/settingsIcon";

export default function Home() {
  return (
    <>
      <PageHeader icon={<SettingsIcon href="/app/profile/settings" />}>
        Профиль
      </PageHeader>
      <PageLayout>
        <ProfileCard />
        {/* <ClientRecord /> */}
        <TariffCard />
      </PageLayout>
    </>
  );
}
