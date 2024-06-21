import { wazzupInstance } from "@/shared/api/axios-config";
import { IURL } from "../interface";
import { IChatTypes } from "@/shared/interface/chats";
import { formatUserName } from "../model";
import { IUser } from "@/shared/interface/user";

export const getIframeLink = async (
  chatType: IChatTypes,
  phone: string,
  userName?: string,
  user?: IUser
): Promise<IURL | Error> => {
  try {
    const username =
      chatType.name === "Telegram"
        ? formatUserName(userName || "", chatType)
        : undefined;
    const { data }: { data: IURL } = await wazzupInstance.post(
      "https://api.wazzup24.com/v3/iframe/",
      {
        user: {
          id: user?.id.toString(),
          name: user?.name.toString(),
        },
        scope: "card",
        filter: [
          {
            chatType: chatType.name.toLowerCase(),
            chatId:
              chatType.name === "Telegram"
                ? undefined
                : chatType.name === "Instagram"
                ? userName
                : phone,
            username,
          },
        ],
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
