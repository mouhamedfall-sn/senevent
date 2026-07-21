import { useState, useEffect } from "react";
import { estInscrit, inscrire, desinscrire } from "@senevent/shared";
import styles from "./BoutonInscription.module.css";
const BoutonInscription = ({ evenementId, session }) => {
  const [inscritEtat, setInscritEtat] = useState(false);
  const [chargement, setChargement] = useState(true);
  useEffect(() => {
    const verifier = async () => {
      if (!session) {
        setChargement(false);
        return;
      }
      const resultat = await estInscrit(evenementId, session.user.id);
      setInscritEtat(resultat);
      setChargement(false);
    };
    verifier();
  }, [evenementId, session]);
  const sInscrireLocal = async () => {
    try {
      await inscrire(evenementId, session.user.id);
      setInscritEtat(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  const seDesinscrireLocal = async () => {
    try {
      await desinscrire(evenementId, session.user.id);
      setInscritEtat(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  if (!session) {
    return <p className={styles.info}>Connectez-vous pour vous inscrire.</p>;
  }
  if (chargement) {
    return <p className={styles.info}>...</p>;
  }
  return inscritEtat ? (
    <button onClick={seDesinscrireLocal} className={styles.desinscrire}>
      Se desinscrire
    </button>
  ) : (
    <button onClick={sInscrireLocal} className={styles.inscrire}>
      S'inscrire
    </button>
  );
};
export default BoutonInscription;
