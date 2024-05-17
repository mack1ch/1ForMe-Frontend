import { IUser } from "./user";

export interface IComment {
  id: number;
  text: string;
  trainer: IUser;
  client: IUser;
  updatedAt: Date;
  createdAt: Date;
}
