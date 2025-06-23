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
      <div className="text-white d-flex flex-column justify-content-start align-items-start rounded vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="d-flex justify-content-around align-items-center w-100 mt-4">
          <div className="bg-dark py-1 rounded fs-4" style={{ width: '200px' }}>
            <div className="d-flex justify-content-around align-items-center w-100">
              <h1 className="fs-3 fw-light m-0">Saldo</h1>
              <svg width="20" height="20" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
              </svg>
            </div>
            <p></p>
          </div>
          <div className="bg-dark py-1 rounded fs-4" style={{ width: '200px' }}>
            <div className="d-flex justify-content-around align-items-center w-100">
              <h1 className="fs-3 fw-light m-0">Receita</h1>
              <svg width="20" height="20" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
              </svg>
            </div>
            <p></p>
          </div>
          <div className="bg-dark py-1 rounded fs-4" style={{ width: '200px' }}>
            <div className="d-flex justify-content-around align-items-center w-100">
              <h1 className="fs-3 fw-light m-0">Despesa</h1>
              <svg width="20" height="20" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
              </svg>
            </div>
            <p></p>
          </div>
        </div>
        <div className="">
          <div className="bg-dark">Gráfico Receita</div>
          <div className="bg-dark">Gráfico Despesa</div>
        </div>
        <div className="">
          <div className="bg-dark">Gráfico Geral</div>
        </div>
        <div className="">
          <div className="bg-dark">Tabela Receita</div>
        </div>
        <div className="">
          <div className="bg-dark">Tabela Despesa</div>
        </div>
      </div>
    </>
  );
}