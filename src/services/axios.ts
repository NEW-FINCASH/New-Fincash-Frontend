import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import { auth } from "./firebase"; // Assumindo que o firebase está configurado aqui

const provider = new GoogleAuthProvider();

export const handleLogin = async (navigate: (path: string) => void) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Após o login bem-sucedido, pega o ID token
    const idToken = await user.getIdToken();

    // Enviar o token para o backend usando Axios
    const response = await axios.post("http://localhost:5000/api/verify-token", { token: idToken });
    
    console.log("Resposta do backend:", response.data);
    navigate("/"); // Redireciona para a página inicial após o login
  } catch (error) {
    console.error("Erro no login:", error);
  }
};
