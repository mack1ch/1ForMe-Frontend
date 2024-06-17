import { instanceLogged } from "@/shared/api/axios-config";
import { IClub } from "@/shared/interface/studio";
import { ITariff } from "@/shared/interface/tariff";
import { ITraining } from "@/shared/interface/training";
import { IUser } from "@/shared/interface/user";
import { IFormData } from "../interface";
import { IClubSlot } from "@/shared/interface/slots";
import { convertDateFormatToDoteFormat } from "@/shared/lib/parse/date";
import { AxiosError } from "axios";

export const getTrainerClients = async (): Promise<IUser[] | Error> => {
  try {
    const { data }: { data: IUser[] } = await instanceLogged.get(
      `/trainings/my/clients`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const cancelTrainerByID = async (
  trainingID: number | string
): Promise<ITraining | Error> => {
  try {
    const { data }: { data: ITraining } = await instanceLogged.post(
      `/trainings/cancel/${trainingID}`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getTariffs = async (): Promise<ITariff[] | Error> => {
  try {
    const { data }: { data: ITariff[] } = await instanceLogged.get(
      `/users/trainers/my/tariffs?isForSubscription=0`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getClubs = async (): Promise<IClub[] | Error> => {
  try {
    const { data }: { data: IClub[] } = await instanceLogged.get(`/clubs`);
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getSlots = async (
  date: string,
  clubID: number | string
): Promise<IClubSlot[] | Error> => {
  const formatDate = date && convertDateFormatToDoteFormat(date);
  try {
    const { data }: { data: IClubSlot[] } = await instanceLogged.get(
      `/clubs/${clubID}/slots?date=${formatDate}`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const createTraining = async (
  training: IFormData
): Promise<ITraining[] | AxiosError> => {
  try {
    const { data }: { data: ITraining[] } = await instanceLogged.post(
      `/trainings`,
      {
        slot: training.slotID,
        date: convertDateFormatToDoteFormat(training.date.toString()),
        client: training.clientID,
        type: 1,
        club: training.clubID,
        tariff: training.tariffID,
        isRepeat: training.isRepeated,
      }
    );
    return data;
  } catch (error) {
    return error as AxiosError;
  }
};

export const changeTraining = async (
  training: IFormData,
  trainingID: number
): Promise<ITraining[] | Error> => {
  try {
    const { data }: { data: ITraining[] } = await instanceLogged.patch(
      `/trainings/${trainingID}`,
      {
        slot: training.slotID,
        date: convertDateFormatToDoteFormat(training.date.toString()),
        client: training.clientID?.map((item) => item.toString()),
        type: 1,
        club: training.clubID,
        tariff: training.tariffID,
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
