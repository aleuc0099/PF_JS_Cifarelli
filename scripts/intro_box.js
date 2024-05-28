const info_box = document.querySelector("#more_info");
const p_one = document.querySelector("#p_one");
const p_two = document.querySelector("#p_two");
const github_link = document.createElement("a");
let link = document.createTextNode("GitHub");
info_box.appendChild(github_link);
github_link.appendChild(link);
github_link.href = "https://github.com/aleuc0099";
p_one.textContent = "Esta página interactiva fue creada por Alejo Cifarelli en el año 2024";
p_two.innerHTML = "Para más información, visitar";

github_link.addEventListener("mouseover", () => {
    github_link.classList = "over";
});
github_link.addEventListener("mouseout", () => {
    github_link.classList = "out";
});