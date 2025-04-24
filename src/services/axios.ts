import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
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

export const handleRegister = async (navigate: (path: string) => void) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const idToken = await user.getIdToken(); // Pega o ID token do usuário
        
        const additionalInfo = getAdditionalUserInfo(result);
        const isNewUser = additionalInfo?.isNewUser;

        //envia o token para o backend usando Axios
        const response = await axios.post("http://localhost:5000/api/verify-token", {
            token: idToken,
            isNewUser,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
        });

        console.log("Usuário registrado/reposta do backend:", response.data);
        navigate("/"); // Redireciona para a página inicial após o registro
    } catch (error) {
        console.error("Erro no registro:", error);
    }
};
