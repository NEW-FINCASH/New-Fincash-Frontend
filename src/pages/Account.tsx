import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import MeuGrafico from "../components/MeuGrafico";
import '../App.css'

export default function Account() {
    // No componente Account.tsx, logo abaixo dos imports
    // (Você pode querer mover isso para um arquivo de dados ou buscar de uma API real)
    interface Transaction {
    id: number;
    type: 'Receita' | 'Despesa';
    value: number;
    date: string; // Ou um objeto Date se preferir manipular datas
    description: string;
    }

    const userTransactions: Transaction[] = [
    { id: 1, type: 'Receita', value: 1499.99, date: '2025-01-10', description: 'Salário de Jan' },
    { id: 2, type: 'Despesa', value: 229.99, date: '2025-01-15', description: 'Aluguel' },
    { id: 3, type: 'Receita', value: 549.90, date: '2025-02-05', description: 'Bônus' },
    { id: 4, type: 'Despesa', value: 159.90, date: '2025-02-20', description: 'Compras' },
    { id: 5, type: 'Receita', value: 1239.59, date: '2025-03-10', description: 'Salário de Mar' },
    { id: 6, type: 'Despesa', value: 389.99, date: '2025-03-25', description: 'Contas' },
    { id: 7, type: 'Receita', value: 854.99, date: '2025-04-01', description: 'Freelance' },
    { id: 8, type: 'Despesa', value: 254.59, date: '2025-04-12', description: 'Lazer' },
    { id: 9, type: 'Receita', value: 1109.89, date: '2025-05-08', description: 'Salário de Mai' },
    { id: 10, type: 'Despesa', value: 424.89, date: '2025-05-19', description: 'Mercado' },
    { id: 11, type: 'Receita', value: 734.59, date: '2025-06-03', description: 'Reembolso' },
    { id: 12, type: 'Despesa', value: 245.59, date: '2025-06-17', description: 'Cinema' },
    // ... adicione mais transações se quiser
    ];

    // ... dentro do componente Account()

    // Calcula o saldo total
    const currentBalance = userTransactions.reduce((total, transaction) => {
    return transaction.type === 'Receita' ? total + transaction.value : total - transaction.value;
    }, 0);

    // Prepara os dados para o gráfico de Receitas e Despesas por Mês
    const chartDataMap = new Map<string, { receitas: number, despesas: number }>();

    userTransactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthName = date.toLocaleString('pt-BR', { month: 'short' }); // Ex: Jan, Fev

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

    // Converter o Map para um array de objetos para o Recharts
    const chartData = Array.from(chartDataMap).map(([name, values]) => ({
    name,
    ...values
    }));

    // O Recharts espera os meses em ordem, então vamos ordenar
    // Definindo a ordem dos meses
    const monthOrder = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    chartData.sort((a, b) => {
    const monthA = a.name.toLowerCase();
    const monthB = b.name.toLowerCase();
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

    // ... (resto do seu código)
    // Dados de notificações (simulando várias notificações)
    const allNotificacoes = [
        {
        id: 1,
        titulo: "Transferência realizada",
        hora: "10:30 AM",
        descricao: "Você realizou uma transferência de R$ 129,90 para LTDA Cotton Company",
        },
        {
        id: 2,
        titulo: "Pagamento recebido",
        hora: "09:15 AM",
        descricao: "Você recebeu um pagamento de R$ 500,00 de João Silva",
        },
        {
        id: 3,
        titulo: "Novo limite de crédito",
        hora: "Ontem, 08:00 PM",
        descricao: "Seu limite de crédito foi aumentado para R$ 10.000,00",
        },
        {
        id: 4,
        titulo: "Fatura disponível",
        hora: "Ontem, 06:00 PM",
        descricao: "Sua fatura de cartão de crédito de Junho está disponível",
        },
        {
        id: 5,
        titulo: "Saque efetuado",
        hora: "2 dias atrás",
        descricao: "Saque de R$ 200,00 efetuado em caixa eletrônico",
        },
        {
        id: 6,
        titulo: "Investimento aplicado",
        hora: "3 dias atrás",
        descricao: "Seu investimento em LCA foi aplicado com sucesso",
        },
        {
        id: 7,
        titulo: "Conta bloqueada",
        hora: "4 dias atrás",
        descricao: "Tentativa de login suspeita, sua conta foi temporariamente bloqueada",
        },
        {
        id: 8,
        titulo: "Depósito agendado",
        hora: "5 dias atrás",
        descricao: "Depósito de R$ 1.500,00 agendado para 20/06",
        },
        {
        id: 9,
        titulo: "Atualização de segurança",
        hora: "6 dias atrás",
        descricao: "Seu aplicativo foi atualizado para a versão mais recente com melhorias de segurança",
        },
    ];

    const [user, setUser] = useState<User | null>(null);

    // Estados para Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Quantas notificações por página

    // Lógica para calcular as notificações a serem exibidas na página atual
    const indexOfLastNotification = currentPage * itemsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - itemsPerPage;
    const currentNotificacoes = allNotificacoes.slice(indexOfFirstNotification, indexOfLastNotification);

    // Calcula o número total de páginas
    const totalPages = Math.ceil(allNotificacoes.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

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

  return (
  <>
    <HeaderProfile />
    <div className="d-flex flex-column justify-content-start align-items-start rounded vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
      <div className="bg-white d-flex justify-content-center align-items-center" style={{ width: '100%', height: '150px' }}>
        <h1>Background Wallpaper.</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 p-4" >
        <div className="d-flex flex-column justify-content-start align-items-start w-75 p-2">
          <div className="d-flex justify-content-between align-items-start w-100">
            <div className="d-flex align-items-center">
              <img
                src={user.photoURL ?? ""}
                alt={user.displayName ?? "Usuário"}
                className="rounded-circle me-4"
                style={{ width: "90px", height: "90px", objectFit: "cover", border: "3px solid #6c757d" }}
              />
              <div>
                <h1 className="text-white fw-bold mb-1">{user.displayName ?? "Usuário"}</h1>
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>
            <button className="btn btn-outline-light">
              Editar perfil
              <svg width="16" height="16" fill="currentColor" className="bi bi-pencil-square ms-2" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-start mt-4 w-100" style={{ height: '280px'}} >
            <div className="d-flex flex-column justify-content-start align-items-center w-50 h-100 pe-3">
              <div className="bg-dark w-100 p-3 rounded" style={{ height: '50%'}}>
                <h1 className="text-white fw-light fs-4">Saldo atual</h1>
                {/* Exibe o saldo calculado dinamicamente */}
                <p className={`fw-bold fs-3 m-0 ${currentBalance >= 0 ? 'text-success' : 'text-danger'}`}>
                  R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-dark w-100 mt-3 p-3 rounded" style={{ height: '50%'}}>
                <h1 className="text-white fw-light fs-4">Membro Desde</h1>
                <p className="text-white-50 m-0"></p>
              </div>
            </div>
            <div className="w-50 h-100">
              <div className="bg-dark w-100 rounded p-3 h-100 d-flex flex-column">
                <h1 className="text-white fs-4 fw-medium text-center mb-3">Últimas notificações</h1>
                <div className="flex-grow-1 overflow-auto notificacoes-scroll-area">
                  {currentNotificacoes.map((notificacao) => (
                    <div key={notificacao.id} className="px-3 py-2 text-white border border-secondary w-100 mt-2 rounded p-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fw-medium fs-5 m-0">{notificacao.titulo}</h1>
                        <p className="text-light-emphasis m-0" style={{ fontSize: "12px" }}>{notificacao.hora}</p>
                      </div>
                      <p className="m-0 text-secondary" style={{ fontSize: "15px" }}>{notificacao.descricao}</p>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center align-items-center mt-3">
                    <button
                      className="btn btn-sm btn-outline-light me-2"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>
                    <span className="text-white">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-light ms-2"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-dark rounded text-white p-3 mt-4 d-flex flex-column align-items-center" style={{ width: '100%', height: ''}}>
            <h1 className="text-white fw-light fs-4">Gráfico de Receitas e Despesas</h1>
            <MeuGrafico data={chartData} /> {/* <-- Passa os dados dinâmicos para o gráfico */}
          </div>
          <div className="bg-dark rounded text-white p-3 mt-4" style={{ width: '100%', height: '' }}>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Data</th>
                  <th scope="col">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapeia as transações para a tabela */}
                {userTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <th scope="row" className={transaction.type === 'Receita' ? 'text-success' : 'text-danger'}>
                      {transaction.type}
                    </th>
                    <td>
                      R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td>{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                    <td>{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
);
}