import { instanceLogged } from "@/shared/api/axios-config";
import { ITariff } from "@/shared/interface/tariff";
import { IUser } from "@/shared/interface/user";

export const getUserTariffs = async (): Promise<ITariff[] | Error> => {
  try {
    const { data }: { data: ITariff[] } = await instanceLogged.get(
      "/users/trainers/my/tariffs"
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getAuthUser = async (): Promise<IUser | Error> => {
  try {
    const { data }: { data: IUser } = await instanceLogged.get("/users/me/");
    return data;
  } catch (error) {
    return error as Error;
  }
};
