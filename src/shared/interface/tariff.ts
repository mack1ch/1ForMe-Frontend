import { ISport } from "./sport";
import { IStudio } from "./studio";

export interface ITariff {
  id: number;
  name: string;
  cost: number;
  sport: ISport;
  duration: string;
  trainingAmount?: number;
  subExpireAt?: number; // Длительность абонемента
  clientsAmount: number;
  studio: IStudio;
  trainerCategory: string;
}
