"use client";

import { MessengerWindow } from "@/features/messenger-slice/messengerWindow";
import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { id: number } }) {
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
      <div className="messenger__layout">
        <MessengerWindow user={user} />
      </div>
    </>
  );
}
