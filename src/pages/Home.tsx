import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Home() {
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
    <Header />
    <div className="d-flex justify-content-center align-items-center rounded vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
      <div className="card profile-card p-3 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={user.photoURL ?? ""}
            alt={user.displayName ?? "Usuário"}
            className="rounded-circle"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div>
            <h5 className="mb-1">{user.displayName}</h5>
            <p className="mb-0 email-text">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
