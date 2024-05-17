import { instanceLogged } from "@/shared/api/axios-config";
import { IComment } from "@/shared/interface/comment";
import { IUser } from "@/shared/interface/user";
import { IClientEditForm } from "../inteface";
import { parseNameToNameAndSurname } from "@/shared/lib/parse/user";

export const getClientByID = async (
  clientID: number
): Promise<IUser | Error> => {
  try {
    const { data }: { data: IUser } = await instanceLogged.get(
      `/users/byId/${clientID}`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getClientCommentByID = async (
  clientID: number
): Promise<IComment | Error> => {
  try {
    const { data }: { data: IComment } = await instanceLogged.get(
      `/users/${clientID}/comments/`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const changeClientCommentByID = async (
  clientID: number,
  comment: string
): Promise<IComment | Error> => {
  try {
    const { data }: { data: IComment } = await instanceLogged.post(
      `/users/${clientID}/comments/`,
      {
        text: comment,
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const changedClientData = async (
  clientData: IClientEditForm,
  clientID: number
): Promise<IClientEditForm | Error> => {
  const nameAndSurname = parseNameToNameAndSurname(clientData.name || "");
  try {
    const { data }: { data: IUser } = await instanceLogged.patch(
      `/users/byId/${clientID}`,
      {
        name: nameAndSurname[0],
        surname: nameAndSurname[1],
        phone: clientData.phone,
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
