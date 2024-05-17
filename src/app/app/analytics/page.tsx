import { Statistics } from "@/features/analytics-slice/statistics";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";
import { Analytic } from "@/widgets/analytics-slice/analytic";

export default function Home() {
  return (
    <>
      <PageHeader>Аналитика</PageHeader>
      <PageLayout>
        <Analytic />
      </PageLayout>
    </>
  );
}
