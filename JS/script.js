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
    moyenne.textContent = "Moyenne : " + moy.toFixed(1) + " / 20";
  } else {
    moyenne.textContent = "Moyenne : —";
  }
  card.append(moyenne);

  const btnAbsent = document.createElement("button");
  btnAbsent.type = "button";
  btnAbsent.classList.add("btn-absent","h-11", "rounded-full","border", "border-line", "px-4","text-sm");
  btnAbsent.textContent="Absent";


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
  resultat.forEach(function (eleve) {
    liste.append(creerLigne(eleve));
  });

  compteur.textContent = resultat.length + " élève(s)";
  messageVide.hidden = resultat.length > 0;
}




liste.addEventListener("click", function(e){
 const bouton = e.target;
 const li = button.closest("li");
 if (!li) return;

 const eleve = eleves.find(function(el){
  return el.id === Number(li.dataset.id);
 });
 

 if (bouton.classList.contains("btn-absent")){
  eleve.absences += 1;
  li.replaceWith(creerLigne(eleve));
 }
});
recherche.addEventListener("input", afficherListe);
groupefilter.addEventListener("change", afficherListe);
afficherListe();