import { Star, Pencil, Trash2, Film } from "lucide-react";

export default function MovieCard({ film, onEdit, onDelete }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {film.affiche ? (
          <img
            className="poster"
            src={film.affiche}
            alt={`Affiche de ${film.titre}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextElementSibling.style.display = "grid";
            }}
          />
        ) : null}
        <div className="poster-fallback"><Film size={38} /><span>Affiche indisponible</span></div>
        <span className="rating"><Star size={14} fill="currentColor" /> {film.note}/5</span>
      </div>
      <div className="movie-info">
        <h3>{film.titre}</h3>
        <p>{film.description || "Aucune description pour ce film."}</p>
        <div className="card-actions">
          <button className="button button-soft" onClick={() => onEdit(film)} aria-label={`Modifier ${film.titre}`}>
            <Pencil size={15} /> Modifier
          </button>
          <button className="icon-button delete-button" onClick={() => onDelete(film.id)} aria-label={`Supprimer ${film.titre}`} title="Supprimer">
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}