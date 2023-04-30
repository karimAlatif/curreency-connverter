import React, {Suspense} from 'react';
import Converter from './modules/Converter';
import {QueryParamProvider} from 'use-query-params';
import './App.css';
import './i18n';

function App() {
  return (
    <Suspense fallback="...">
      <QueryParamProvider>
        <Converter />
      </QueryParamProvider>
    </Suspense>
  );
}

export default App;
