import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

const formulaireVide = { titre: "", description: "", affiche: "", note: "3" };

export default function MovieForm({ filmAModifier, onSave, onCancel }) {
  const [form, setForm] = useState(formulaireVide);

  useEffect(() => {
    if (filmAModifier) {
      setForm({
        titre: filmAModifier.titre,
        description: filmAModifier.description,
        affiche: filmAModifier.affiche,
        note: String(filmAModifier.note)
      });
    } else {
      setForm(formulaireVide);
    }
  }, [filmAModifier]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((ancien) => ({ ...ancien, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ ...form, note: Number(form.note) });
    setForm(formulaireVide);
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">{filmAModifier ? "MISE À JOUR" : "VOTRE COLLECTION"}</span>
          <h2>{filmAModifier ? "Modifier le film" : "Ajouter un film"}</h2>
        </div>
        {filmAModifier && <button type="button" className="icon-button" onClick={onCancel} aria-label="Annuler"><X size={18} /></button>}
      </div>

      <label htmlFor="titre">Titre du film</label>
      <input id="titre" name="titre" value={form.titre} onChange={handleChange} placeholder="Ex. : Inception" required maxLength={80} />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="De quoi parle ce film ?" rows="3" maxLength={350} />

      <label htmlFor="affiche">URL de l'affiche</label>
      <input id="affiche" name="affiche" type="url" value={form.affiche} onChange={handleChange} placeholder="https://exemple.com/affiche.jpg" />

      <label htmlFor="note">Votre note</label>
      <select id="note" name="note" value={form.note} onChange={handleChange}>
        {[5, 4, 3, 2, 1].map((note) => <option key={note} value={note}>{note} / 5 {note === 5 ? "— Excellent" : ""}</option>)}
      </select>

      <button className="button button-primary submit-button" type="submit">
        {filmAModifier ? <Save size={17} /> : <Plus size={18} />}
        {filmAModifier ? "Enregistrer les changements" : "Ajouter à ma collection"}
      </button>
      {filmAModifier && <button type="button" className="cancel-link" onClick={onCancel}>Annuler la modification</button>}
    </form>
  );
}