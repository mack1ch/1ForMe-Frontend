import { instanceLogged } from "@/shared/api/axios-config";
import { IMainPartWorkTime } from "@/shared/interface/slots";

export const getSlots = async (): Promise<IMainPartWorkTime[] | Error> => {
  try {
    const { data }: { data: IMainPartWorkTime[] } = await instanceLogged.get(
      `/slots/my/available`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
