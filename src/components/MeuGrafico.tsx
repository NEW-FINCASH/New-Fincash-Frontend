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

// Seus novos dados com receitas e despesas
const data = [
  { name: 'Jan', receitas: 6000, despesas: 3000 },
  { name: 'Fev', receitas: 5000, despesas: 4000 },
  { name: 'Mar', receitas: 7000, despesas: 3500 },
  { name: 'Abr', receitas: 6500, despesas: 4500 },
  { name: 'Mai', receitas: 8000, despesas: 5000 },
  { name: 'Jun', receitas: 7500, despesas: 4200 },
  { name: 'Jul', receitas: 9000, despesas: 6000 },
];

function MeuGrafico() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
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
          {/* Linha para Receitas */}
          <Line
            type="monotone"
            dataKey="receitas" // Chave para os dados de receita
            stroke="#82ca9d"  // Cor verde para receita
            activeDot={{ r: 8 }}
            name="Receitas" // Nome que aparecerá na Tooltip e Legenda
          />
          {/* Linha para Despesas */}
          <Line
            type="monotone"
            dataKey="despesas" // Chave para os dados de despesa
            stroke="#ff7300"  // Cor laranja/vermelha para despesa
            name="Despesas" // Nome que aparecerá na Tooltip e Legenda
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MeuGrafico;