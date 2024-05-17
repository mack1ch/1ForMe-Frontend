import { instanceLogged } from "@/shared/api/axios-config";
import { IUser } from "@/shared/interface/user";
import { IClient } from "../interface";
import { parseNameToNameAndSurname } from "@/shared/lib/parse/user";

export const createClient = async (client: IClient): Promise<IUser | Error> => {
  try {
    const reqFields = {
      name: parseNameToNameAndSurname(client.name)[0],
      phone: client.phone,
      surname: parseNameToNameAndSurname(client.name)[1],
      role: "client",
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
