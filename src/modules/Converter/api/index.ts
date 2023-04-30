import {
  ConvertResponse,
  CurrenciesResponse,
  MonthRateResponse,
  RatesResponse,
} from '../definitions/types';

const myHeaders = new Headers();
myHeaders.append('apikey', 'TwsKk3h1tmbd7EV7yuL7fkZz6z0d9ZsR');

const API_URL = 'https://api.apilayer.com';

export const convertAmount = (
  from: string,
  to: string,
  amount: number,
): Promise<ConvertResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  return fetch(
    `${API_URL}/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
    requestOptions,
  ).then(response => response.json());
};

export const getRates = (base: string, symbols: string): Promise<RatesResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  return fetch(`${API_URL}/fixer/latest?base=${base}&symbols=${symbols}`, requestOptions).then(
    response => response.json(),
  );
};

export const getTimeseriesLastYear = (
  base: string,
  symbols: string,
): Promise<MonthRateResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  return fetch(
    `${API_URL}/fixer/timeseries?start_date=2022-01-01&end_date=2023-01-01&base=${base}&symbols=${symbols}`,
    requestOptions,
  ).then(response => response.json());
};

export const getCurrencies = (): Promise<CurrenciesResponse> => {
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  return fetch(`${API_URL}/fixer/symbols`, requestOptions).then(response => response.json());
};
