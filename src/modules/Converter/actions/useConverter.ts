import {useCallback, useState, useEffect, useMemo} from 'react';
import * as api from '../api';
import {Rates, TopRate, QueryWithResult, Currency} from '../definitions/types';
import {BehaviorSubject, from, mergeMap, reduce, groupBy, last} from 'rxjs';
import {StringParam, useQueryParam} from 'use-query-params';
import {CurrenciesSymbols, InitRates} from 'modules/types';

const symbols = 'USD,EUR,GBP,EGP,JPY,AUD,CAD,CHF,CNY';

const useCompanyList = () => {
  const queryFromCurrency = useQueryParam('From', StringParam);
  const queryToCurrency = useQueryParam('To', StringParam);

  const [allCurrencies, setAllCurrencies] = useState<Currency[]>([]);

  const [fromCurrency, setFromCurrency] = useState<Currency>();
  const [toCurrency, setToCurrency] = useState<Currency>();
  const [queryResult, setQueryResult] = useState<QueryWithResult>();
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [topRates, setTopRates] = useState<TopRate[]>([]);
  const [isLoadingCurrency, setIsLoadingCurrency] = useState<boolean>(false);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);
  const [isCurrenciesloaded, setIsCurrenciesloaded] = useState<boolean>(true);
  const [ratesByMonth, setRatesByMonth] = useState<Rates>({});

  const IsHomePage = useMemo(() => {
    return !queryFromCurrency[0] && !queryToCurrency[0];
  }, []);

  const IsSupportedCurrency = useMemo(() => {
    if (IsHomePage) {
      return true;
    }
    return (
      allCurrencies.some(currency => currency.value === queryFromCurrency[0]?.toUpperCase()) &&
      allCurrencies.some(currency => currency.value === queryToCurrency[0]?.toUpperCase())
    );
  }, [allCurrencies]);

  const currenciesRates$ = useMemo(() => new BehaviorSubject<TopRate[]>([]), []);
  const allCurrencies$ = useMemo(() => new BehaviorSubject<Currency[]>([]), []);

  const onChangeFromCurrency = useCallback(
    (newCurrencyValue: string) => {
      const selectedCurrency = allCurrencies.find(curr => curr.value === newCurrencyValue);
      if (selectedCurrency) {
        setFromCurrency(selectedCurrency);
      }
    },
    [allCurrencies],
  );

  const onChangeToCurrency = useCallback(
    (newCurrencyValue: string) => {
      const selectedCurrency = allCurrencies.find(curr => curr.value === newCurrencyValue);
      if (selectedCurrency) {
        setToCurrency(selectedCurrency);
      }
    },
    [allCurrencies],
  );

  const onConvertCurrency = useCallback(
    (amount: number) => {
      if (!fromCurrency || !toCurrency) {
        return;
      }
      setIsLoadingCurrency(true);
      setIsLoadingRates(true);
      try {
        api
          .convertAmount(fromCurrency.value, toCurrency && toCurrency.value, amount)
          .then(res => {
            if (!res.success) {
              //err
              alert(res.message);
              setIsLoadingRates(false);
              setIsLoadingCurrency(false);
              return;
            }

            setQueryResult({...res.query, result: res.result});
            setCurrentRate(res.info.rate);
            setIsLoadingCurrency(false);
            api.getRates(fromCurrency.value, symbols).then(ratesRes => {
              currenciesRates$.next(
                Object.entries(ratesRes.rates).map(rate => {
                  return {
                    title: CurrenciesSymbols[rate[0]].name || '',
                    key: rate[0],
                    value: rate[1] * amount,
                  };
                }),
              );
              setIsLoadingRates(false);
            });
          })
          .catch(err => {
            alert('connection Error, please try again');
            setIsLoadingRates(false);
            setIsLoadingCurrency(false);
          });
      } catch {
        alert('connection Error, please try again');
        setIsLoadingRates(false);
        setIsLoadingCurrency(false);
      }
    },
    [currenciesRates$, fromCurrency, toCurrency],
  );

  const onSwapCurrencies = useCallback(() => {
    const tmp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tmp);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const currenciesRatesSub = currenciesRates$.subscribe(setTopRates);
    const setAllCurrenciesSub = allCurrencies$.subscribe(setAllCurrencies);

    //get all Currencies
    try {
      api
        .getCurrencies()
        .then(res => {
          if (!res.success) {
            //err
            alert(res.message);
            return;
          }
          const {symbols} = res;
          const newCurrencies: Currency[] = Object.entries(symbols).map(([key, value]) => {
            return {
              name: value,
              value: key,
              symbol: (CurrenciesSymbols[key] && CurrenciesSymbols[key].symbol) || '£',
            };
          });
          allCurrencies$.next(newCurrencies);

          const selectedFromCurrency =
            newCurrencies.find(curr => curr.value === queryFromCurrency[0]?.toUpperCase()) ||
            newCurrencies[0];
          const selectedToCurrency =
            newCurrencies.find(curr => curr.value === queryToCurrency[0]?.toUpperCase()) ||
            newCurrencies[46];
          setFromCurrency(selectedFromCurrency);
          setToCurrency(selectedToCurrency);
          setIsCurrenciesloaded(false);

          if (!IsHomePage) {
            //get Month Rates
            setIsLoadingRates(true);
            try {
              api
                .getTimeseriesLastYear(selectedFromCurrency.value, selectedToCurrency.value)
                .then(res => {
                  if (!res.success) {
                    alert(res.message);
                    setIsLoadingRates(false);
                    return;
                  }
                  const {rates} = res;
                  // fetch rates object into an array of rate objects
                  const ratesArray = Object.entries(rates).map(([date, rate]) => ({date, ...rate}));
                  // group rate objects by month
                  const ratesByMonth$ = from(ratesArray).pipe(
                    groupBy(rate => rate.date.substring(0, 7)), // 7 characters of key
                    mergeMap(group$ =>
                      group$.pipe(
                        last(), // last rate object in the group
                      ),
                    ),
                  );
                  const ratesByMonthObject = {};
                  ratesByMonth$.subscribe(rate => {
                    const month = rate.date.substring(0, 7); //remove el youm
                    ratesByMonthObject[month] = rate[Object.keys(rate)[1]];
                  });
                  setRatesByMonth(ratesByMonthObject);
                })
                .catch(() => {
                  alert('connection Error, please try again');
                })
                .finally(() => {
                  setIsLoadingRates(false);
                });
            } catch {
              alert('connection Error, please try again');
            }
          }
        })
        .catch(() => {
          alert('connection Error !, please realod the page');
        });
    } catch {
      alert('connection Error !, please realod the page');
      setIsCurrenciesloaded(false);
    }

    return () => {
      currenciesRatesSub.unsubscribe();
      setAllCurrenciesSub.unsubscribe();
    };
  }, []);

  return {
    isLoadingCurrency,
    isLoadingRates,
    queryResult,
    fromCurrency,
    toCurrency,
    currentRate,
    topRates,
    IsSupportedCurrency,
    IsHomePage,
    ratesByMonth,
    allCurrencies,
    isCurrenciesloaded,
    onChangeFromCurrency,
    onChangeToCurrency,
    onConvertCurrency,
    onSwapCurrencies,
  };
};

export default useCompanyList;
