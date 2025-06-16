import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="vw-100 py-3 px-5 d-flex justify-content-center align-items-center text-white" style={{ height: '80px', boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)'}}>
            <div className="d-flex justify-content-between align-items-center w-100">
                <img src="/assets/fincash.png" alt="Logo" style={{ width: '10%'}}/>
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <Link to="" className="text-white text-decoration-none">Product</Link>
                    <Link to="" className="text-white text-decoration-none">About us</Link>
                    <Link to="" className="text-white text-decoration-none">Roadmaps</Link>
                    <Link to="" className="text-white text-decoration-none">Sign Up</Link>
                    <Link to="" className="text-decoration-none btn btn-light rounded-3 px-4">Sign In</Link>
                </div>
            </div>
        </header>
    );
}
