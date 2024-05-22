"use client";

import { useEffect, useState } from "react";
import { getIframeLink } from "../api";
import Script from "next/script";

export const MessengerWindow = () => {
  const [iframeLink, setIframeLink] = useState<string>();
  useEffect(() => {
    async function getIFrameLinkByPOSTReq() {
      const link = await getIframeLink();
      console.log(link);
      if (link instanceof Error) return;
      setIframeLink(link);
    }
    getIFrameLinkByPOSTReq();
  }, []);
  return (
    <>
     
      {/* <script>(</script> */}
    </>
  );
};
