export interface IAnalytics {
  costSum: number;
  day?: number;
  week?: number;
  month?: number;
  year: number;
  weekDates?: IWeekDates;
  date?: string;
}

export interface IWeekDates {
  start: string;
  end: string;
}
