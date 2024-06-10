"use client";
import { useEffect } from "react";

export const ServiceWorker = () => {
  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === "production") {
        await navigator.serviceWorker.register("/sw.js");
      } else {
        navigator.serviceWorker
          .getRegistrations()
          .then((registrations) => {
            for (const registration of registrations) {
              registration.unregister();
            }
          })
          .catch(function (err) {
            console.log("Service Worker registration failed: ", err);
          });
      }
    })();
  }, []);
  return <></>;
};
