import { instanceLogged } from "@/shared/api/axios-config";
import { ITraining } from "@/shared/interface/training";
import { IUser } from "@/shared/interface/user";

export const getTrainersByDate = async (
  date: string
): Promise<ITraining[] | Error> => {
  try {
    const { data }: { data: ITraining[] } = await instanceLogged.get(
      `/trainings?date=${date}`
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
