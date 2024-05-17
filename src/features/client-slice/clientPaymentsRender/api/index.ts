import { instanceLogged } from "@/shared/api/axios-config";
import { ITraining } from "@/shared/interface/training";
import { ITransaction } from "@/shared/interface/transaction";

export const getUserTransactionById = async (
  clientID: number
): Promise<ITransaction[] | Error> => {
  try {
    const { data }: { data: ITransaction[] } = await instanceLogged.get(
      `/transactions?clientId=${clientID}`
    );

    return data;
  } catch (error) {
    return error as Error;
  }
};
