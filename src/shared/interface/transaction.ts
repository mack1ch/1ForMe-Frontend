import { ISport } from "./sport";
import { ISubscription } from "./subscriptions";
import { ITariff } from "./tariff";
import { ITraining } from "./training";
import { IUser } from "./user";

export interface ITransaction {
  id: number;
  trainer: IUser;
  client: IUser;
  cost: number;
  createdAt: Date;
  status: string;
  tariff: ITariff;
  training: ITraining;
  subscription: ISubscription;
  subExpireAt: Date;
}

export interface IApiTransaction {
  transactions: ITransaction[];
  totalCost: number;
  day: number;
  month: number;
}
