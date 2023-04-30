import React, {useContext} from 'react';
import './index.css';
import ConverterContext from '../../../../context/ConverterContext';

interface Props {
  isDiabled?: boolean;
  value: string;
  onChange: (newCurrency: string) => void;
}

const CurrencySelect = (props: Props) => {
  const {value, isDiabled, onChange} = props;

  const {allCurrencies} = useContext(ConverterContext);

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
        {allCurrencies.map((currency, index) => (
          <option key={index} value={currency.value} className={'option'}>
            {currency.name} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
