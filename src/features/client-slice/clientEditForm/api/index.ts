import { instanceLogged } from "@/shared/api/axios-config";
import { IComment } from "@/shared/interface/comment";
import { IUser } from "@/shared/interface/user";
import { IClientEditForm } from "../inteface";
import { parseNameToNameAndSurname } from "@/shared/lib/parse/user";
import { IChatTypes } from "@/shared/interface/chats";

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
        chatType: clientData.messenger,
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};

export const getChatTypes = async (): Promise<IChatTypes[] | Error> => {
  try {
    const { data }: { data: IChatTypes[] } = await instanceLogged.get(
      "/chat-types/"
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
