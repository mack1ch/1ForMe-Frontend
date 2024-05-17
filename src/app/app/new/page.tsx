
import { NewClientForm } from "@/entities/client-slice/newClientForm";
import { PageLayout } from "@/screens/layout/pageLayout";
import { PageHeader } from "@/shared/ui/header-slice/pageHeader";

export default function Home() {
  return (
    <>
      <PageHeader >Новый клиент</PageHeader>
      <PageLayout>
        <NewClientForm />
      </PageLayout>
    </>
  );
}
