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
                <img src="/assets/fincash.png" alt="Logo" style={{ width: '10%'}}/>
                <div className="d-flex justify-content-between align-items-center gap-4">
                    <Link to="" className="text-white text-decoration-none">Management dashboard</Link>
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