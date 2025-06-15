import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="vw-100 vh-auto py-3 px-5 d-flex justify-content-center align-items-center text-white">
            <div className="d-flex justify-content-between align-items-center w-100">
                <img src="/assets/fincash.png" alt="Logo" style={{ width: '10%'}}/>
                <div className="d-flex justify-content-between align-items-center gap-5">
                    <Link to="" className="text-white text-decoration-none">Product</Link>
                    <Link to="" className="text-white text-decoration-none">About us</Link>
                    <Link to="" className="text-white text-decoration-none">Roadmaps</Link>
                    <Link to="" className="text-white text-decoration-none">Register</Link>
                    <Link to="" className="text-decoration-none btn btn-light rounded-5 px-4">Login</Link>
                </div>
            </div>
        </header>
    );
}
