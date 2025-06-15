import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="vw-100 vh-auto py-3 px-5 d-flex justify-content-center align-items-center text-white">
            <div className="d-flex justify-content-between align-items-center w-100">
                <img src="/assets/fincash.png" alt="Logo" style={{ width: '10%'}}/>
                <div className="d-flex justify-content-between align-items-center gap-5">
                    <Link to="" className="">Product</Link>
                    <Link to="" className="">About us</Link>
                    <Link to="" className="">Roadmaps</Link>
                    <Link to="" className="">Register</Link>
                    <Link to="" className="">Login</Link>
                </div>
            </div>
        </header>
    );
}
