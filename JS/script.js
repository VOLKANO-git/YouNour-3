const liste = document.getElementById("liste-eleves");
const compteur = document.getElementById("compteur");

function creerLigne(eleve) {
  const card = document.createElement("li");
  card.classList.add("rounded-2xl", "border", "border-line", "bg-card", "p-3");
  card.dataset.id = eleve.id;

  const nom = document.createElement("h3");
  nom.classList.add("font-medium");
  nom.textContent = eleve.prenom + " " + eleve.nom;
  card.append(nom);

  const absences = document.createElement("p");
  absences.classList.add("text-sm", "text-muted");
  if (eleve.absences > 1) {
    absences.textContent = eleve.absences + " absences";
  } else {
    absences.textContent = eleve.absences + " absence";
  }
  card.append(absences);

  if (eleve.absences >= 3) {
    card.classList.add("alerte");
    const badge = document.createElement("span");
    badge.classList.add(
      "badge",
      "rounded-full",
      "bg-alert",
      "px-2",
      "py-0.5",
      "text-xs",
      "text-white",
    );
    badge.textContent = "Prévenir les parents";
    card.append(badge);
  }

  const moyenne = document.createElement("p");
  if (eleve.notes.length > 0) {
    const somme = eleve.notes.reduce((total, note) => total + note, 0);
    const moy = somme / eleve.notes.length;
    moyenne.textContent =
      "Moyenne : " + moy.toFixed(1).replace(".", ",") + " / 20";
  } else {
    moyenne.textContent = "Moyenne : —";
  }
  card.append(moyenne);

  const btnAbsent = document.createElement("button");
  btnAbsent.type = "button";
  btnAbsent.classList.add(
    "btn-absent",
    "h-11",
    "rounded-full",
    "border",
    "border-line",
    "px-4",
    "text-sm",
  );
  btnAbsent.textContent = "Absent";

  const champNote = document.createElement("input");
  champNote.type = "number";
  champNote.setAttribute("aria-label", "Note sur 20");
  champNote.classList.add(
    "h-11",
    "rounded-full",
    "border",
    "border-line",
    "bg-paper",
    "px-4",
    "text-sm",
  );

  const btnNote = document.createElement("button");
  btnNote.type = "button";
  btnNote.classList.add(
    "btn-note",
    "h-11",
    "rounded-full",
    "bg-ink",
    "px-4",
    "text-sm",
    "text-white",
  );
  btnNote.textContent = "Ajouter la note";

  const message = document.createElement("p");
  message.classList.add("message", "mt-2", "text-xs", "text-alert");
  message.textContent = "La note doit être un nombre entre 0 et 20.";
  message.hidden = true;

  card.append(btnAbsent, champNote, btnNote, message);

  return card;
}

const recherche = document.getElementById("recherche");
const groupefilter = document.getElementById("filtre-groupe");
const messageVide = document.getElementById("aucun-resultat");

groupes.forEach(function (groupe) {
  const groupeO = document.createElement("option");
  groupeO.value = groupe.id;
  groupeO.textContent = groupe.nom;
  groupefilter.append(groupeO);
});

function afficherListe() {
  const idGroupe = groupefilter.value;
  const mot = recherche.value.trim().toLowerCase();
  let resultat = eleves;

  if (idGroupe !== "") {
    resultat = resultat.filter(function (eleve) {
      return String(eleve.groupeId) === idGroupe;
    });
  }

  if (mot !== "") {
    resultat = resultat.filter(function (eleve) {
      return (eleve.prenom + " " + eleve.nom).toLowerCase().includes(mot);
    });
  }

  liste.textContent = "";
  liste.append(...resultat.map(creerLigne));

  compteur.textContent = resultat.length + " élève(s)";
  messageVide.hidden = resultat.length > 0;
}

liste.addEventListener("click", function (e) {
  const bouton = e.target;
  const li = bouton.closest("li");
  if (!li) return;

  const eleve = eleves.find(function (el) {
    return el.id === Number(li.dataset.id);
  });

  if (bouton.classList.contains("btn-absent")) {
    eleve.absences += 1;
    li.replaceWith(creerLigne(eleve));
  }

  if (bouton.classList.contains("btn-note")) {
    const champ = li.querySelector("input");
    const note = Number(champ.value);

    if (champ.value !== "" && note >= 0 && note <= 20) {
      eleve.notes.push(note);
      li.replaceWith(creerLigne(eleve));
    } else {
      li.querySelector(".message").hidden = false;
    }
  }
});

recherche.addEventListener("input", afficherListe);
groupefilter.addEventListener("change", afficherListe);
afficherListe();