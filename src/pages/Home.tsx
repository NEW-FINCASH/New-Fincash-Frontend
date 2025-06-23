// src/pages/Home.tsx
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import MeuGrafico from "../components/MeuGrafico"; // Importe o gráfico
import TransactionTable from "../components/TransactionTable"; // Importe a tabela
import '../App.css'; // Seu CSS global para estilos da barra de rolagem e outros

// Tipo para as transações
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

// Função para formatar valores como moeda (BRL)
const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

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

  // 1. Calcular Totais
  const totalReceitas = dummyTransactions
    .filter(t => t.type === 'Receita')
    .reduce((sum, t) => sum + t.value, 0);

  const totalDespesas = dummyTransactions
    .filter(t => t.type === 'Despesa')
    .reduce((sum, t) => sum + t.value, 0);
  
  const currentBalance = totalReceitas - totalDespesas;

  // 2. Preparar Dados para o Gráfico de Receitas e Despesas por Mês
  const chartDataMap = new Map<string, { receitas: number, despesas: number }>();
  dummyTransactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthName = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''); // Remove o ponto (ex: 'jan.')

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

  // Ordenar os meses para o gráfico
  const monthOrder = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const chartData = Array.from(chartDataMap)
    .map(([name, values]) => ({ name, ...values }))
    .sort((a, b) => {
      const monthA = a.name.toLowerCase();
      const monthB = b.name.toLowerCase();
      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

  // 3. Obter transações separadas por tipo para as tabelas
   const receitasTransactions = dummyTransactions
     .filter(t => t.type === 'Receita')
     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

   const despesasTransactions = dummyTransactions
     .filter(t => t.type === 'Despesa')
     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


  // --- Estrutura JSX do Dashboard ---
  return (
    <>
      <HeaderProfile />  
      <main className="container-fluid p-4 text-white" style={{ minHeight: "calc(100vh - 80px)" }}>
        
        {/* Cards de Resumo */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="bg-dark p-3 rounded d-flex flex-column h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="fs-4 fw-light m-0 text-primary">Saldo Atual</h1>
                <svg width="24" height="24" fill="currentColor" className="bi bi-wallet2 text-primary" viewBox="0 0 16 16">
                  <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                </svg>
              </div>
              <p className="fs-3 fw-bold m-0 mt-2">{formatCurrency(currentBalance)}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-dark p-3 rounded d-flex flex-column h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="fs-4 fw-light m-0 text-success">Total de Receitas</h1>
                <svg width="24" height="24" fill="currentColor" className="bi bi-arrow-up-circle text-success" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                </svg>
              </div>
              <p className="fs-3 fw-bold m-0 mt-2">{formatCurrency(totalReceitas)}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-dark p-3 rounded d-flex flex-column h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="fs-4 fw-light m-0 text-danger">Total de Despesas</h1>
                <svg width="24" height="24" fill="currentColor" className="bi bi-arrow-down-circle text-danger" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                </svg>
              </div>
              <p className="fs-3 fw-bold m-0 mt-2">{formatCurrency(totalDespesas)}</p>
            </div>
          </div>
        </div>
        
        {/* Gráfico Geral */}
        <div className="row mb-4">
            <div className="col-12">
                <div className="bg-dark p-3 rounded">
                    <h2 className="fs-5 mb-3 text-white-50">Visão Geral de Receitas e Despesas por Mês</h2>
                    {/* Aqui inserimos o gráfico geral */}
                    <div style={{ height: '350px' }}>
                         <MeuGrafico data={chartData} />
                    </div>
                </div>
            </div>
        </div>

        {/* Tabelas de Transações */}
        <div className="row g-4">
            <div className="col-lg-6">
                <div className="bg-dark p-3 rounded">
                    <h2 className="fs-5 mb-3 text-success">Histórico de Receitas</h2>
                    {/* Aqui inserimos a tabela de receitas */}
                    <TransactionTable transactions={receitasTransactions} />
                </div>
            </div>
            <div className="col-lg-6">
                 <div className="bg-dark p-3 rounded">
                    <h2 className="fs-5 mb-3 text-danger">Histórico de Despesas</h2>
                    {/* Aqui inserimos a tabela de despesas */}
                    <TransactionTable transactions={despesasTransactions} />
                </div>
            </div>
        </div>
      </main>
    </>
  );
}