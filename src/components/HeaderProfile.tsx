import { Link } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";

export default function HeaderProfile() {
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
        <header className="vw-100 py-3 px-5 d-flex justify-content-center align-items-center text-white" style={{ height: '80px', boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)'}}>
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <svg width="28" height="28" fill="currentColor" className="bi bi-back" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                    </svg>
                    <h1 className="d-flex justify-content-center align-items-center fs-2 fw-light">Fincash</h1>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <Link to="/home" className="text-white text-decoration-none">Management dashboard</Link>
                    <Link to="" className="text-white text-decoration-none">AI-powered goals</Link>
                    <Link to="" className="text-white text-decoration-none">Latest news</Link>
                    <Link to="" className="text-white text-decoration-none">Price in real time</Link>
                    <Link to="/account" className="text-decoration-none btn btn-light rounded-5 p-1 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
                        <img
                            src={user.photoURL ?? ""}
                            alt={user.displayName ?? "Usuário"}
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                    </Link>
                </div>
            </div>
        </header>
        </>
    )
}