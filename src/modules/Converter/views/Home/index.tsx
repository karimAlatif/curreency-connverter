import React, {useState, useCallback, useContext, useMemo} from 'react';
import ConverterContext from '../../context/ConverterContext';
import {useTranslation} from 'react-i18next';
import SpinningComponent from '../../../../shared/components/SpinningComponent';
import ConverterPanel from './ConverterPanel';
import BackGround from './BackGround';
import CurrenciesGrid from './CurrenciesGrid';
import Chart from './Chart';

import './index.css';

function CompaniesList() {
  const {t} = useTranslation();
  const {
    isLoadingRates,
    toCurrency,
    fromCurrency,
    topRates,
    currentRate,
    IsSupportedCurrency,
    IsHomePage,
  } = useContext(ConverterContext);

  return (
    <div className="App">
      <div className="mainWrapper">
        <div className="topPart">
          <BackGround />
          <div className="contentArea">
            {IsSupportedCurrency ? (
              <>
                <div className="heroTop">
                  <h1>Currency Converter</h1>
                  {fromCurrency && toCurrency && (
                    <h3>{`Convert ${fromCurrency.name} (${fromCurrency.value}) to ${toCurrency.name} (${toCurrency.value})`}</h3>
                  )}
                </div>
                <div className="heroContainer">
                  <div className="heroWrapper">
                    <ConverterPanel />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="heroTop">
                  <h1>Currency Converter</h1>
                  <h3>
                    {`Ops, we seems that we don't support this currency `}
                    <a href="./">Home Page</a>
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>
        {IsSupportedCurrency && (
          <div>
            {isLoadingRates ? <SpinningComponent /> : IsHomePage ? <CurrenciesGrid /> : <Chart />}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompaniesList;
