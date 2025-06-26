import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import '../App.css'
import { Link } from "react-router-dom";

export default function Account() {
    // Estado para armazenar as informações do usuário autenticado.
    const [user, setUser] = useState<User | null>(null);

    // Função para realizar o logout do usuário.
    const handleSignOut = () => {
        signOut(auth).catch((error) => {
            console.error("Erro ao fazer logout:", error);
        });
        // O onAuthStateChanged abaixo cuidará do redirecionamento.
    };

    // Efeito que observa o estado de autenticação do Firebase.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
                // Se um usuário estiver logado, atualiza o estado.
                setUser(u);
            } else {
                // Se não houver usuário, redireciona para a página de login.
                window.location.href = "/login";
            }
        });

        // Limpa a inscrição ao desmontar o componente para evitar vazamentos de memória.
        return () => unsubscribe();
    }, []);

    // Não renderiza nada até que as informações do usuário sejam carregadas.
    if (!user) return null;

    return (
        <>
            <HeaderProfile />
            <div className="d-flex flex-column justify-content-start align-items-start rounded vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
                <div className="bg-white d-flex justify-content-center align-items-center" style={{ width: '100%', height: '200px' }}>
                    {/* Você pode substituir este h1 por um componente de imagem de fundo */}
                    <h1>Background Image.</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center w-100 p-4" >
                    <div className="d-flex flex-column justify-content-start align-items-start w-100 p-2">
                        <div className="d-flex justify-content-between align-items-start w-100">
                            <div className="d-flex align-items-center">
                                <img
                                    src={user.photoURL ?? ""}
                                    alt={user.displayName ?? "Usuário"}
                                    className="rounded-circle me-4"
                                    style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                />
                                <div>
                                    <h1 className="text-white fw-medium mb-1">{user.displayName ?? "Usuário"}</h1>
                                    <p className="mb-0 text-dark-emphasis">@thomaz_mellux</p>
                                    <p className="mb-0 text-dark-emphasis">{user.email}</p>
                                    <p className="mb-0 text-dark-emphasis">+55 (12) 98707-2463</p>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between align-items-center" style={{ height: 'auto' }}>
                                {/* Botão "Planos" adicionado */}
                                <Link to="/plans" className="btn btn-outline-light d-flex justify-content-between align-items-center mb-2" style={{ width: '140px' }}>
                                    Plans
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-diamond" viewBox="0 0 16 16">
                                      <path d="M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.54.54 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.54.54 0 0 0 0-.612zM6.848.613a1.39 1.39 0 0 1 2.304 0l4.56 6.468a1.61 1.61 0 0 1 0 1.838l-4.56 6.468a1.39 1.39 0 0 1-2.304 0L2.288 8.92a1.61 1.61 0 0 1 0-1.838z"/>
                                    </svg>
                                </Link>
                                <button className="btn btn-outline-light d-flex justify-content-between align-items-center" style={{ width: '140px' }}>
                                    Edit profile
                                    <svg width="16" height="16" fill="currentColor" className="bi bi-pencil-square ms-2" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </button>
                                {/* Botão corrigido e com funcionalidade de logout */}
                                <button onClick={handleSignOut} className="btn btn-outline-light mt-2 d-flex justify-content-between align-items-center" style={{ width: '140px' }}>
                                    Sign Up
                                    <svg width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right ms-2" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}