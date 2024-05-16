"use client";

import { ScheduleButton } from "@/entities/mainPart-slice/scheduleBtn";
import { WorkTimeButton } from "@/entities/mainPart-slice/workTime";
import { PageLayout } from "@/screens/layout/pageLayout";
import { HeadingWithSlash } from "@/shared/ui/headeing-slice/headingWithSlash";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { Calendar } from "@/widgets/calendar-slice/calendar";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Home() {
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
          <HeadingWithSlash>Календарь</HeadingWithSlash>
          <Button
            href="/app/newtrainings"
            style={{ float: "right" }}
            icon={<PlusOutlined />}
            size="middle"
            type="primary"
          >
            Записать клиента
          </Button>
        </div>
      </PageHeader>
      <PageLayout isMargin>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ScheduleButton />
          <WorkTimeButton />
        </div>
        <Calendar />
      </PageLayout>
    </>
  );
}
