import { ISport } from "./sport";
import { IUser } from "./user";

export interface IStudio {
  id: number;
  name: string;
  city: ICity;
  trainers: IUser;
  tax: number;
  clubs: IClub[];
  address: string;
  sports: ISport[];
}

export interface ICity {
  id: number;
  name: string;
}

export interface IClub {
  id: number;
  name: string;
  address: string;
  studio: IStudio;
}
