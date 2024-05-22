import { wazzupInstance } from "@/shared/api/axios-config";
import { IURL } from "../interface";

export const getIframeLink = async (): Promise<IURL | Error> => {
  try {
    const { data }: { data: IURL } = await wazzupInstance.post(
      "https://api.wazzup24.com/v3/iframe/",
      {
        user: {
          id: "1",
          name: "admin",
        },
        scope: "global",
      }
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
