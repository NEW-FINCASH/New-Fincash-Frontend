import HeaderProfile from "../components/HeaderProfile";

export default function Plans() {

    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
        </svg>
    );

    return (
        <>
            <HeaderProfile />
            <div className="d-flex justify-content-start align-items-start rounded vw-100 mb-5" style={{ minHeight: "calc(100vh - 80px)" }}>
                <h1 className="w-100 text-white" style={{ position: 'absolute', textAlign: 'center', fontSize: '200px', zIndex: '1' }} >Pricing</h1>
                <div className="d-flex justify-content-center align-items-center w-100 gap-2" style={{ marginTop: '150px' }}>
                    <div className="d-flex flex-column justify-content-start align-items-start rounded-4 p-4 text-light" style={{ width: '400px', height: '600px' ,backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', zIndex: '1', backdropFilter: 'blur(10px)' }}>
                    <p className="fw-light fs-6 text-light">Free Plan</p>
                    <h1 className="fs-1 mb-2">Free</h1>
                    <hr className="text-white w-100" />
                    <div className="d-flex flex-column justify-content-start align-items-start" style={{ height: '100%', width: '100%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Dashboard de receitas e despesas</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Ver Gráficos da sua gestão financeira</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Outros beneficios do plano free</p>
                        </div>
                    </div>
                    <button className="btn text-secondary rounded-5 w-100 py-3" style={{ boxShadow: '1px 1px 30px rgba(255, 255, 255, 0.5)' }}>Escolher plano</button>
                </div>

                <div className="d-flex flex-column justify-content-start align-items-start rounded-4 p-4 text-light" style={{ width: '400px', height: '600px' ,backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', zIndex: '1', backdropFilter: 'blur(10px)' }}>
                    <p className="fw-light fs-6 text-light">Gold Plan</p>
                    <h1 className="fs-1 mb-2">$16.99/m</h1>
                    <hr className="text-white w-100" />
                    <div className="d-flex flex-column justify-content-start align-items-start" style={{ height: '100%', width: '100%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Dashboard de receitas e despesas</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Ver Gráficos da sua gestão financeira</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Aba de noticias do mundo fintech</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Outros beneficios do plano gold</p>
                        </div>
                    </div>
                    <button className="btn btn-light rounded-5 w-100 py-3" style={{ boxShadow: '1px 1px 30px rgba(255, 255, 255, 0.5)' }}>Escolher plano</button>
                </div>

                <div className="d-flex flex-column justify-content-start align-items-start rounded-4 p-4 text-light" style={{ width: '400px', height: '600px' ,backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', zIndex: '1', backdropFilter: 'blur(10px)' }}>
                    <p className="fw-light fs-6 text-light">Diamond Plan</p>
                    <h1 className="fs-1 mb-2">$27.99/m</h1>
                    <hr className="text-white w-100" />
                    <div className="d-flex flex-column justify-content-start align-items-start" style={{ height: '100%', width: '100%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Dashboard de receitas e despesas</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Ver Gráficos da sua gestão financeira</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Aba de noticias do mundo fintech</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Metas guiadas com ajuda de IA</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center  mb-4">
                            <button className="btn rounded-5 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
                                <CheckIcon />
                            </button>
                            <p className="ms-3 m-0 fs-6 text-secondary">Outros beneficios do plano diamond</p>
                        </div>
                    </div>
                    <button className="btn text-secondary rounded-5 w-100 py-3" style={{ boxShadow: '1px 1px 30px rgba(255, 255, 255, 0.5)' }}>Escolher plano</button>
                    </div>
                </div>
            </div>
        </>
    );
}