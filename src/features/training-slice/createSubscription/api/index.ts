import { instanceLogged } from "@/shared/api/axios-config";
import { IClub } from "@/shared/interface/studio";
import { ITariff } from "@/shared/interface/tariff";
import { IUser } from "@/shared/interface/user";
import { IFormData, ITrainings } from "../interface";
import { ISubscription } from "@/shared/interface/subscriptions";
import { IClubSlot } from "@/shared/interface/slots";
import { convertDateFormatToDoteFormat } from "@/shared/lib/parse/date";

export const getTrainerClients = async (): Promise<IUser[] | Error> => {
  try {
    const { data }: { data: IUser[] } = await instanceLogged.get(
      `/users/trainers/clients`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getTariffs = async (): Promise<ITariff[] | Error> => {
  try {
    const { data }: { data: ITariff[] } = await instanceLogged.get(
      `/users/trainers/my/tariffs?isForSubscription=1`
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

export const postSubscription = async (
  formData: IFormData,
  trainings: ITrainings[],
  clientID: number,
  selectedSlots: { [key: string]: number | null }
): Promise<ISubscription | Error> => {
  try {
    const createTrainingDto = trainings.map((item, index) => {
      const slot = item.date && selectedSlots[item.date];
      return {
        date: convertDateFormatToDoteFormat(item.date || ""),
        slot: slot || 0,
        club: formData.clubID || 0,
      };
    });

    const { data }: { data: ISubscription } = await instanceLogged.post(
      `/subscriptions`,
      {
        client: clientID,
        tariff: formData.tariffID,
        type: 1,
        createTrainingDto,
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getSlots = async (
  date: string,
  clubID: number | string
): Promise<IClubSlot[] | Error> => {
  try {
    const { data }: { data: IClubSlot[] } = await instanceLogged.get(
      `/clubs/${clubID}/slots?date=${convertDateFormatToDoteFormat(date)}`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};


