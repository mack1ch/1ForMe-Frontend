import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";

export const getClients = async (): Promise<IUser[] | Error> => {
  try {
    const { data }: { data: IUser[] } = await instanceLogged.get(
      `/trainings/my/clients`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
