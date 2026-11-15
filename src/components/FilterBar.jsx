import { Search, SlidersHorizontal } from "lucide-react";

export default function FilterBar({ recherche, setRecherche, noteMin, setNoteMin }) {
  return (
    <div className="filter-bar">
      <div className="search-field">
        <Search size={18} />
        <input value={recherche} onChange={(event) => setRecherche(event.target.value)} placeholder="Rechercher un film..." aria-label="Rechercher par titre" />
      </div>
      <div className="rating-filter">
        <SlidersHorizontal size={17} />
        <select value={noteMin} onChange={(event) => setNoteMin(event.target.value)} aria-label="Filtrer par note">
          <option value="0">Toutes les notes</option>
          <option value="5">5 étoiles</option>
          <option value="4">4 étoiles et plus</option>
          <option value="3">3 étoiles et plus</option>
          <option value="2">2 étoiles et plus</option>
          <option value="1">1 étoile et plus</option>
        </select>
      </div>
    </div>
  );
}