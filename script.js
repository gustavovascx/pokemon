let currentPokemonId = 1; // ID inicial para navegação

function buscaPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.trim().toLowerCase();
    let pokemonId = pokemonInput;

    // Verifica se a entrada é um ID ou nome
    if (!isNaN(pokemonInput)) {
        pokemonId = `id/${pokemonInput}`;
    } else {
        pokemonId = `pokemon/${pokemonInput}`;
    }

    fetch(`https://pokeapi.co/api/v2/${pokemonId}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(data => {
            const infoDiv = document.getElementById('info');
            const tipos = data.types.map(type => type.type.name).join(', ');
            const tipo = data.types[0].type.name; // Define o tipo principal
            const backgroundColor = getColorForType(tipo);

            // Atualiza o fundo
            document.body.style.backgroundColor = backgroundColor;

            const pokemonHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Altura: ${data.height / 10} m</p>
                <p>Peso: ${data.weight / 10} kg</p>
                <p>Tipos: ${tipos}</p>
            `;

            // Insert content into the info div
            infoDiv.innerHTML = pokemonHTML;

            // Atualiza o ID do Pokémon atual
            currentPokemonId = data.id;
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
            document.getElementById('info').innerHTML = '<p>Erro! Procure Novamente</p>';
        });
}

function anteriorPokemon() {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        buscaPokemonById(currentPokemonId);
    }
}

function proximoPokemon() {
    currentPokemonId++;
    buscaPokemonById(currentPokemonId);
}

function buscaPokemonById(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(data => {
            const infoDiv = document.getElementById('info');
            const tipos = data.types.map(type => type.type.name).join(', ');
            const tipo = data.types[0].type.name;
            const backgroundColor = getColorForType(tipo);

            // Atualiza o fundo
            document.body.style.backgroundColor = backgroundColor;

            const pokemonHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Altura: ${data.height / 10} m</p>
                <p>Peso: ${data.weight / 10} kg</p>
                <p>Tipos: ${tipos}</p>
            `;

            // Insert content into the info div
            infoDiv.innerHTML = pokemonHTML;
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
            document.getElementById('info').innerHTML = '<p>Erro! Procure Novamente</p>';
        });
}

function getColorForType(tipo) {
    const colors = {
        fire: 'red',
        water: 'blue',
        grass: 'green',
        electric: 'yellow',
        ground: 'brown',
        // Adicione mais cores para outros tipos aqui
    };
    return colors[tipo] || 'white'; // Retorna uma cor padrão se o tipo não estiver definido
}
