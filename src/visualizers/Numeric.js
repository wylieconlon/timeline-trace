import React from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export default function Numeric(props) {
  return <LineChart height={100} width={200} data={props.data}>
      <XAxis dataKey="step" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>;
}
