import { instanceLogged } from "@/shared/api/axios-config";

import { IApiTransaction } from "@/shared/interface/transaction";

export const getTransactions = async (): Promise<IApiTransaction[] | Error> => {
  try {
    const { data }: { data: IApiTransaction[] } = await instanceLogged.get(
      `/transactions/analytics/entities`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
