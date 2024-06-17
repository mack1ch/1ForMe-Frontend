"use client";

import { PageLayout } from "@/screens/layout/pageLayout";
import { instanceLogged, wazzupInstance } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { HeadingWithSlash } from "@/shared/ui/headeing-slice/headingWithSlash";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { Clients } from "@/widgets/client-slice/clientsRender";
import { MessageOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface IUnansweredMessageCounter {
  counterV2: number;
}

export default function Home() {
  const [unansweredMessageCounter, setUnansweredMessageCounter] =
    useState<number>();
  useEffect(() => {
    async function getCounter() {
      const trainer: AxiosResponse<IUser> = await instanceLogged.get(
        "/users/me"
      );
      if (trainer instanceof Error) return;
      else {
        const counter: AxiosResponse<IUnansweredMessageCounter> =
          await wazzupInstance.get(`/v3/unanswered/${trainer.data.id}`);
        if (counter instanceof Error) return;
        setUnansweredMessageCounter(counter.data.counterV2);
      }
    }
    getCounter();
  }, []);
  return (
    <>
      <PageHeader isChildrenWithOutText>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <HeadingWithSlash>Клиенты</HeadingWithSlash>
          <Badge overflowCount={100} count={unansweredMessageCounter}>
            <Button
              href="/app/clients/messenger"
              style={{ float: "right" }}
              icon={<MessageOutlined />}
              shape="circle"
              size="large"
              type="primary"
            ></Button>
          </Badge>
        </div>
      </PageHeader>
      <PageLayout isMargin>
        <Clients />
      </PageLayout>
    </>
  );
}
