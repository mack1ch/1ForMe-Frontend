import { instanceLogged, wazzupInstance } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { IUnansweredMessageCounter } from "../interface";

export const getUnAnsweredMessage = async (
  trainerID: string
): Promise<IUnansweredMessageCounter | Error> => {
  try {
    const { data }: { data: IUnansweredMessageCounter } =
      await wazzupInstance.get(`/v3/unanswered/${trainerID}`);
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
