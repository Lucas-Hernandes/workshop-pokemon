document.addEventListener('DOMContentLoaded', function () {
    // Sua função principal aqui
    fetchAndDisplayPokemons();
});

// Elemento onde os pokemon serão exibidos
const pokemonList = document.getElementById('pokemon-list');

var start = 0;
var limit = 151;

// Função para buscar e exibir os pokemon
async function fetchAndDisplayPokemons() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=' + start + '&limit=' + limit;
    while (pokemonList.firstChild) {
        pokemonList.removeChild(pokemonList.firstChild);
    }
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifique se os dados foram obtidos com sucesso
        if (data && data.results) {
            const pokemons = data.results;

            // Itere pelos pokemon e adicione-os ao HTML
            for await (let pokemon of pokemons) {
                pokemonData = await getPokemonData(pokemon.url);

                
                var pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                
                var pokemonTypes = '';
                pokemonData.types.forEach(type => {
                    pokemonTypes += '<p style="border: 1px solid white; padding: 4px; background:' + getTypeColor(type.type.name) + ';' + '">' + type.type.name.toUpperCase() + '</p>';
                });

                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');
                pokemonCard.innerHTML = `
                    <style>
                        .${pokemonName}:hover {transform: scale(1.2); cursor: pointer;}
                    </style>
                    <img class="${pokemonName}" src="${pokemonData.sprites.front_default ? pokemonData.sprites.front_default : "https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"}" 
                        onmouseover="this.src='${pokemonData.sprites.front_shiny ? pokemonData.sprites.front_shiny : (pokemonData.sprites.front_default ? pokemonData.sprites.front_default : "https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png")}';" 
                        onmouseout="this.src='${pokemonData.sprites.front_default ? pokemonData.sprites.front_default : "https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"}';" 
                        alt="${pokemon.name}">
                    <h2>${pokemonName}</h2>
                    <p>#${pokemonData.id}</p>
                    <div style="display: flex;">${pokemonTypes}</div>
                `;
                if(pokemonData.id > start && pokemonData.id <= (start + limit)) {
                    pokemonList.appendChild(pokemonCard);
                }
            };
        }
    } catch (error) {
        console.error('Erro ao buscar os pokemon:', error);
    }
}

async function getPokemonData(pokemonUrl) {
    try {
        const response = await fetch(pokemonUrl);
        const data = await response.json();
        if (data) {
            const pokemonData = data;
            return pokemonData;
        }
    } catch (error) {
        console.error('Erro ao buscar os pokemon:', error);
    }
}

function getTypeColor(type) {
    switch (type) {
        case 'normal':
            return '#a8a77a';
        case 'fire':
            return '#ee8130';
        case 'water':
            return '#6390f0';
        case 'electric':
            return '#f7d02c';
        case 'grass':
            return '#7ac74c';
        case 'ice':
            return '#96d9d6';
        case 'fighting':
            return '#c22e28';
        case 'poison':
            return '#a33ea1';
        case 'ground':
            return '#e2bf65';
        case 'flying':
            return '#a98ff3';
        case 'psychic':
            return '#f95587';
        case 'bug':
            return '#a6b91a';
        case 'rock':
            return '#b6a136';
        case 'ghost':
            return '#735797';
        case 'dragon':
            return '#6f35fc';
        case 'dark':
            return '#705746';
        case 'steel':
            return '#b7b7ce';
        case 'fairy':
            return '#d685ad';
        default:
            return 'white'; // Retornar uma cor padrão (branco) para tipos desconhecidos
    }
}

function getGen(geracao) {
    switch (geracao) {
        case "gen1":
            start = 0;
            limit = 151;
            break;
        case "gen2":
            start = 151;
            limit = 100;
            break;
        case "gen3":
            start = 251;
            limit = 135;
            break;
        case "gen4":
            start = 386;
            limit = 108;
            break;
        case "gen5":
            start = 494;
            limit = 155;
            break;
        case "gen6":
            start = 649;
            limit = 72;
            break;
        case "gen7":
            start = 721;
            limit = 88;
            break;
        case "gen8":
            start = 809;
            limit = 96;
            break;
        case "gen9":
            start = 905;
            limit = 111;
            break;
        default:
            console.log("Geração não encontrada");
    }
    fetchAndDisplayPokemons();
}