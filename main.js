const pokeContainer = document.querySelector(".js-poke-container");
const pokeBtn = document.querySelector(".js-pokemon-btn");

pokeBtn.addEventListener("click", () => {
    getPokemon();
});

function getPokemon() {
    const pokemonNameInput = document.querySelector(".js-pokemon-name").value.trim();
    if (!pokemonNameInput) {
        pokeContainer.innerHTML = `<p class="text-danger">Please enter a Pokémon name!</p>`;
        return;
    }

    pokeContainer.innerHTML = `<p>Loading...</p>`;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameInput.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
            const types = data.types.map((typeInfo) => typeInfo.type.name).join(", ");
            const html = `
                <div class="row border my-3">
                    <h4>Pokemon Details</h4>
                    <img src="${data.sprites.front_default}" alt="pokeimage" class="img-fluid pokeImage d-block mx-auto">
                </div>
                <div class="row pokedetails my-2">
                    <div class="col-lg-4 col-12 bg-danger p-2">
                        <p>Pokemon Name:</p>
                        <p>${data.name}</p>
                    </div>
                    <div class="col-lg-4 col-12 p-2 bg-warning">
                        <p>Type:</p>
                        <p>${types}</p>
                    </div>
                    <div class="col-lg-4 col-12 p-2 bg-secondary">
                        <p>Weight:</p>
                        <p>${data.weight}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 bg-gradient bg-info">
                        <p>Stat 1:</p>
                        <p>${data.stats[0].stat.name}: ${data.stats[0].base_stat}</p>
                    </div>
                    <div class="col-lg-4 bg-gradient bg-success">
                        <p>Stat 2:</p>
                        <p>${data.stats[1].stat.name}: ${data.stats[1].base_stat}</p>
                    </div>
                    <div class="col-lg-4 bg-gradient bg-danger">
                        <p>Stat 3:</p>
                        <p>${data.stats[2].stat.name}: ${data.stats[2].base_stat}</p>
                    </div>
                </div>
            `;
            pokeContainer.innerHTML = html;
            document.querySelector(".js-pokemon-name").value = ""; // Clear input field
        })
        .catch((err) => {
            console.error(err);
            pokeContainer.innerHTML = `<p class="text-danger">Could not find Pokémon. Please try again!</p>`;
        });
}
