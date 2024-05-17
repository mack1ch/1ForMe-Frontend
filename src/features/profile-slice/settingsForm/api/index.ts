import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { ISettingsFormUser } from "../interface";

export const getAuthUser = async (): Promise<IUser | Error> => {
  try {
    const { data }: { data: IUser } = await instanceLogged.get("/users/me/");
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
      birthday: formData.birthday,
    });

    return data;
  } catch (error) {
    return error as Error;
  }
};
