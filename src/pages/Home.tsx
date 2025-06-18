// src/pages/Home.tsx
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import MeuGrafico from "../components/MeuGrafico"; // Importe o gráfico
import TransactionTable from "../components/TransactionTable"; // Importe a tabela
import '../App.css'; // Seu CSS global para estilos da barra de rolagem e outros

// Tipo para as transações (pode estar em um arquivo separado se desejar)
interface Transaction {
  id: number;
  type: 'Receita' | 'Despesa';
  value: number;
  date: string;
  description: string;
}

// Dados de transações simulados para o dashboard
const dummyTransactions: Transaction[] = [
  { id: 1, type: 'Receita', value: 1200.50, date: '2025-01-10', description: 'Salário de Janeiro' },
  { id: 2, type: 'Despesa', value: 350.75, date: '2025-01-15', description: 'Aluguel' },
  { id: 3, type: 'Receita', value: 200.00, date: '2025-02-01', description: 'Venda de Item' },
  { id: 4, type: 'Despesa', value: 120.00, date: '2025-02-05', description: 'Supermercado' },
  { id: 5, type: 'Receita', value: 1500.00, date: '2025-03-10', description: 'Salário de Março' },
  { id: 6, type: 'Despesa', value: 400.00, date: '2025-03-20', description: 'Transporte' },
  { id: 7, type: 'Receita', value: 80.00, date: '2025-04-03', description: 'Reembolso' },
  { id: 8, type: 'Despesa', value: 50.00, date: '2025-04-10', description: 'Café' },
  { id: 9, type: 'Receita', value: 900.00, date: '2025-05-01', description: 'Freelance' },
  { id: 10, type: 'Despesa', value: 200.00, date: '2025-05-15', description: 'Lazer' },
  { id: 11, type: 'Receita', value: 1100.00, date: '2025-06-10', description: 'Salário de Junho' },
  { id: 12, type: 'Despesa', value: 300.00, date: '2025-06-18', description: 'Conta de Luz' },
  { id: 13, type: 'Receita', value: 50.00, date: '2025-06-19', description: 'Pequena Venda' },
  { id: 14, type: 'Despesa', value: 15.00, date: '2025-06-20', description: 'Aplicativo' },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        window.location.href = "/login";
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  // --- Lógica de Dados para o Dashboard ---

  // 1. Calcular Saldo Total
  const currentBalance = dummyTransactions.reduce((total, transaction) => {
    return transaction.type === 'Receita' ? total + transaction.value : total - transaction.value;
  }, 0);

  // 2. Preparar Dados para o Gráfico de Receitas e Despesas por Mês
  const chartDataMap = new Map<string, { receitas: number, despesas: number }>();
  dummyTransactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthName = date.toLocaleString('pt-BR', { month: 'short' });

    if (!chartDataMap.has(monthName)) {
      chartDataMap.set(monthName, { receitas: 0, despesas: 0 });
    }
    const monthData = chartDataMap.get(monthName)!;
    if (transaction.type === 'Receita') {
      monthData.receitas += transaction.value;
    } else {
      monthData.despesas += transaction.value;
    }
  });

  // Ordenar os meses para o gráfico (importante para gráficos de linha)
  const monthOrder = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const chartData = Array.from(chartDataMap)
    .map(([name, values]) => ({ name, ...values }))
    .sort((a, b) => {
      const monthA = a.name.toLowerCase();
      const monthB = b.name.toLowerCase();
      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

  // 3. Obter as Últimas Transações (para a tabela)
  const latestTransactions = dummyTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Ordenar por data (mais recente primeiro)
    .slice(0, 5); // Pegar as 5 últimas

  // --- Estrutura JSX do Dashboard ---
  return (
    <>
      <HeaderProfile />
      <div className="d-flex flex-column align-items-center vw-100 p-4" style={{ minHeight: "calc(100vh - 80px)", backgroundColor: '#212529' }}> {/* Fundo escuro para a página */}
        <h1 className="text-white mb-4 fw-light">Visão Geral Financeira</h1>

        {/* Linha 1: Saldo Atual e Cards de Resumo */}
        <div className="d-flex justify-content-between w-100 mb-4 flex-wrap"> {/* flex-wrap para responsividade */}
          {/* Card de Saldo Atual */}
          <div className="bg-dark rounded p-4 shadow-sm text-center flex-grow-1 mx-2 mb-3" style={{ minWidth: '280px' }}>
            <h5 className="text-white-50 mb-2">Saldo Atual</h5>
            <p className={`fw-bold fs-2 m-0 ${currentBalance >= 0 ? 'text-success' : 'text-danger'}`}>
              R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Card de Receita Total (exemplo) */}
          <div className="bg-dark rounded p-4 shadow-sm text-center flex-grow-1 mx-2 mb-3" style={{ minWidth: '280px' }}>
            <h5 className="text-white-50 mb-2">Total de Receitas</h5>
            <p className="fw-bold fs-2 m-0 text-info">
              R$ {dummyTransactions.filter(t => t.type === 'Receita').reduce((sum, t) => sum + t.value, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Card de Despesa Total (exemplo) */}
          <div className="bg-dark rounded p-4 shadow-sm text-center flex-grow-1 mx-2 mb-3" style={{ minWidth: '280px' }}>
            <h5 className="text-white-50 mb-2">Total de Despesas</h5>
            <p className="fw-bold fs-2 m-0 text-warning">
              R$ {dummyTransactions.filter(t => t.type === 'Despesa').reduce((sum, t) => sum + t.value, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Linha 2: Gráfico de Receitas e Despesas */}
        <div className="bg-dark rounded p-3 mb-4 w-100 shadow-sm" style={{ maxWidth: '900px' }}> {/* Max-width para centrar */}
          <MeuGrafico data={chartData} />
        </div>

        {/* Linha 3: Últimas Transações */}
        <div className="w-100" style={{ maxWidth: '900px' }}> {/* Max-width para centrar */}
          <TransactionTable transactions={latestTransactions} title="Últimas Transações" />
        </div>

      </div>
    </>
  );
}