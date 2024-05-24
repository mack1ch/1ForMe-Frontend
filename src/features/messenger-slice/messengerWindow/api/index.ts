import { wazzupInstance } from "@/shared/api/axios-config";
import { IURL } from "../interface";
import { IChatTypes } from "@/shared/interface/chats";

export const getIframeLink = async (
  chatType: IChatTypes,
  phone: string,
  userName?: string
): Promise<IURL | Error> => {
  try {
    const { data }: { data: IURL } = await wazzupInstance.post(
      "https://api.wazzup24.com/v3/iframe/",
      {
        user: {
          id: "1",
          name: "admin",
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
            username: chatType.name === "Telegram" ? userName : undefined,
          },
        ],
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
