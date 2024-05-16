"use client";

import { CreateNewTraining } from "@/features/training-slice/createNewTraining";
import { CreateSubscription } from "@/features/training-slice/createSubscription";
import { PageLayout } from "@/screens/layout/pageLayout";
import { instanceLogged } from "@/shared/api/axios-config";
import { ISubscription } from "@/shared/interface/subscriptions";

import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [sub, setSub] = useState<ISubscription>();
  useEffect(() => {
    async function getSubByID() {
      const subData: AxiosResponse<ISubscription> = await instanceLogged.get(
        `/subscriptions/byId/${params.id}`
      );
      if (subData instanceof Error) return;
      setSub(subData.data);
    }
    getSubByID();
  }, [params.id]);
  return (
    <>
      <PageHeader onBack={() => router.back()}>Новый абонемент</PageHeader>
      <PageLayout isMargin>
        <CreateSubscription clientID={params.id} />
      </PageLayout>
    </>
  );
}
