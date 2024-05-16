import { instanceLogged } from "@/shared/api/axios-config";
import { ITrainerSlot } from "@/shared/interface/slots";
import { IUser } from "@/shared/interface/user";

export const getTrainerSlots = async (): Promise<ITrainerSlot[] | Error> => {
  try {
    const { data }: { data: ITrainerSlot[] } = await instanceLogged.get(
      `/slots/my`
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

export const changeAuthUser = async (
  isActive: boolean
): Promise<IUser | Error> => {
  try {
    const { data }: { data: IUser } = await instanceLogged.patch("/users/me/", {
      isActive: isActive,
    });
    return data;
  } catch (error) {
    return error as Error;
  }
};
