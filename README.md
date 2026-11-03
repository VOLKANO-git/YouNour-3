# Nour Academy — Partie 3 : Espace enseignant

Projet individuel réalisé pour **Sahla Digital** (Brief B5). Cette interface permet à un enseignant de faire l'appel, de saisir les notes de son groupe et de consulter un bilan en un coup d'œil.

> Les données affichées sont fictives (voir `data.js`).

## Fonctionnalités

- **Affichage du groupe** : liste des élèves générée dynamiquement en JavaScript (`creerLigne()`), avec un compteur d'élèves.
- **Faire l'appel** : marquer un élève absent, le nombre d'absences est mis à jour.
- **Saisie des notes** : ajout d'une note par élève avec validation (la note doit être un nombre entre 0 et 20) et calcul de la moyenne.
- **Alerte parents** : un badge « Prévenir les parents » apparaît à partir de 3 absences.
- **Recherche et filtres** : recherche par prénom ou nom, filtre par groupe, choix de l'ordre d'affichage.
- **Ajout d'un élève** via un formulaire.
- **Bilan du groupe** : moyenne générale, total des absences, nombre d'alertes, meilleure moyenne et liste des parents à appeler.

## Technologies

- HTML5
- JavaScript natif (aucun framework)
- Tailwind CSS v4 (via CDN, migration prévue vers Vite + npm)

## Structure du projet

```
├── index.html   # Page et structure de l'interface
├── data.js      # Données fictives des élèves (chargé avant script.js)
├── script.js    # Logique : rendu, appel, notes, recherche, bilan
└── README.md
```

## Lancer le projet

1. Cloner le dépôt :
   ```bash
   git clone <url-du-depot>
   ```
2. Ouvrir le dossier dans VS Code.
3. Lancer `index.html` avec l'extension **Live Server** (par défaut sur `http://127.0.0.1:5500`).

## User stories

| US | Description |
|----|-------------|
| US1 | Afficher le groupe |
| US2 | Faire l'appel |
| US3 | Saisir les notes |
| US4 | Recherche, filtres et tri |
| US5 | Bilan du groupe |

## Auteur

Anas — YouCode, Nador