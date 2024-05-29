const pokeapi = "https://pokeapi.co/api/v2/pokemon/";
function get_pokemon_data(pokemon_name) {
    return fetch(`${pokeapi}${pokemon_name}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error fetching Pokemon data: ", error);
        });
}

function create_pokemon_element(pokemon) {
    const pokemon_element = document.createElement("div");
    container_flow.appendChild(pokemon_element);
    pokemon_element.classList.add("pokemon");
    const pokemon_image = document.createElement("img");
    pokemon_element.appendChild(pokemon_image);
    pokemon_image.src = pokemon.sprites.front_default;
    pokemon_image.alt = pokemon.name;
    const pokemon_name = document.createElement("h2");
    pokemon_element.appendChild(pokemon_name);
    pokemon_name.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokemon_details = document.createElement("p");
    pokemon_details.classList.add("poke_details");
    let poke_text = document.createElement("div");
    pokemon_element.appendChild(poke_text);
    poke_text.appendChild(pokemon_details);
    poke_text.classList.add("poke_text");
    let types = pokemon.types.forEach((type) => {
        let types = document.createTextNode("span");
        types.textContent = type["type"]["name"];
        poke_text.appendChild(types);
    });
    pokemon_details.textContent = `Pokedex # ${pokemon.id} Tipo:` + " ";
    return pokemon_element;
}

function show_pokemon(pokemon_name) {
    pokemon_name.forEach((name) => {
        get_pokemon_data(name).then((pokemon) => {
            if (pokemon) {
                create_pokemon_element(pokemon);
            }
        });
    });
}

function save_poke_element() {
    if (poke_name_list.length <= 4) {
        const poke_name = [];
        poke_name.push(pokemon_input.value);
        const json_poke_name = JSON.stringify(poke_name);
        localStorage.setItem("poke_name", json_poke_name);
    } else {
        poke_form.classList.toggle("hide");
        poke_ready.classList.toggle("hide");
        save_team_button.classList.toggle("hide");
    }
    poke_name_list.push(pokemon_input.value);
    const json_poke_name_list = JSON.stringify(poke_name_list);
    localStorage.setItem("poke_name_list", json_poke_name_list);
}

const pokeapi_display = document.querySelector("#pokeapi_display");
const poke_form = document.querySelector("#poke_form");
const pokemon_input = document.querySelector("#pokemon_inp");
const container_flow = document.querySelector("#poke_flow");
const poke_ready = document.querySelector("#poke_ready");
const save_team_button = document.querySelector("#save_team_button");
const poke_name_list = [];

save_team_button.addEventListener("click", (e) => {
    e.preventDefault;
    Swal.fire({
        title: `¿Estás seguro?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sí",
        denyButtonText: `No`,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Equipo guardado!", "", "success");
            container_flow.classList.toggle("hide");
            save_team_button.classList.toggle("hide");
            let team = localStorage.getItem("poke_name_list");
            let team_array = JSON.parse(team);
            let team_list_box = document.querySelector("#team_list_box");
            let team_list = document.createElement("ul");
            team_list_box.appendChild(team_list);
            team_list.textContent = "My team: ";
            let team_object = { ...team_array };
            for (const property in team_object) {
                let li = document.createElement("li");
                team_list.appendChild(li);
                li.textContent = `/${team_object[property]}/`;
                const json_team_object = JSON.stringify(team_object);
                localStorage.setItem("team", json_team_object);
            }
        } else if (result.isDenied) {
            Swal.fire("El equipo no fue guardado", "", "info");
        }
    });
});

poke_form.addEventListener("submit", (e) => {
    e.preventDefault();
    save_poke_element();
    let storage_poke_element = localStorage.getItem("poke_name");
    let updated_poke_array = JSON.parse(storage_poke_element);
    poke_form.addEventListener(
        "DOMContentLoaded",
        show_pokemon(updated_poke_array)
    );
});
