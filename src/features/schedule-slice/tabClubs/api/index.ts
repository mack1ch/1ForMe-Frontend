import { instanceLogged } from "@/shared/api/axios-config";
import { ISlotsForStudio } from "@/shared/interface/slots";
import { IClub, IStudio } from "@/shared/interface/studio";

export const getClubs = async (): Promise<IClub[] | Error> => {
  try {
    const { data }: { data: IClub[] } = await instanceLogged.get("/clubs/");
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getStudios = async (): Promise<IStudio[] | Error> => {
  try {
    const { data }: { data: IStudio[] } = await instanceLogged.get("/studios/");
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getSlots = async (
  studioID: number
): Promise<ISlotsForStudio[] | Error> => {
  try {
    const { data }: { data: ISlotsForStudio[] } = await instanceLogged.get(
      `studios/${studioID}/clubs/slots`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
