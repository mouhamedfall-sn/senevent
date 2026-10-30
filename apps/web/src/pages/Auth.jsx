import { useState } from "react";
import { sInscrire, seConnecter } from "@senevent/shared";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
const Auth = () => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState(null);
  const [info, setInfo] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const navigate = useNavigate();
  const soumettre = async (event) => {
    event.preventDefault();
    setErreur(null);
    setInfo(null);
    setEnCours(true);
    try {
      if (mode === "signup") {
        // Le profil est cree par le declencheur SQL : plus d'insertion ici
        const data = await sInscrire(email, motDePasse, nom);
        if (data.session) {
          // Confirmation d'email desactivee : l'utilisateur est deja connecte
          navigate("/");
        } else {
          // Confirmation d'email activee : il faut cliquer sur le lien recu
          setInfo(
            "Compte cree. Verifiez votre boite mail et cliquez sur le lien de confirmation, puis connectez-vous."
          );
          setMode("login");
          setMotDePasse("");
        }
      } else {
        await seConnecter(email, motDePasse);
        navigate("/");
      }
    } catch (e) {
      setErreur(e.message);
    } finally {
      setEnCours(false);
    }
  };
  return (
    <form className={styles.form} onSubmit={soumettre}>
      <h2>{mode === "signup" ? "Creer un compte" : "Se connecter"}</h2>
      {mode === "signup" && (
        <label className={styles.champ}>
          Nom d'affichage
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </label>
      )}
      <label className={styles.champ}>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className={styles.champ}>
        Mot de passe
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          minLength="6"
          required
        />
      </label>
      {info && <p style={{ color: "#1f6b2c", textAlign: "center" }}>{info}</p>}
      {erreur && <p className={styles.erreur}>{erreur}</p>}
      <button type="submit" disabled={enCours} className={styles.bouton}>
        {enCours ? "..." : mode === "signup" ? "Creer le compte" : "Se connecter"}
      </button>
      <button
        type="button"
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        className={styles.basculer}
      >
        {mode === "signup"
          ? "Deja un compte ? Se connecter"
          : "Pas encore de compte ? Creer"}
      </button>
    </form>
  );
};
export default Auth;
