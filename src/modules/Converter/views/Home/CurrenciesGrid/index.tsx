import React, {useContext} from 'react';
import ConverterContext from '../../../context/ConverterContext';
import CurrenciesCard from './CurrenciesCard';
import './index.css';

function CurrenciesGrid() {
  const {topRates} = useContext(ConverterContext);

  return (
    <>
      <h2>Other Currencies you might be interesting in</h2>
      <div className="grid">
        {topRates.map((rate, index) => {
          return (
            <CurrenciesCard
              key={index}
              title={rate.title}
              value={rate.key}
              amount={rate.value.toFixed(2).toString()}
            />
          );
        })}
      </div>
    </>
  );
}

export default CurrenciesGrid;
