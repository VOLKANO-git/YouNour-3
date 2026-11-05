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
  afficherParents();
}

const listeParents = document.getElementById("liste-parents");
const aucuneAlerte = document.getElementById("aucune-alerte");

function creerLigneParent(eleve) {
  const li = document.createElement("li");
  li.classList.add(
    "rounded-xl",
    "bg-card",
    "px-3",
    "py-2",
    "ring-1",
    "ring-line",
  );
  li.textContent =
    eleve.prenom + " " + eleve.nom + " — " + eleve.telephoneParent;
  return li;
}

function afficherParents() {
  const idGroupe = groupefilter.value;

  const alertes = eleves.filter(function (eleve) {
    const dansGroupe = idGroupe === "" || String(eleve.groupeId) === idGroupe;
    return dansGroupe && eleve.absences >= 3;
  });

  listeParents.textContent = "";
  listeParents.append(...alertes.map(creerLigneParent));
  aucuneAlerte.hidden = alertes.length > 0;
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
    afficherParents();
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

const formEleve = document.getElementById("form-eleve");
const champPrenom = document.getElementById("prenom");
const champNom = document.getElementById("nom");
const champGroupe = document.getElementById("groupe");
const champEmail = document.getElementById("email");
const champTelephone = document.getElementById("telephone");
const champCode = document.getElementById("code");
const forceCode = document.getElementById("code-force");
const formSucces = document.getElementById("form-succes");
const formErreur = document.getElementById("form-erreur");

groupes.forEach(function (groupe) {
  const option = document.createElement("option");
  option.value = groupe.id;
  option.textContent = groupe.nom;
  champGroupe.append(option);
});

const REGEX = {
  nom: /^[\p{L} -]{2,}$/u,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  telephone: /^(06|07|\+2126|\+2127)\d{8}$/,
  majuscule: /\p{Lu}/u,
  chiffre: /\d/,
  special: /[^\p{L}\d\s]/u,
};

function verifierNom(valeur) {
  return REGEX.nom.test(valeur.trim())
    ? ""
    : "Au moins 2 caractères : lettres, espaces ou tirets.";
}

function verifierGroupe(valeur) {
  return valeur === "" ? "Choisissez un groupe." : "";
}

function verifierEmail(valeur) {
  return REGEX.email.test(valeur.trim())
    ? ""
    : "Adresse e-mail invalide. Exemple : parent@mail.ma";
}

function verifierTelephone(valeur) {
  return REGEX.telephone.test(valeur.replace(/\s/g, ""))
    ? ""
    : "Format attendu : 06 ou 07, ou +212 6 / +212 7, puis 8 chiffres.";
}

function criteresCodeManquants(valeur) {
  const manque = [];
  if (valeur.length < 8) manque.push("8 caractères");
  if (!REGEX.majuscule.test(valeur)) manque.push("une majuscule");
  if (!REGEX.chiffre.test(valeur)) manque.push("un chiffre");
  if (!REGEX.special.test(valeur)) manque.push("un caractère spécial");
  return manque;
}

function verifierCode(valeur) {
  const manque = criteresCodeManquants(valeur);
  return manque.length > 0 ? "Il manque : " + manque.join(", ") + "." : "";
}

const champs = [
  {
    input: champPrenom,
    verifier: verifierNom,
    succes: "Prénom valide.",
    defaut: "Au moins 2 caractères : lettres, espaces ou tirets.",
  },
  {
    input: champNom,
    verifier: verifierNom,
    succes: "Nom valide.",
    defaut: "Au moins 2 caractères : lettres, espaces ou tirets.",
  },
  {
    input: champGroupe,
    verifier: verifierGroupe,
    succes: "Groupe choisi.",
    defaut: "Groupe de l'élève.",
  },
  {
    input: champEmail,
    verifier: verifierEmail,
    succes: "E-mail valide.",
    defaut: "Exemple : parent@mail.ma",
  },
  {
    input: champTelephone,
    verifier: verifierTelephone,
    succes: "Numéro valide.",
    defaut: "06 / 07 ou +212 6 / 7, puis 8 chiffres.",
  },
  {
    input: champCode,
    verifier: verifierCode,
    succes: "Code valide.",
    defaut: "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial.",
  },
];

function verifierChamp(champ) {
  const erreur = champ.verifier(champ.input.value);
  const bloc = champ.input.closest(".champ");
  bloc.classList.remove("erreur", "valide");
  bloc.classList.add(erreur === "" ? "valide" : "erreur");
  bloc.querySelector(".message").textContent =
    erreur === "" ? champ.succes : erreur;
  return erreur === "";
}
function verifierGroupeDisponible(groupeId, prenom, nom) {
  const membres = eleves.filter(function (eleve) {
    return eleve.groupeId === groupeId;
  });
  if (membres.length >= 15) {
    return "Ce groupe est complet (15 élèves).";
  }

  const cible = (prenom + " " + nom).trim().toLowerCase();
  const existe = membres.some(function (eleve) {
    return (eleve.prenom + " " + eleve.nom).toLowerCase() === cible;
  });
  if (existe) {
    return "Cet élève existe déjà dans ce groupe.";
  }
  return "";
}

function viderFormulaire() {
  formEleve.reset();
  champs.forEach(function (champ) {
    const bloc = champ.input.closest(".champ");
    bloc.classList.remove("erreur", "valide");
    bloc.querySelector(".message").textContent = champ.defaut;
  });
  forceCode.value = 0;
}

champs.forEach(function (champ) {
  champ.input.addEventListener("input", function () {
    verifierChamp(champ);
    formSucces.hidden = true;
  });
  champ.input.addEventListener("change", function () {
    verifierChamp(champ);
    formSucces.hidden = true;
  });
});

champCode.addEventListener("input", function () {
  forceCode.value = 4 - criteresCodeManquants(champCode.value).length;
});

formEleve.addEventListener("submit", function (e) {
  e.preventDefault();
  formSucces.hidden = true;
  formErreur.hidden = true;

  let premierInvalide = null;
  champs.forEach(function (champ) {
    const valide = verifierChamp(champ);
    if (!valide && premierInvalide === null) {
      premierInvalide = champ.input;
    }
  });
  if (premierInvalide !== null) {
    premierInvalide.focus();
    return;
  }

  const groupeId = Number(champGroupe.value);
  const probleme = verifierGroupeDisponible(
    groupeId,
    champPrenom.value.trim(),
    champNom.value.trim(),
  );
  if (probleme !== "") {
    formErreur.textContent = probleme;
    formErreur.hidden = false;
    return;
  }

  eleves.push({
    id: Math.max(...eleves.map((eleve) => eleve.id)) + 1,
    prenom: champPrenom.value.trim(),
    nom: champNom.value.trim(),
    groupeId: groupeId,
    telephoneParent: champTelephone.value.replace(/\s/g, ""),
    emailParent: champEmail.value.trim(),
    absences: 0,
    notes: [],
  });

  afficherListe();
  viderFormulaire();
  formSucces.hidden = false;
});

viderFormulaire();
