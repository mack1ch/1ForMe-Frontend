"use client";

import { TapBar } from "@/entities/footer-slice/tapBar";
import { MessengerWindow } from "@/features/messenger-slice/messengerWindow";

export default function Home() {
  return (
    <>
      <div className="messenger__layout">
        <MessengerWindow />
        <TapBar />
      </div>
    </>
  );
}
