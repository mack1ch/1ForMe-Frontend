import { instanceLogged } from "@/shared/api/axios-config";
import { IAnalytics } from "@/shared/interface/analytics";

export const getAnalyticsEntitiesByStartAndEndDate = async (
  period: "month" | "day" | "week"
): Promise<IAnalytics[] | Error> => {
  try {
    const { data }: { data: IAnalytics[] } = await instanceLogged.get(
      `/transactions/analytics?period=${period}`
    );
    return data;
  } catch (error) {
    return error as Error;
  }
};
