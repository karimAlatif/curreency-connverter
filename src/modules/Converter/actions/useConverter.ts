import {useCallback, useState, useEffect, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';
import * as api from '../api';
import {Rates, TopRate, QueryWithResult, Currency} from '../definitions/types';
import {BehaviorSubject, from, mergeMap, reduce, groupBy, last} from 'rxjs';
import {StringParam, useQueryParam} from 'use-query-params';
import {Currencies, InitRates} from 'modules/types';

const symbols = 'USD,EUR,GBP,EGP,JPY,AUD,CAD,CHF,CNY';

const useCompanyList = () => {
  const queyFromCurrency = useQueryParam('From', StringParam);
  const toFromCurrency = useQueryParam('To', StringParam);

  const [fromCurrency, setFromCurrency] = useState<Currency>(
    Currencies.find(curr => curr.value === (queyFromCurrency && queyFromCurrency[0])) ||
      Currencies[0],
  );
  const [toCurrency, setToCurrency] = useState<Currency>(
    Currencies.find(curr => curr.value === (toFromCurrency && toFromCurrency[0])) || Currencies[1],
  );
  const [queryResult, setQueryResult] = useState<QueryWithResult>();
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [topRates, setTopRates] = useState<TopRate[]>([]);
  const [isLoadingCurrency, setIsLoadingCurrency] = useState<boolean>(false);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);
  const [ratesByMonth, setRatesByMonth] = useState<Rates>({});

  console.log('fromCurrency', fromCurrency);
  console.log('toCurrency', toCurrency);
  console.log('topRates', topRates);
  console.log('ratesByMonth ===', ratesByMonth);

  const IsHomePage = useMemo(() => {
    return !queyFromCurrency[0] && !toFromCurrency[0];
  }, []);

  const IsSupportedCurrency = useMemo(() => {
    if (IsHomePage) {
      return true;
    }
    return (
      Currencies.some(currency => currency.value === queyFromCurrency[0]) &&
      Currencies.some(currency => currency.value === toFromCurrency[0])
    );
  }, []);

  console.log('IsSupportedCurrency', IsSupportedCurrency);
  console.log('IsHomePage', IsHomePage);

  const currenciesRates = useMemo(() => new BehaviorSubject<TopRate[]>([]), []);

  const onChangeFromCurrency = useCallback((newCurrencyValue: string) => {
    const selectedCurrency = Currencies.find(curr => curr.value === newCurrencyValue);
    if (selectedCurrency) {
      setFromCurrency(selectedCurrency);
    }
  }, []);

  const onChangeToCurrency = useCallback((newCurrencyValue: string) => {
    const selectedCurrency = Currencies.find(curr => curr.value === newCurrencyValue);
    if (selectedCurrency) {
      setToCurrency(selectedCurrency);
    }
  }, []);

  const onConvertCurrency = useCallback(
    (amount: number) => {
      setIsLoadingCurrency(true);
      setIsLoadingRates(true);
      try {
        api
          .convertAmount(fromCurrency.value, toCurrency.value, amount)
          .then(res => {
            console.log('res res', res);
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
              console.log('ratesRes', ratesRes.rates);
              currenciesRates.next(
                Object.entries(ratesRes.rates).map(rate => {
                  return {
                    title: Currencies.find(curr => curr.value === rate[0])?.name || '',
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
    [currenciesRates, fromCurrency, toCurrency],
  );

  const onSwapCurrencies = useCallback(() => {
    const tmp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tmp);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const sub = currenciesRates.subscribe(setTopRates);
    if (!IsHomePage) {
      //get Month Rates
      setIsLoadingRates(true);
      // try {
      //   api
      //     .getTimeseriesLastYear(fromCurrency.value, toCurrency.value)
      //     .then(res => {
      //       if (!res.success) {
      //         alert(res.message);
      //         setIsLoadingRates(false);
      //         return;
      //       }
      //       console.log('res =====', res);
      //       const {rates} = res;
      //       // Convert the "rates" object into an array of rate objects
      //       const ratesArray = Object.entries(rates).map(([date, rate]) => ({date, ...rate}));
      //       // Group the rate objects by month
      //       const ratesByMonth$ = from(ratesArray).pipe(
      //         groupBy(rate => rate.date.substring(0, 7)), // Use the first 7 characters of the date string as the key
      //         mergeMap(group$ =>
      //           group$.pipe(
      //             last(), // Get the last rate object in the group
      //           ),
      //         ),
      //       );
      //       // Convert the ratesByMonth$ observable into an object
      //       const ratesByMonthObject = {};
      //       ratesByMonth$.subscribe(rate => {
      //         const month = rate.date.substring(0, 7); //remove el youm
      //         console.log('rate', rate);
      //         ratesByMonthObject[month] = rate[Object.keys(rate)[1]];
      //       });
      //       setRatesByMonth(ratesByMonthObject);
      //     })
      //     .catch(() => {
      //       alert('connection Error, please try again');
      //     })
      //     .finally(() => {
      //       setIsLoadingRates(false);
      //     });
      // } catch {
      //   alert('connection Error, please try again');
      // }
    }
    return () => sub.unsubscribe();
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
    onChangeFromCurrency,
    onChangeToCurrency,
    onConvertCurrency,
    onSwapCurrencies,
  };
};

export default useCompanyList;
