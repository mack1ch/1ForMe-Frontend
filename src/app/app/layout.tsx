"use client";

import { AppLayout } from "@/screens/layout/appLayout";
import PrivateRoute from "@/shared/lib/auth/private-router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Script from "next/script";

import React, { ReactNode } from "react";

export default function LayoutPage({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Script id="whathapp">
        {`(function() { 
          var widget = document.createElement('script'); 
          widget.dataset.pfId = '3ac20b47-97dd-409a-b0b0-333db0fcb36c'; 
          widget.src = 'https://widget.yourgood.app/script/widget.js?id=3ac20b47-97dd-409a-b0b0-333db0fcb36c&now=' + Date.now(); 
          document.head.appendChild(widget); 
        })()`}
      </Script>

      <AntdRegistry>
        <PrivateRoute>
          <AppLayout>{children}</AppLayout>
        </PrivateRoute>
      </AntdRegistry>
    </>
  );
}
