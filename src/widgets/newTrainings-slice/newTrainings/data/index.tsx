import { CreateSubscription } from "@/features/training-slice/createSubscription";
import { ITabItem } from "../interface";
import { CreateNewTraining } from "@/features/training-slice/createNewTraining";

export const DTabItems: ITabItem[] = [
  {
    title: "Абонемент",
    content: (
      <>
        <CreateSubscription />
      </>
    ),
  },
  {
    title: "Занятие",
    content: (
      <>
        <CreateNewTraining />
      </>
    ),
  },
];
