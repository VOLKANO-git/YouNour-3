const h1 = document.querySelector("#titre");
const p = document.querySelector(".intro");
const footer = document.querySelector("footer");
h1.textContent = "this is the title of my exercice";
p.textContent = "this is the paragraph for my intro";
footer.textContent = "this is the footer for my exercice";
const h1_id = document.getElementById("titre");
console.log(h1 === h1_id);
console.log(h1_id.textContent);
const p2 = document.querySelector("intro");
console.log(p);
console.log(p2);
// i noticed that after removing the dot the program didnt identify it