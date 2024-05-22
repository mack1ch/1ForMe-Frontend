"use client";

import { useEffect, useState } from "react";
import { getIframeLink } from "../api";
import { IURL } from "../interface";

export const MessengerWindow = () => {
  const [iframeLink, setIframeLink] = useState<IURL>();
  useEffect(() => {
    async function getIFrameLinkByPOSTReq() {
      const link = await getIframeLink();
      if (link instanceof Error) return;
      setIframeLink(link);
    }
    getIFrameLinkByPOSTReq();
  }, []);
  return (
    <>
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <iframe src={iframeLink?.url} width="100%" height="100%" />
      </div>
    </>
  );
};
