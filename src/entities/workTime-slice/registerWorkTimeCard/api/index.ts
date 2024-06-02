import { instanceLogged } from "@/shared/api/axios-config";
import { IStudio } from "@/shared/interface/user";
import { IRegisterWorkTimeCard } from "../interface";
import { IClubSlot, ITrainerSlot } from "@/shared/interface/slots";

export const getAllStudios = async (): Promise<IStudio[] | Error> => {
  try {
    const { data }: { data: IStudio[] } = await instanceLogged.get(`/studios`);
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const deleteSlotByID = async (id: number): Promise<IStudio | Error> => {
  try {
    const { data }: { data: IStudio } = await instanceLogged.delete(
      `/slots/${id}`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const editSlotByID = async (
  id: number,
  inputValues: IRegisterWorkTimeCard
): Promise<ITrainerSlot | Error> => {
  try {
    const { data }: { data: ITrainerSlot } = await instanceLogged.patch(
      `/slots/${id}`,
      {
        beginning: inputValues.start,
        end: inputValues.end,
        studio: inputValues.studio,
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const createNewSlot = async (
  inputValues: IRegisterWorkTimeCard
): Promise<ITrainerSlot | Error> => {
  const reqData = {
    beginning: inputValues.start,
    end: inputValues.end,
    studio: inputValues.studio,
    date: inputValues.date,
  };

  try {
    const { data }: { data: ITrainerSlot } = await instanceLogged.post(
      `/slots`,
      reqData
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getSlots = async (
  studioID: number | string
): Promise<IClubSlot[] | Error> => {
  try {
    const { data }: { data: IClubSlot[] } = await instanceLogged.get(
      `/studios/${studioID}/slots`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
