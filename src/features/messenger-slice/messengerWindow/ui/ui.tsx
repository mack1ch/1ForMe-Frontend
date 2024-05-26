"use client";

import { useEffect, useState } from "react";
import { getIframeLink } from "../api";
import { IURL } from "../interface";
import { IUser } from "@/shared/interface/user";

export const MessengerWindow = ({ user }: { user?: IUser }) => {
  const [iframeLink, setIframeLink] = useState<IURL>();

  useEffect(() => {
    async function getIFrameLinkByPOSTReq() {
      const link = await getIframeLink(
        user?.chatType!,
        user?.phone!,
        user?.userNameInMessenger
      );

      if (link instanceof Error) return;
      setIframeLink(link);
    }
    getIFrameLinkByPOSTReq();
  }, [user]);

  return (
    <>
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <iframe
          allow="microphone *; clipboard-write *"
          src={iframeLink?.url}
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};
