import { CreateSubscription } from "@/features/training-slice/createSubscription";
import { ITabItem } from "../interface";
import { CreateNewTraining } from "@/features/training-slice/createNewTraining";

export const DTabItems: ITabItem[] = [
  {
    title: "Занятие",
    content: (
      <>
        <CreateNewTraining />
      </>
    ),
  },
  {
    title: "Абонемент",
    content: (
      <>
        <CreateSubscription />
      </>
    ),
  },
];
