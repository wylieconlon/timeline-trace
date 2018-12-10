import React from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export default React.memo(function Numeric(props) {
  return <div>
    <LineChart height={100} width={200} data={props.data}>
      <XAxis dataKey="step" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
    {props.data.length > 1 ? `Latest value: ${props.data[props.data.length - 1].value}` : ''}
  </div>;
});
