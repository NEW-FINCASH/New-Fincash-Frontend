import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";
import { Link } from "react-router-dom";

export default function Account() {
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
            <HeaderProfile />
            <div className="d-flex flex-column justify-content-start align-items-start rounded vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
              <div className="bg-white d-flex justify-content-center align-items-center" style={{ width: '100%', height: '150px' }}>
                <h1>Background Wallpaper.</h1>  
              </div>
              <div className="d-flex justify-content-center align-items-center w-100 p-4" >
                <div className="d-flex flex-column justify-content-start align-items-start w-75 p-2">
                    <div className="d-flex justify-content-start align-items-center">
                        <img 
                        src={user.photoURL ?? ""} 
                        alt={user.displayName ?? "Usuário"}
                        className="rounded-4 me-3"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                        
                        <h1 className="ml-3 text-white fw-light fs-2">{user.displayName ?? "Usuário"}</h1>
                    </div>
                    <h2></h2>
                </div>
              </div>
            </div>
        </>
    );
}

// <div className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={user.photoURL ?? ""}
//                     alt={user.displayName ?? "Usuário"}
//                     className="rounded-circle"
//                     style={{ width: "80px", height: "80px", objectFit: "cover" }}
//                   />
//                   <div>
//                     <h5 className="mb-1">{user.displayName}</h5>
//                     <p className="mb-0 email-text">{user.email}</p>
//                   </div>
//                 </div>