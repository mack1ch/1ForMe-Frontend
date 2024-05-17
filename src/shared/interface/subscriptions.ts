import { ITraining } from "./training";
import { ITransaction } from "./transaction";
import { IUser } from "./user";

export interface ISubscription {
  id: number;
  trainer: IUser;
  client: IUser;
  transaction: ITransaction;
  trainings: ITraining[];
  expireAt: Date;
  finishedTrainingsCount: number;
  nextTraining: ITraining;
  isFinished: boolean;
}
