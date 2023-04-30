import React from 'react';
import './index.css';
import {Currencies} from 'modules/types';

interface Props {
  isDiabled?: boolean;
  value: string;
  onChange: (newCurrency: string) => void;
}

const CurrencySelect = (props: Props) => {
  const {value, isDiabled, onChange} = props;

  return (
    <div className={'selectWrapper'}>
      <select
        className={'select'}
        disabled={isDiabled}
        value={value}
        onChange={event => {
          const {value} = event.target;
          onChange(value);
        }}
      >
        {Currencies.map((currency, index) => (
          <option key={index} value={currency.value} className={'option'}>
            {currency.name} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
