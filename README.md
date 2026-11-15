# CinéClub — Application React de gestion de films

Une application React construite avec Vite pour ajouter, modifier, supprimer et filtrer une collection de films. Les données sont conservées dans le `localStorage` du navigateur.

## Fonctionnalités

- Ajouter un film avec titre, description, URL d'affiche et note sur 5.
- Modifier un film : le formulaire est automatiquement prérempli.
- Supprimer un film après confirmation.
- Rechercher un film par titre.
- Filtrer par note minimale.
- Sauvegarder automatiquement la collection dans le navigateur.
- Interface responsive pour ordinateur, tablette et téléphone.

## Installation

Prérequis : Node.js et npm.

```bash
npm install
npm run dev
```

Ouvrez ensuite l'adresse indiquée par Vite (généralement http://localhost:5173).

Pour vérifier la version de production :

```bash
npm run build
npm run preview
```

## Organisation du projet

```text
films-react/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── data.js
    ├── main.jsx
    ├── styles.css
    └── components/
        ├── FilterBar.jsx
        ├── MovieCard.jsx
        └── MovieForm.jsx
```

## Où sont utilisés les hooks ?

- `useState` dans `App.jsx` gère les films, les filtres, le film en cours de modification et l'état du chargement.
- `useEffect` dans `App.jsx` charge les données au démarrage puis sauvegarde chaque changement dans `localStorage`.
- `useState` dans `MovieForm.jsx` gère les champs du formulaire.
- `useEffect` dans `MovieForm.jsx` préremplit les champs lorsqu'un film est sélectionné pour modification.
- `useMemo` calcule la liste filtrée sans refaire le filtrage à chaque rendu inutilement.

## Stockage

La collection est enregistrée sous la clé `cineclub-films-v1` dans le `localStorage`. Elle reste disponible dans le même navigateur tant que les données du site ne sont pas effacées.

Les affiches utilisent des URL d'images distantes : une connexion Internet est nécessaire pour les afficher. Vous pouvez aussi coller l'URL de vos propres affiches.
