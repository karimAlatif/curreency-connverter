import React, {lazy} from 'react';
import Routes from './routes';
import languages from './definitions/translations/en.json';
import {BrowserRouter, Router} from 'react-router-dom';
import i18n from 'i18n';
import useConverter from './actions/useConverter';
import ConverterContext from './context/ConverterContext';

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
    onChangeFromCurrency,
    onChangeToCurrency,
    onConvertCurrency,
    onSwapCurrencies,
  } = useConverter();

  return (
    <>
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
    </>
  );
}

export default Converter;
