import { instanceLogged } from "@/shared/api/axios-config";
import { ISlotsForStudio } from "@/shared/interface/slots";

export const getSlots = async (): Promise<ISlotsForStudio[] | Error> => {
  try {
    const { data }: { data: ISlotsForStudio[] } = await instanceLogged.get(
      `/slots/my/available`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
