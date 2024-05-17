"use client";

import { PageLayout } from "@/screens/layout/pageLayout";
import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { ClientInfoIcon } from "@/shared/ui/client-slice/clientInfoIcon";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { Client } from "@/widgets/client-slice/client";
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
      <PageHeader
        icon={<ClientInfoIcon href={`/app/clients/client/${params.id}/info`} />}
        onBack={() => router.back()}
      >
        {user && user?.name} {user?.surname && user.surname}
      </PageHeader>
      <PageLayout>
        <Client userID={params.id} />
      </PageLayout>
    </>
  );
}
