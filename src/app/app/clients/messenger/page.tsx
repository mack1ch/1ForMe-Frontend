"use client";

import { TapBar } from "@/entities/footer-slice/tapBar";
import { GlobalMessenger } from "@/features/messenger-slice/globalMessenger";
import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: number } }) {
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    async function getUser() {
      const authUser: AxiosResponse<IUser> = await instanceLogged.get(
        `/users/me`
      );
      if (authUser instanceof Error) return;
      setUser(authUser.data);
    }
    getUser();
  }, [params.id]);
  return (
    <>
      <div className="messenger__layout">
        <GlobalMessenger user={user} />
        <TapBar />
      </div>
    </>
  );
}
