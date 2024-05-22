import { wazzupInstance } from "@/shared/api/axios-config";
import axios from "axios";

export const getIframeLink = async (): Promise<string | Error> => {
  try {
    const { data }: { data: string } = await wazzupInstance.post(
      "https://api.wazzup24.com/v3/iframe/",
      {
        user: {
          id: "222555",
          name: "User Name",
        },
        scope: "card",
        filter: [
          {
            chatType: "whatsapp",
            chatId: "79998887766",
          },
        ],
        activeChat: {
          chatType: "whatsapp",
          chatId: "79998887766",
        },
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
