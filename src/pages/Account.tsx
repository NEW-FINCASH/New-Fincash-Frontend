import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import MeuGrafico from "../components/MeuGrafico";

export default function Account() {
    const notificacoes = [
        {
            id: 1,
            titulo: "Transferência realizada",
            hora: "10:30 AM",
            descricao: "Você realizou uma transferência de R$ 129,90,00 para LTDA Cotton Company",
        }
    ]

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

    return (
        <>
            <HeaderProfile />
            <div className="d-flex flex-column justify-content-start align-items-start rounded vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
              <div className="bg-white d-flex justify-content-center align-items-center" style={{ width: '100%', height: '150px' }}>
                <h1>Background Wallpaper.</h1>  
              </div>
              <div className="d-flex justify-content-center align-items-center w-100 p-4" >
                <div className="d-flex flex-column justify-content-start align-items-start w-50 p-2">
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
                            <div className="bg-dark w-100 rounded p-3 h-100">
                                <h1 className="text-white fs-4 fw-medium text-center">Ultimas notificações</h1>
                                {notificacoes.map((notificacao) => (
                                    <div key={notificacao.id} className="px-3 py-2 text-white border w-100 mt-3 rounded p-1">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h1 className="fw-medium fs-5 m-0">{notificacao.titulo}</h1>
                                            <p className="text-light-emphasis m-0" style={{ fontSize: "12px" }}>{notificacao.hora}</p>
                                        </div>
                                        <p className="m-0 text-secondary" style={{ fontSize: "15px" }}>{notificacao.descricao}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark rounded text-white p-3 mt-4 d-flex flex-column align-items-center" style={{ width: '100%', height: ''}}>
                        <h1 className="text-white fw-light fs-4">Gráfico de receitas e despesas inteligente</h1>
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