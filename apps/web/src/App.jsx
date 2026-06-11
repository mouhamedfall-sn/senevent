import { useState, useEffect } from "react";
import EvenementCarte from "./components/EvenementCarte";
import SearchBar from "./components/SearchBar";
import EtatChargement from "./components/EtatChargement"; // 🚀 1. Nouvel Import
import styles from "./App.module.css";

const App = () => {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");

  // Fonction de chargement globale et réutilisable
  const charger = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const reponse = await fetch("/evenements.json");

      if (!reponse.ok) {
        throw new Error(`Erreur HTTP ${reponse.status}`);
      }

      const data = await reponse.json();
      setEvenements(data);
    } catch (e) {
      setErreur(e.message);
    } finally {
      setChargement(false);
    }
  };

  // Déclenchement automatique au montage du composant
  useEffect(() => {
    charger();
  }, []);

  // Logique de filtrage en temps réel
  const evenementsFiltres = evenements.filter((ev) =>
    ev.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  // Synchroniser le titre de l'onglet du navigateur avec le compteur
  useEffect(() => {
    if (evenementsFiltres.length > 0) {
      document.title = `(${evenementsFiltres.length}) SenEvent`;
    } else {
      document.title = "SenEvent";
    }
  }, [evenementsFiltres.length]);

  return (
    <div className={styles.container}>
      <h1 className={styles.titre}>SenEvent --- Événements à Dakar</h1>

      {/* 🚀 2. Rendu conditionnel modifié : Utilisation du composant EtatChargement */}
      {chargement && <EtatChargement />}

      {/* Rendu conditionnel : État d'erreur (ERROR) */}
      {erreur && (
        <div className={styles.erreur}>
          <p>Erreur : {erreur}</p>
          <button className={styles.bouton} onClick={charger}>
            Réessayer
          </button>
        </div>
      )}

      {/* Rendu conditionnel : État de succès (SUCCESS) */}
      {!chargement && !erreur && (
        <>
          <SearchBar recherche={recherche} onRecherche={setRecherche} />

          <p className={styles.compteur}>
            {evenementsFiltres.length} événement(s) trouvé(s)
          </p>

          {/* Gestion du cas où le filtre ne trouve rien */}
          {evenementsFiltres.length === 0 ? (
            <p className={styles.message}>Aucun événement ne correspond.</p>
          ) : (
            evenementsFiltres.map((ev) => (
              <EvenementCarte key={ev.id} ev={ev} afficherDetails={true} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default App;