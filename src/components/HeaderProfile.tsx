import { Link } from "react-router-dom";

export default function HeaderProfile() {
    return (
        <>
            <header className="vw-100 py-3 px-5 d-flex justify-content-center align-items-center text-white" style={{ height: '80px', boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)'}}>
            <div className="d-flex justify-content-between align-items-center w-100">
                <img src="/assets/fincash.png" alt="Logo" style={{ width: '10%'}}/>
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <Link to="" className="text-white text-decoration-none">Management dashboard</Link>
                    <Link to="" className="text-white text-decoration-none">AI-powered goals</Link>
                    <Link to="" className="text-white text-decoration-none">Latest news</Link>
                    <Link to="" className="text-white text-decoration-none">Price in real time</Link>
                    <Link to="" className="text-decoration-none btn btn-light rounded-5 p-1 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
        </>
    )
}