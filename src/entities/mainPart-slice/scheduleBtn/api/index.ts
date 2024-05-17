import { instanceLogged } from "@/shared/api/axios-config";
import { ISlotsForStudio } from "@/shared/interface/slots";

export const getSlots = async (): Promise<ISlotsForStudio[] | Error> => {
  try {
    const { data }: { data: ISlotsForStudio[] } = await instanceLogged.get(
      `/studios/slots/all`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
