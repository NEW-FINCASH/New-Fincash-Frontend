import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="vw-100 py-3 px-5 d-flex justify-content-center align-items-center text-white" style={{ height: '80px', boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)'}}>
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <svg width="24" height="24" fill="currentColor" className="bi bi-back" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                    </svg>
                <h1 className="fs-3 fw-light ms-1">Fincash</h1>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <Link to="" className="text-white text-decoration-none">Product</Link>
                    <Link to="" className="text-white text-decoration-none">About us</Link>
                    <Link to="" className="text-white text-decoration-none">Contact</Link>
                    <Link to="/createaccount" className="text-white text-decoration-none">Sign Up</Link>
                    <Link to="/connectaccount" className="text-decoration-none btn btn-light rounded-3 px-4">Sign In</Link>
                </div>
            </div>
        </header>
    );
}
