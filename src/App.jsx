import { useEffect, useMemo, useState } from "react";
import { Clapperboard, Film, Sparkles, LibraryBig } from "lucide-react";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";
import FilterBar from "./components/FilterBar";
import { filmsExemple } from "./data";

const STORAGE_KEY = "cineclub-films-v1";

export default function App() {
  const [films, setFilms] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [noteMin, setNoteMin] = useState("0");
  const [filmAModifier, setFilmAModifier] = useState(null);
  const [chargementTermine, setChargementTermine] = useState(false);

  // Au premier affichage, on récupère la collection sauvegardée.
  useEffect(() => {
    try {
      const sauvegarde = localStorage.getItem(STORAGE_KEY);
      if (sauvegarde !== null) {
        const filmsEnregistres = JSON.parse(sauvegarde);
        setFilms(Array.isArray(filmsEnregistres) ? filmsEnregistres : filmsExemple);
      } else {
        setFilms(filmsExemple);
      }
    } catch {
      setFilms(filmsExemple);
    } finally {
      setChargementTermine(true);
    }
  }, []);

  // On sauvegarde uniquement après le chargement initial pour ne pas écraser les données.
  useEffect(() => {
    if (chargementTermine) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
    }
  }, [films, chargementTermine]);

  const filmsFiltres = useMemo(() => {
    const mot = recherche.trim().toLocaleLowerCase("fr");
    return films.filter((film) => {
      const correspondAuTitre = film.titre.toLocaleLowerCase("fr").includes(mot);
      const correspondALaNote = film.note >= Number(noteMin);
      return correspondAuTitre && correspondALaNote;
    });
  }, [films, recherche, noteMin]);

  function enregistrerFilm(donnees) {
    if (filmAModifier) {
      setFilms((anciens) => anciens.map((film) =>
        film.id === filmAModifier.id ? { ...film, ...donnees } : film
      ));
      setFilmAModifier(null);
      return;
    }

    const nouveauFilm = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      ...donnees
    };
    setFilms((anciens) => [nouveauFilm, ...anciens]);
  }

  function supprimerFilm(id) {
    const film = films.find((item) => item.id === id);
    if (film && window.confirm(`Supprimer « ${film.titre} » de votre collection ?`)) {
      setFilms((anciens) => anciens.filter((item) => item.id !== id));
      if (filmAModifier?.id === id) setFilmAModifier(null);
    }
  }

  const moyenne = films.length
    ? (films.reduce((total, film) => total + Number(film.note), 0) / films.length).toFixed(1)
    : "—";

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="CinéClub accueil">
          <span className="brand-icon"><Clapperboard size={21} /></span>
          <span>Ciné<span className="brand-accent">Club</span></span>
        </a>
        <div className="topbar-right"><span className="status-dot" /> Ma bibliothèque personnelle</div>
      </header>

      <main className="page-content">
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-kicker"><Sparkles size={14} /> VOTRE CINÉMA, VOS RÈGLES</span>
            <h1>Tous vos films.<br /><span>Une seule collection.</span></h1>
            <p>Gardez une trace de vos découvertes, notez vos coups de cœur et retrouvez vos films préférés en un instant.</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="clapper-illustration"><Clapperboard size={88} strokeWidth={1.15} /></div>
            <span className="art-star star-one">✦</span><span className="art-star star-two">✧</span>
          </div>
        </section>

        <section className="stats-row" aria-label="Statistiques de la collection">
          <div className="stat-card"><span className="stat-icon"><LibraryBig size={18} /></span><div><strong>{films.length}</strong><span>Films enregistrés</span></div></div>
          <div className="stat-card"><span className="stat-icon star-stat">★</span><div><strong>{moyenne}</strong><span>Note moyenne / 5</span></div></div>
          <div className="stat-card"><span className="stat-icon"><Film size={18} /></span><div><strong>{filmsFiltres.length}</strong><span>Résultats affichés</span></div></div>
        </section>

        <div className="content-layout">
          <section className="collection-section">
            <div className="section-heading">
              <div><span className="eyebrow">VOTRE SÉLECTION</span><h2>Ma collection <span className="count-pill">{films.length}</span></h2></div>
            </div>
            <FilterBar recherche={recherche} setRecherche={setRecherche} noteMin={noteMin} setNoteMin={setNoteMin} />

            {chargementTermine ? (
              filmsFiltres.length > 0 ? (
                <div className="movie-grid">
                  {filmsFiltres.map((film) => <MovieCard key={film.id} film={film} onEdit={setFilmAModifier} onDelete={supprimerFilm} />)}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-icon"><Film size={30} /></span>
                  <h3>Aucun film trouvé</h3>
                  <p>Essayez de modifier vos filtres ou ajoutez un nouveau film à votre collection.</p>
                  <button className="button button-soft" onClick={() => { setRecherche(""); setNoteMin("0"); }}>Réinitialiser les filtres</button>
                </div>
              )
            ) : <div className="loading-state">Chargement de votre collection…</div>}
          </section>

          <aside className="sidebar">
            <MovieForm filmAModifier={filmAModifier} onSave={enregistrerFilm} onCancel={() => setFilmAModifier(null)} />
            <div className="tip-card"><span>✦ Petit conseil</span><p>Ajoutez l'URL d'une affiche pour rendre votre bibliothèque encore plus agréable à parcourir.</p></div>
          </aside>
        </div>
      </main>

      <footer className="footer"><span>© 2026 CinéClub</span><span>Fait avec passion pour les cinéphiles <span className="footer-heart">♥</span></span></footer>
    </div>
  );
}