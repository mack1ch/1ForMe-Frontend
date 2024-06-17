import { wazzupInstance } from "@/shared/api/axios-config";
import { IURL } from "../interface";

export const getIframeLink = async (
  trainerID?: number,
  trainerName?: string
): Promise<IURL | Error> => {
  try {
    const { data }: { data: IURL } = await wazzupInstance.post("/v3/iframe/", {
      user: {
        id: trainerID?.toString(),
        name: trainerName,
      },
      scope: "global",
    });
    return data;
  } catch (error) {
    return error as Error;
  }
};
