import React from 'react';
import Routes from './routes';
import languages from './definitions/translations/en.json';
import {BrowserRouter} from 'react-router-dom';
import i18n from 'i18n';
import useConverter from './actions/useConverter';
import ConverterContext from './context/ConverterContext';
import SpinningComponent from 'shared/components/SpinningComponent';

i18n.addResourceBundle('en', 'translation', languages, true);

function Converter() {
  const {
    isLoadingCurrency,
    isLoadingRates,
    queryResult,
    fromCurrency,
    toCurrency,
    topRates,
    currentRate,
    IsSupportedCurrency,
    IsHomePage,
    ratesByMonth,
    allCurrencies,
    isCurrenciesloaded,
    onChangeFromCurrency,
    onChangeToCurrency,
    onConvertCurrency,
    onSwapCurrencies,
  } = useConverter();

  return (
    <>
      {isCurrenciesloaded ? (
        <div style={{display: 'flex', height: '100vh', justifyContent: 'center'}}>
          <SpinningComponent />
        </div>
      ) : (
        <ConverterContext.Provider
          value={{
            isLoadingCurrency,
            isLoadingRates,
            queryResult,
            fromCurrency,
            toCurrency,
            topRates,
            currentRate,
            IsSupportedCurrency,
            IsHomePage,
            ratesByMonth,
            allCurrencies,
            onChangeFromCurrency,
            onChangeToCurrency,
            onConvertCurrency,
            onSwapCurrencies,
          }}
        >
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ConverterContext.Provider>
      )}
    </>
  );
}

export default Converter;
