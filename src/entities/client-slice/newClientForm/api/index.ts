import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { IClient } from "../interface";
import { parseNameToNameAndSurname } from "@/shared/lib/parse/user";
import { IChatTypes } from "@/shared/interface/chats";

export const createClient = async (client: IClient): Promise<IUser | Error> => {
  try {
    const reqFields = {
      name: parseNameToNameAndSurname(client.name)[0],
      phone: client.phone,
      surname: parseNameToNameAndSurname(client.name)[1],
      role: "client",
      chatType: client.messenger,
      userNameInMessenger: client.userNameInMessenger,
    };
    const { data }: { data: IUser } = await instanceLogged.post(
      "/auth/register/byTrainer/",
      reqFields
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
