// Aguarde até que o documento HTML seja completamente carregado antes de executar código
document.addEventListener('DOMContentLoaded', function () {
    // Chame a função principal para buscar e exibir Pokémon
    fetchAndDisplayPokemons();
});

// Referência ao elemento HTML onde os Pokémon serão exibidos
const pokemonList = document.getElementById('pokemon-list');

// Função para buscar e exibir Pokémon
async function fetchAndDisplayPokemons() {
    try {
        // URL da API que fornece dados sobre os Pokémon (limitado aos primeiros 151 Pokémon)
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
        
        // Faça uma solicitação à API usando a função fetch
        const response = await fetch(apiUrl);
        
        // Converta a resposta em formato JSON
        const data = await response.json();

        // Verifique se os dados foram obtidos com sucesso
        if (data && data.results) {
            const pokemons = data.results;

            // Itere sobre os Pokémon e adicione-os ao HTML
            for await (let pokemon of pokemons) {
                // Obtenha mais informações sobre o Pokémon a partir de sua URL
                pokemonData = await getPokemonData(pokemon.url);

                // Formate o nome do Pokémon para iniciar com maiúscula
                var pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                
                // Inicialize uma string vazia para os tipos do Pokémon
                var pokemonTypes = '';

                // Itere sobre os tipos do Pokémon e crie elementos HTML para cada tipo
                pokemonData.types.forEach(type => {
                    // Crie um elemento <p> para cada tipo com estilo de fundo baseado no tipo
                    pokemonTypes += '<p style="border: 1px solid white; padding: 4px; background:' + getTypeColor(type.type.name) + ';">' + type.type.name.toUpperCase() + '</p>';
                });

                // Crie um elemento de cartão de Pokémon
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');
                pokemonCard.innerHTML = `
                    <img class="${pokemonName}" src="${pokemonData.sprites.front_default}" alt="${pokemon.name}">
                    <h2>${pokemonName}</h2>
                    <p>#${pokemonData.id}</p>
                    <div style="display: flex;">${pokemonTypes}</div>
                `;

                // Adicione o cartão do Pokémon ao elemento da lista de Pokémon
                pokemonList.appendChild(pokemonCard);
            };
        }
    } catch (error) {
        // Em caso de erro, exiba uma mensagem no console
        console.error('Erro ao buscar os Pokémon:', error);
    }
}

// Função para buscar dados detalhados de um Pokémon a partir de sua URL
async function getPokemonData(pokemonUrl) {
    try {
        // Faça uma solicitação à API usando a função fetch
        const response = await fetch(pokemonUrl);

        // Converta a resposta em formato JSON
        const data = await response.json();

        // Verifique se os dados foram obtidos com sucesso
        if (data) {
            const pokemonData = data;
            return pokemonData;
        }
    } catch (error) {
        // Em caso de erro, exiba uma mensagem no console
        console.error('Erro ao buscar os Pokémon:', error);
    }
}

// Função para definir a cor do tipo do Pokémon com base no tipo
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
            return 'white'; // Retorne uma cor padrão (branco) para tipos desconhecidos
    }
}