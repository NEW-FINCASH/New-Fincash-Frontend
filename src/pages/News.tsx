// src/pages/Noticias.tsx
import { useState, useEffect } from "react";
import HeaderProfile from "../components/HeaderProfile";
import '../App.css';

// Tipo para notícias
interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  data: string;
  resumo: string;
}

// Notícias fictícias
const noticiasDummy: Noticia[] = [
  { id: 1, titulo: "Tecnologia 6G avança", categoria: "Tecnologia", data: "2025-06-30", resumo: "Pesquisadores anunciam protótipo funcional de redes 6G com testes bem-sucedidos em campo." },
  { id: 2, titulo: "Brasil vence Copa América", categoria: "Esportes", data: "2025-06-29", resumo: "Seleção brasileira conquista título após emocionante disputa por pênaltis." },
  { id: 3, titulo: "IA revoluciona saúde pública", categoria: "Tecnologia", data: "2025-06-28", resumo: "Novos sistemas inteligentes agilizam diagnósticos em hospitais." },
  { id: 4, titulo: "Olimpíadas: novos recordes", categoria: "Esportes", data: "2025-06-27", resumo: "Atletas batem marcas históricas nas provas de atletismo em Paris." },
];

// Separar por categorias
const noticiasTecnologia = noticiasDummy.filter(n => n.categoria === "Tecnologia");
const noticiasEsportes = noticiasDummy.filter(n => n.categoria === "Esportes");

export default function News() {
  return (
    <>
      <HeaderProfile />
      <main className="container-fluid p-4 text-white" style={{ minHeight: "calc(100vh - 80px)" }}>

        {/* Destaques */}
        <div className="row g-4 mb-4">
          {noticiasDummy.slice(0, 3).map(noticia => (
            <div key={noticia.id} className="col-md-4">
              <div className="bg-dark p-3 rounded d-flex flex-column h-100">
                <h1 className="fs-5 fw-bold">{noticia.titulo}</h1>
                <p className="text-white-50">{noticia.data}</p>
                <p>{noticia.resumo}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categorias */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="bg-dark p-3 rounded">
              <h2 className="fs-5 mb-3 text-info">Tecnologia</h2>
              <ul className="list-unstyled">
                {noticiasTecnologia.map(noticia => (
                  <li key={noticia.id} className="mb-3">
                    <h5 className="mb-1">{noticia.titulo}</h5>
                    <p className="mb-1 text-white-50">{noticia.data}</p>
                    <p className="mb-0">{noticia.resumo}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bg-dark p-3 rounded">
              <h2 className="fs-5 mb-3 text-warning">Esportes</h2>
              <ul className="list-unstyled">
                {noticiasEsportes.map(noticia => (
                  <li key={noticia.id} className="mb-3">
                    <h5 className="mb-1">{noticia.titulo}</h5>
                    <p className="mb-1 text-white-50">{noticia.data}</p>
                    <p className="mb-0">{noticia.resumo}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
