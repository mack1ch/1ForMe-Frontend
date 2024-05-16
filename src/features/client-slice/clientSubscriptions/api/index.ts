import { instanceLogged } from "@/shared/api/axios-config";
import { ISubscription } from "@/shared/interface/subscriptions";

export const getSubscriptions = async (
  clientID: number
): Promise<ISubscription[] | Error> => {
  try {
    const { data }: { data: ISubscription[] } = await instanceLogged.get(
      `/subscriptions/my?clientId=${clientID}`
    );

    return data;
  } catch (error) {
    return error as Error;
  }
};
