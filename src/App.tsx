import React from 'react';
import Converter from './modules/Converter';
import {QueryParamProvider} from 'use-query-params';
import {Route} from 'react-router-dom';
import './App.css';
import './i18n';

function App() {
  return (
    <>
      <QueryParamProvider>
        <Converter />
      </QueryParamProvider>
    </>
  );
}

export default App;
