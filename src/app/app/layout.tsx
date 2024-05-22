"use client";

import { AppLayout } from "@/screens/layout/appLayout";
import PrivateRoute from "@/shared/lib/auth/private-router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React, { ReactNode } from "react";

export default function LayoutPage({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <AntdRegistry>
        <PrivateRoute>
          <AppLayout>{children}</AppLayout>
        </PrivateRoute>
      </AntdRegistry>
    </>
  );
}
