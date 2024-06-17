"use client";

import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { Clients } from "@/widgets/client-slice/clientsRender";

export default function Home() {
  return (
    <>
      <PageHeader>Клиенты</PageHeader>
      <PageLayout isMargin>
        <Clients />
      </PageLayout>
    </>
  );
}
