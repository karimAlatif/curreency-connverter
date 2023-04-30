import React, {useState, useCallback, useContext, useMemo} from 'react';
import clsx from 'clsx';
import {Box, Button, Typography, Snackbar} from '@material-ui/core';
import {useHistory, Link} from 'react-router-dom';
import {Apartment, Delete} from '@material-ui/icons';
import ConverterContext from '../../context/ConverterContext';
import DeleteDialog from './deleteDialog';
import {useTranslation} from 'react-i18next';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {injectParamsIntoUrl} from 'shared/utils';
// import {Company} from '../../definitions/types/Converter';
import SpinningComponent from '../../../../shared/components/SpinningComponent';

import ConverterPanel from './ConverterPanel';
import BackGround from './BackGround';
import CurrenciesGrid from './CurrenciesGrid';
import Chart from './Chart';

import './index.css';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CompaniesList() {
  const {t} = useTranslation();
  const [selectedCompaniesIds, setSelectedCompaniesIds] = useState<string[]>([]);
  const [highlightedCompanyId, sethHighlightedCompanyId] = useState<string>('');
  const [isAlertDialog, setIsAlertDialog] = useState(false);
  const history = useHistory();
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
                  <h3>{`Convert ${fromCurrency.name} (${fromCurrency.value}) to ${toCurrency.name} (${toCurrency.value})`}</h3>
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
