import { useEffect, useState } from "react";
import { IURL } from "../interface";
import { IUser } from "@/shared/interface/user";
import { getIframeLink } from "../api";

export const GlobalMessenger = ({ user }: { user?: IUser }) => {
  const [iframeLink, setIframeLink] = useState<IURL>();
  useEffect(() => {
    async function getIFrameLinkByPOSTReq() {
      const link = await getIframeLink(
        user?.id,
        user?.name + " " + user?.surname!
      );
      if (link instanceof Error) return;
      setIframeLink(link);
    }
    if (user) {
      getIFrameLinkByPOSTReq();
    }
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
