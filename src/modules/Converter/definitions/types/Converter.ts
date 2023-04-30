export interface ConvertResponse {
  date: string;
  info: Info;
  query: Query;
  result: number;
  success: boolean;
  message: string;
}

interface Info {
  rate: number;
  timestamp: number;
}

export interface QueryWithResult extends Query {
  result: number;
}
interface Query {
  amount: number;
  from: string;
  to: string;
}

export interface RatesResponse {
  base: string;
  date: string;
  rates: Rates;
  success: boolean;
  timestamp: number;
}

export interface Rates {
  [key: string]: number;
}

export interface TopRate {
  title: string;
  key: string;
  value: number;
}

export interface Currency {
  name: string;
  value: string; //CODE
  symbol: string;
}

export interface MonthRateResponse {
  base: string;
  end_date: string;
  start_date: string;
  success: boolean;
  timeseries: boolean;
  rates: {
    [key: string]: {
      [key: string]: number;
    };
  };
  message: string;
}
// interface Egypt {
//   country: typeof Countries.Egypt;
//   city: keyof typeof EgyptCites;
// }
export interface CurrenciesResponse {
  success: boolean;
  symbols: {
    [key: string]: string;
  };
  message: string;
}
