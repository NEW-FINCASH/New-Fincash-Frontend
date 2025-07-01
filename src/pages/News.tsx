import { useState } from 'react';
import HeaderProfile from '../components/HeaderProfile';
import '../App.css';

interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  data: string;
  resumo: string;
  imagem: string;
}

const noticias: Noticia[] = [
  {
    id: 1,
    titulo: "Climate Changes In The Recent Prospective",
    categoria: "Business",
    data: "2025-07-01",
    resumo: "Climate change and economic impacts on global finance.",
    imagem: "https://images.unsplash.com/photo-1617688361895-52f13658bdf0",
  },
  {
    id: 2,
    titulo: "Watch Roberto Martinez Say It Would Be A",
    categoria: "Technology",
    data: "2025-06-28",
    resumo: "Martinez discusses the future of AI in sports.",
    imagem: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
  },
  {
    id: 3,
    titulo: "Half A Million Tons Of Recycling Dumped",
    categoria: "Food & Health",
    data: "2025-06-26",
    resumo: "Shocking stats about global recycling failures.",
    imagem: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458",
  },
  {
    id: 4,
    titulo: "Britney Spears' Petition Advances",
    categoria: "Entertainment",
    data: "2025-06-25",
    resumo: "Legal team seeks full independence from her father.",
    imagem: "https://images.unsplash.com/photo-1601987077681-22d8fbb44994",
  },
  {
    id: 5,
    titulo: "New VR Headset Brings Immersive Travel",
    categoria: "Technology",
    data: "2025-06-22",
    resumo: "Explore the world without leaving your room.",
    imagem: "https://images.unsplash.com/photo-1615567961303-fb6c711d9f3a",
  },
  {
    id: 6,
    titulo: "Tokyo Marathon Breaks Records Again",
    categoria: "Sports",
    data: "2025-06-20",
    resumo: "Record number of athletes and personal bests.",
    imagem: "https://images.unsplash.com/photo-1546484959-fb43c3cd1417",
  },
  {
    id: 7,
    titulo: "Global Market Sees Sharp Rebound",
    categoria: "Business",
    data: "2025-06-18",
    resumo: "Markets respond to tech recovery and investor optimism.",
    imagem: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9",
  },
  {
    id: 8,
    titulo: "Yoga and Mindfulness in Schools",
    categoria: "Health",
    data: "2025-06-15",
    resumo: "A growing movement to support student mental health.",
    imagem: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
  },
];

const categorias = ["All", "Business", "Technology", "Food & Health", "Entertainment", "Sports", "Health"];

export default function Noticias() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("All");

  const noticiasFiltradas = categoriaAtiva === "All"
    ? noticias
    : noticias.filter(n => n.categoria === categoriaAtiva);

  return (
    <>
      <HeaderProfile />
      <main className="container-fluid p-4 bg-dark text-white">

        {/* Notícia principal */}
        <section className="mb-5">
          <div className="bg-black p-4 rounded d-flex flex-column flex-md-row align-items-md-end">
            <div className="flex-grow-1">
              <span className="badge bg-danger mb-2">{noticias[0].categoria}</span>
              <h1 className="display-5 fw-bold">{noticias[0].titulo}</h1>
              <p className="text-white-50">{noticias[0].resumo}</p>
            </div>
            <img
              src={noticias[0].imagem}
              alt=""
              className="img-fluid rounded ms-md-4"
              style={{ maxWidth: '300px' }}
            />
          </div>
        </section>

        {/* Trending News com Filtro */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-4">Trending News</h2>
            <div>
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`btn btn-sm me-2 ${categoriaAtiva === cat ? 'btn-light' : 'btn-outline-light'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            {noticiasFiltradas.slice(0, 4).map(noticia => (
              <div className="col-md-6 mb-4" key={noticia.id}>
                <div className="bg-secondary p-3 rounded h-100">
                  <span className="badge bg-info">{noticia.categoria}</span>
                  <h5 className="mt-2">{noticia.titulo}</h5>
                  <p className="text-white-50">{noticia.data}</p>
                  <p>{noticia.resumo}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Destaques (Featured Grid) */}
        <section className="mb-5">
          <h2 className="fs-4 mb-3">Featured</h2>
          <div className="row g-4">
            {noticias.slice(1, 7).map(noticia => (
              <div className="col-lg-4" key={noticia.id}>
                <div className="card bg-black text-white border-0 h-100">
                  <img src={noticia.imagem} className="card-img-top" alt={noticia.titulo} />
                  <div className="card-body">
                    <span className="badge bg-success mb-2">{noticia.categoria}</span>
                    <h5 className="card-title">{noticia.titulo}</h5>
                    <p className="card-text text-white-50">{noticia.resumo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categorias com imagens */}
        <section>
          <h2 className="fs-4 mb-3">Categories</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1601987077681-22d8fbb44994"
                  className="img-fluid rounded"
                  alt="Entertainment"
                />
                <div className="position-absolute bottom-0 bg-dark bg-opacity-75 w-100 p-2">
                  <h5 className="m-0">Entertainment</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                  className="img-fluid rounded"
                  alt="Travel"
                />
                <div className="position-absolute bottom-0 bg-dark bg-opacity-75 w-100 p-2">
                  <h5 className="m-0">Travel</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1615567961303-fb6c711d9f3a"
                  className="img-fluid rounded"
                  alt="Technology"
                />
                <div className="position-absolute bottom-0 bg-dark bg-opacity-75 w-100 p-2">
                  <h5 className="m-0">Technology</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
