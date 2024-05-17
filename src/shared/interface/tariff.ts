import { ISport } from "./sport";

export interface ITariff {
  id: number;
  name: string;
  cost: number;
  sport: ISport;
  
  duration: string;
  trainingAmount?: number;
}
