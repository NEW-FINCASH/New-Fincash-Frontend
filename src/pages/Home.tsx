import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import HeaderProfile from "../components/HeaderProfile";

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
    <HeaderProfile />
    <div className="d-flex justify-content-center align-items-center rounded vw-100" style={{ minHeight: "calc(100vh - 80px)" }}>
      <h1>home</h1>
    </div>
    </>
  );
}
