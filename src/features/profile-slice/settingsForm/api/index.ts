import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { ISettingsFormUser } from "../interface";
import { ISport } from "@/shared/interface/sport";
import { convertDateFormatToDoteFormat } from "@/shared/lib/parse/date";
import { IStudio } from "@/shared/interface/studio";

export const getAuthUser = async (): Promise<IUser | Error> => {
  try {
    const { data }: { data: IUser } = await instanceLogged.get("/users/me/");
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getAllSports = async (): Promise<ISport[] | Error> => {
  try {
    const { data }: { data: ISport[] } = await instanceLogged.get("/sports/");
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const changeAuthUserData = async (
  formData: ISettingsFormUser
): Promise<IUser | Error> => {
  try {
    const { data }: { data: IUser } = await instanceLogged.patch("/users/me/", {
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      description: formData.description,
      experience: formData.experience,
      studios: formData.studiosID,
      birthday: convertDateFormatToDoteFormat(formData.birthday || ""),
      sports: formData.sports,
    });

    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getAllStudios = async (): Promise<IStudio[] | Error> => {
  try {
    const { data }: { data: IStudio[] } = await instanceLogged.get(`/studios`);
    return data;
  } catch (error) {
    return error as Error;
  }
};
