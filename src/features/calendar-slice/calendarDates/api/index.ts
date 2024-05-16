import { instanceLogged } from "@/shared/api/axios-config";
import { IDoteCount } from "@/shared/interface/training";

export const getDotes = async (): Promise<IDoteCount[] | Error> => {
  try {
    const { data }: { data: IDoteCount[] } = await instanceLogged.get(
      `/trainings/my/count`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
