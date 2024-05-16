"use client";

import { NewClientForm } from "@/entities/client-slice/newClientForm";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <PageHeader onBack={() => router.back()} >
        Новый клиент
      </PageHeader>
      <PageLayout isMargin>
        <NewClientForm />
      </PageLayout>
    </>
  );
}
