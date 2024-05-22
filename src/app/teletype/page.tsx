"use client";

import { MessengerWindow } from "@/features/messenger-slice/messengerWindow";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
   
      <MessengerWindow />
    </>
  );
}
