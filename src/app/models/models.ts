export interface IRates {
  table: string;
  no: string;
  effectiveDate: string;
  rates: IRate[];
}

export interface IRate {
  currency: string;
  code: string;
  mid: number;
}

export interface IMessage {
  severity: string;
  summary: string;
  detail: string;
}
