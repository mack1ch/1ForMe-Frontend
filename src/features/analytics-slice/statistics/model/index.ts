import { IAnalytics } from "@/shared/interface/analytics";

export function findMaxCostSum(analytics?: IAnalytics[]): number {
  let maxCostSum: number = 0;
  if (!analytics) return 0;
  analytics.forEach((item) => {
    if (item.costSum > maxCostSum) {
      maxCostSum = item.costSum;
    }
  });

  return maxCostSum;
}
