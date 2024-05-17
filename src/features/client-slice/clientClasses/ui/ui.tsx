import { ITraining } from "@/shared/interface/training";
import { useEffect, useState } from "react";
import { getAllUserTrainings, getAuthUser } from "../api";
import { TrainingCard } from "@/entities/client-slice/trainingCard";
import styles from "./ui.module.scss";
import { Button } from "antd";
import { LackData } from "@/shared/ui/error-slice/lackData";
import { IUser } from "@/shared/interface/user";

export const ClientClasses = ({ userID }: { userID?: number }) => {
  const [trainings, setTrainings] = useState<ITraining[]>();
  const [authTrainer, setAuthTrainer] = useState<IUser>();
  useEffect(() => {
    async function getTraining() {
      const trainer = await getAuthUser();
      const trainings: ITraining[] | Error = await getAllUserTrainings(userID!);
      if (trainings instanceof Error || trainer instanceof Error) return;
      setTrainings(trainings);
      setAuthTrainer(trainer);
    }
    getTraining();
  }, [userID]);
  return (
    <>
      <div className={styles.layout}>
        <Button
          href={`/app/clients/client/${userID}/training`}
          size="large"
          type="primary"
          style={{ width: "100%" }}
          className={styles.btn}
        >
          Добавить занятия
        </Button>
        {trainings && trainings?.length > 0 ? (
          trainings.map((item) => (
            <TrainingCard
              key={item.id}
              authTrainer={authTrainer}
              training={item}
              isKnowClient
            />
          ))
        ) : (
          <LackData>Нет занятий</LackData>
        )}
      </div>
    </>
  );
};
