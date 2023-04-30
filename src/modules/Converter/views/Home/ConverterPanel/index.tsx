import React, {useState, useCallback, useContext} from 'react';
import ConverterContext from '../../../context/ConverterContext';
import Spinner from 'shared/components/Spinner';
import CountrySelect from './CurrencySelect';
import './index.css';

function ConverterPanel() {
  const [amount, setAmount] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(true);

  const {
    isLoadingCurrency,
    queryResult,
    toCurrency,
    fromCurrency,
    currentRate,
    IsHomePage,
    onConvertCurrency,
    onChangeFromCurrency,
    onChangeToCurrency,
    onSwapCurrencies,
  } = useContext(ConverterContext);

  const handleOnAmountChange = useCallback((event: any) => {
    event.preventDefault();
    const inputValue = event.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (Number(inputValue) === 0) {
      return;
    } else if (regex.test(inputValue)) {
      setAmount(inputValue);
      setIsValid(true);
    }
  }, []);
  const style = {'--unit': `'${fromCurrency && fromCurrency.symbol}'`} as React.CSSProperties; // Set the --unit CSS variable to the unit prop

  return (
    <div className="wrapper">
      {!IsHomePage && (
        <h3>{`${fromCurrency && fromCurrency.name} (${fromCurrency && fromCurrency.value})`}</h3>
      )}
      <div className="input-row">
        <div className="input-container mr">
          <label className="label" htmlFor="input-1">
            Amount
          </label>
          <div className="input-with-unit" style={style}>
            <input
              className={isValid ? 'input' : 'input invalid-input'}
              id="amount"
              name="amount"
              required
              value={amount}
              min={1}
              onChange={handleOnAmountChange}
            />
          </div>
          {!isValid && <a className="errMsg">Please enter valid amount.</a>}
        </div>
        <div className="input-container large">
          <label className="label" htmlFor="input-2">
            From
          </label>
          <div className="input select-wrapper">
            <CountrySelect
              isDiabled={!IsHomePage}
              value={(fromCurrency && fromCurrency.value) || ''}
              onChange={newCurrency => {
                onChangeFromCurrency(newCurrency);
              }}
            />
            <svg className="select-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M6.47 6.47a.75.75 0 0 0-1.06 1.06l5 5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0-1.06-1.06L11 10.94l-4.47-4.47z" />
            </svg>
          </div>
        </div>
        <div className="convertBut-container">
          <button
            className="rounded-button"
            onClick={() => {
              onSwapCurrencies();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 17"
              aria-hidden="true"
              className="miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="input-container large">
          <label className="label" htmlFor="input-3">
            To
          </label>
          <div className="input select-wrapper">
            <CountrySelect
              value={(toCurrency && toCurrency.value) || ''}
              onChange={newCurrency => {
                onChangeToCurrency(newCurrency);
              }}
            />
            <svg className="select-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M6.47 6.47a.75.75 0 0 0-1.06 1.06l5 5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0-1.06-1.06L11 10.94l-4.47-4.47z" />
            </svg>
          </div>
        </div>
      </div>
      {isLoadingCurrency ? (
        <Spinner />
      ) : (
        queryResult && (
          <div className="label-container">
            <label className="top-label">{`${queryResult.amount} ${queryResult.from} = `}</label>
            <h1 className="main-label">{`${queryResult.result.toFixed(3)} ${queryResult.to}`}</h1>
            <label className="sub-label">{`1 ${queryResult.from} = ${currentRate} ${queryResult.to}`}</label>
          </div>
        )
      )}
      <div className="actions">
        <div>
          {IsHomePage && (
            <a
              href={`/?From=${fromCurrency && fromCurrency.value}&To=${
                toCurrency && toCurrency.value
              }`}
            >
              <button className="detailsBut">More Details</button>
            </a>
          )}
          <button
            className="actionBut"
            disabled={!isValid}
            onClick={() => {
              if (isValid) {
                onConvertCurrency(amount);
              }
            }}
          >
            Convert
          </button>
        </div>
        {!IsHomePage && (
          <div className="hintWrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.571 11.429V6.286H6.286v1.143h1.143v4H5.714v1.142h4.572V11.43H8.57zM8 2.857a.857.857 0 100 1.714.857.857 0 000-1.714zM8 16A8 8 0 118 0a8 8 0 010 16zM8 1.143a6.857 6.857 0 100 13.714A6.857 6.857 0 008 1.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>
              You can try more currencies by getting back to <a href="/">HomePage</a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConverterPanel;
