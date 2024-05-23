import { IChatTypes } from "./chats";
import { ISport } from "./sport";
import { ITariff } from "./tariff";
import { ITraining } from "./training";

export interface IUser {
  id: number;
  phone: string;
  name: string;
  surname: string;
  role: IRole;
  avatar: string;
  trainer: IUser[];
  sports: ISport;
  birthday?: Date;
  chatType?: IChatTypes;
  closestTraining?: ITraining;
  trainerProfile: ITrainerProfile;
  comment?: string;
}

export interface ITrainerProfile {
  link?: string;
  tariff?: ITariff[];
  studio?: IStudio;
  whatsApp: string;
  clients?: IUser[];
  description: string;
  sports: ISport[];
  experience: number;
  category: string;
  tax?: number;
  isActive?: boolean;
}

export interface IRole {
  id: number;
  name: "coach" | "member";
}

export interface IStudio {
  id: number;
  name: string;
}
