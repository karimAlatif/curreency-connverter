import React, {useContext} from 'react';
import './index.css';
import ConverterContext from '../../../../context/ConverterContext';

interface Props {
  title: string;
  value: string;
  amount: string;
}
function CurrenciesCard(props: Props) {
  const {title, value: key, amount} = props;
  const {fromCurrency} = useContext(ConverterContext);

  return (
    <div className="card">
      <div className="content">
        <h2 className="card-title">{title}</h2>
        <div className="card-content">
          <p>{`${amount} (${key})`}</p>
        </div>
      </div>
      <div className="hoveringWrapper">
        <a href={`/?From=${fromCurrency.value}&To=${key}`}>
          <button className="card-btn card-btn-middle">Use</button>
        </a>
      </div>
    </div>
  );
}

export default CurrenciesCard;
