import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Defina a interface para as props do gráfico
interface ChartProps {
  data: { name: string; receitas: number; despesas: number }[];
}

// O componente agora recebe 'data' como prop
function MeuGrafico({ data }: ChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data} // <-- Usamos a prop 'data' aqui
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="receitas"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            name="Receitas"
          />
          <Line
            type="monotone"
            dataKey="despesas"
            stroke="#ff7300"
            name="Despesas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MeuGrafico;