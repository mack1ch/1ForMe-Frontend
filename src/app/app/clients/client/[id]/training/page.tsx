"use client";

import { CreateNewTraining } from "@/features/training-slice/createNewTraining";
import { PageLayout } from "@/screens/layout/pageLayout";
import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    async function getUser() {
      const authUser: AxiosResponse<IUser> = await instanceLogged.get(
        `/users/byId/${params.id}`
      );
      if (authUser instanceof Error) return;
      setUser(authUser.data);
    }
    getUser();
  }, [params.id]);
  return (
    <>
      <PageHeader onBack={() => router.back()}>Занятие</PageHeader>
      <PageLayout isMargin>
        <CreateNewTraining clientID={params.id} />
      </PageLayout>
    </>
  );
}
