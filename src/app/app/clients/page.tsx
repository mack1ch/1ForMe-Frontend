"use client";

import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { Clients } from "@/widgets/client-slice/clientsRender";
import { useRouter } from "next/navigation";

export default function Home({ params }: { params: { id: number } }) {
  const router = useRouter();

  return (
    <>
      <PageHeader onBack={() => router.back()}>Клиенты</PageHeader>
      <PageLayout isMargin>
        <Clients />
      </PageLayout>
    </>
  );
}
