import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import MeuGrafico from "../components/MeuGrafico";
import '../App.css'

export default function Account() {
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
                  className="rounded-4 me-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <h1 className="ml-3 text-white fw-light fs-2">{user.displayName ?? "Usuário"}</h1>
              </div>
              <button className="btn btn-light">Editar perfil<i className=""></i></button>
            </div>
            <div className="d-flex justify-content-between align-items-start mt-2 w-100" style={{ height: '280px'}} >
              <div className="d-flex flex-column justify-content-center align-items-center w-50 h-100 pe-3">
                <input className="w-100 mb-4 bg-dark py-1 px-2 rounded border-0 text-white fw-light" type="" placeholder="Input com informações do usuário" />
              </div>
              <div className="w-50 h-100">
                <div className="bg-dark w-100 rounded p-3 h-100 d-flex flex-column"> {/* Adicionado flex-column */}
                  <h1 className="text-white fs-4 fw-medium text-center mb-3">Últimas notificações</h1> {/* Adicionado mb-3 */}
                  <div className="flex-grow-1 overflow-auto"> {/* Para scroll se necessário */}
                    {currentNotificacoes.map((notificacao) => (
                      <div key={notificacao.id} className="px-3 py-2 text-white border w-100 mt-2 rounded p-1"> {/* mt-2 para espaçamento */}
                        <div className="d-flex justify-content-between align-items-center">
                          <h1 className="fw-medium fs-5 m-0">{notificacao.titulo}</h1>
                          <p className="text-light-emphasis m-0" style={{ fontSize: "12px" }}>{notificacao.hora}</p>
                        </div>
                        <p className="m-0 text-secondary" style={{ fontSize: "15px" }}>{notificacao.descricao}</p>
                      </div>
                    ))}
                  </div>

                  {/* --- Controles de Paginação --- */}
                  {totalPages > 1 && ( // Exibir paginação apenas se houver mais de uma página
                    <div className="d-flex justify-content-center align-items-center mt-3"> {/* mt-3 para espaçamento */}
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
                  {/* ------------------------------- */}
                </div>
              </div>
            </div>

            <div className="bg-dark rounded text-white p-3 mt-4 d-flex flex-column align-items-center" style={{ width: '100%', height: ''}}>
              <h1 className="text-white fw-light fs-4">Gráfico de Receitas e Despesas</h1>
              <MeuGrafico />
            </div>
            <div className="bg-dark rounded text-white p-3 mt-4" style={{ width: '100%', height: '' }}>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Value</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="text-success">Receita</th>
                    <td>R$12,90</td>
                    <td>12-05-2025</td>
                    <td>Lanche do Jonas</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-danger">Despesa</th>
                    <td>R$3,89</td>
                    <td>15-06-2025</td>
                    <td>Coca-cola</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-danger">Despesa</th>
                    <td>$12</td>
                    <td>18-06-2025</td>
                    <td>Pagamento do Perssua</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}