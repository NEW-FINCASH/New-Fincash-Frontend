import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!user || !newPhoto) return;

    setUploading(true);

    try {
      const storage = getStorage();
      const photoRef = ref(storage, `profile_photos/${user.uid}/${newPhoto.name}`);
      await uploadBytes(photoRef, newPhoto);
      const photoURL = await getDownloadURL(photoRef);

      await updateProfile(user, { photoURL });

      // Força atualização do user no estado
      setUser({ ...user, photoURL } as User);
      alert("Foto de perfil atualizada!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Erro ao atualizar foto.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container bg-dark rounded py-5">
      <div className="card profile-card p-3 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={preview ?? user.photoURL ?? ""}
            alt={user.displayName ?? "Usuário"}
            className="rounded-circle"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div>
            <h5 className="mb-1">{user.displayName}</h5>
            <p className="mb-0 email-text">{user.email}</p>
          </div>
        </div>

        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-2" />
        <button
          onClick={handleUpload}
          className="btn btn-primary w-100"
          disabled={!newPhoto || uploading}
        >
          {uploading ? "Atualizando..." : "Atualizar Foto de Perfil"}
        </button>
      </div>
    </div>
  );
}
