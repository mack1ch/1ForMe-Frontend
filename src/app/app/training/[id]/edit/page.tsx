"use client";

import { CreateNewTraining } from "@/features/training-slice/createNewTraining";
import { PageLayout } from "@/screens/layout/pageLayout";
import { instanceLogged } from "@/shared/api/axios-config";
import { ITraining } from "@/shared/interface/training";
import { IUser } from "@/shared/interface/user";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [training, setTraining] = useState<ITraining>();
  useEffect(() => {
    async function getTrainingByID() {
      const fetchTraining: AxiosResponse<ITraining> = await instanceLogged.get(
        `/trainings/byId/${params.id}`
      );
      if (fetchTraining instanceof Error) return;
      setTraining(fetchTraining.data);
    }
    getTrainingByID();
  }, [params.id]);
  return (
    <>
      <PageHeader onBack={() => router.back()}>Занятие</PageHeader>
      <PageLayout isMargin>
        <CreateNewTraining editTrainingData={training} />
      </PageLayout>
    </>
  );
}
