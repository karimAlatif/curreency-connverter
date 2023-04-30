import React, {useMemo, useContext} from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import ConverterContext from '../../../context/ConverterContext';
import './index.css';

function RatesByMonth() {
  const {ratesByMonth, fromCurrency, toCurrency} = useContext(ConverterContext);
  console.log('dataInArr', ratesByMonth);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dataInArr = useMemo(() => {
    if (ratesByMonth) {
      return Object.entries(ratesByMonth).map(([key, value]) => {
        const [year, month] = key.split('-');
        return {
          name: monthNames[Number(month) - 1],
          value,
        };
      });
    } else {
      return [];
    }
  }, [ratesByMonth]);
  console.log('dataInArr', dataInArr);

  return (
    <div className="chartWrapper">
      <h2>{`Chart that define historical data OF (2022)`}</h2>
      <h3>{`${fromCurrency.name} (${fromCurrency.value}) to ${toCurrency.name} (${toCurrency.value})`}</h3>
      <br></br>
      <ResponsiveContainer width={'100%'} height={350}>
        <LineChart data={dataInArr} margin={{top: 5, right: 10, bottom: 5, left: 0}}>
          <Line type="monotone" dataKey="value" stroke="#4c80b6" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RatesByMonth;

// const data = [
//   {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
//   {name: 'Page B', uv: 200, pv: 2400, amt: 2400},
//   {name: 'Page C', uv: 100, pv: 2400, amt: 2400},
//   {name: 'Page D', uv: 10, pv: 2400, amt: 2400},
// ];

// function Chart() {
//   return (

//   );
// }

// export default Chart;
