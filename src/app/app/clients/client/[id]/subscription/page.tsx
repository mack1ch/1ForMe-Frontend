"use client";

import { CreateNewTraining } from "@/features/training-slice/createNewTraining";
import { CreateSubscription } from "@/features/training-slice/createSubscription";
import { PageLayout } from "@/screens/layout/pageLayout";
import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: number } }) {
  const router = useRouter();

  return (
    <>
      <PageHeader onBack={() => router.back()}>Новый абонемент</PageHeader>
      <PageLayout isMargin>
        <CreateSubscription clientID={params.id} />
      </PageLayout>
    </>
  );
}
