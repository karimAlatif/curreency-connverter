import React from 'react';
import {TopRate, QueryWithResult, Currency, Rates} from '../definitions/types';
// import {Company, CompanyData} from '../definitions/types/Converter';

type State = {
  isLoadingCurrency: boolean;
  isLoadingRates: boolean;
  queryResult?: QueryWithResult;
  toCurrency?: Currency;
  fromCurrency?: Currency;
  topRates: TopRate[];
  currentRate: number;
  IsSupportedCurrency: boolean;
  IsHomePage: boolean;
  ratesByMonth?: Rates;
  allCurrencies: Currency[];
  onChangeFromCurrency: (newCurrency: string) => void;
  onChangeToCurrency: (newCurrency: string) => void;
  onConvertCurrency: (amount: number) => void;
  onSwapCurrencies: () => void;
};

const ConverterContext = React.createContext<State>({
  isLoadingCurrency: false,
  isLoadingRates: false,
  // fromCurrency: Currencies[0],
  // toCurrency: Currencies[1],
  topRates: [],
  currentRate: 0,
  IsSupportedCurrency: false,
  IsHomePage: false,
  allCurrencies: [],
  onChangeFromCurrency: (newCurrency: string) => {},
  onChangeToCurrency: (newCurrency: string) => {},
  onConvertCurrency: (amount: number) => {},
  onSwapCurrencies: () => {},
});

export default ConverterContext;
