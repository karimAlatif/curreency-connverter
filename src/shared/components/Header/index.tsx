import React, {useMemo} from 'react';
import {StringParam, useQueryParam} from 'use-query-params';
import './index.css';

export default function Header() {
  const queyFromCurrency = useQueryParam('From', StringParam);
  const toFromCurrency = useQueryParam('To', StringParam);

  const IsEURToUSD = useMemo(() => {
    return (
      queyFromCurrency &&
      queyFromCurrency[0] === 'EUR' &&
      toFromCurrency &&
      toFromCurrency[0] === 'USD'
    );
  }, []);

  const IsEURToGBP = useMemo(() => {
    return (
      queyFromCurrency &&
      queyFromCurrency[0] === 'EUR' &&
      toFromCurrency &&
      toFromCurrency[0] === 'GBP'
    );
  }, []);

  return (
    <header className="header">
      <div className="Mlogo">
        <a href="/">
          <img src="/money-exchange.png" alt="Logo" />
        </a>
      </div>

      <nav>
        <div className="button-group IsEURToUSD ?  ">
          <a href="/?From=EUR&To=USD">
            <button className={` ${IsEURToUSD ? 'active' : ''}`}>EUR-USD Details</button>
          </a>
          <a href="/?From=EUR&To=GBP">
            <button className={` ${IsEURToGBP ? 'active' : ''}`}>EUR-GBP Details</button>
          </a>
        </div>
      </nav>
      {/*       
      <nav className="nav-links">
        <a href="/eur-usd">EUR-USD Details</a>
        <a href="/eur-gbp">EUR-GBP Details</a>
      </nav> */}
    </header>
  );
}
