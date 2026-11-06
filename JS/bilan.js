(function () {
  const filtre = document.getElementById("filtre-groupe");
  const elMoyenne = document.getElementById("bilan-moyenne");
  const elAbsences = document.getElementById("bilan-absences");
  const elAlertes = document.getElementById("bilan-alertes");
  const elMeilleur = document.getElementById("bilan-meilleur");

  function formater(nombre) {
    return nombre.toFixed(1).replace(".", ",");
  }

  function moyenne(notes) {
    const somme = notes.reduce((total, note) => total + note, 0);
    return somme / notes.length;
  }

  function majBilan() {
    const idGroupe = filtre.value;
    const membres = eleves.filter(
      (eleve) => idGroupe === "" || String(eleve.groupeId) === idGroupe,
    );

    const toutesLesNotes = membres.reduce(
      (acc, eleve) => acc.concat(eleve.notes),
      [],
    );
    elMoyenne.textContent =
      toutesLesNotes.length > 0 ? formater(moyenne(toutesLesNotes)) : "—";
})();
