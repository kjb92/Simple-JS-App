let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        types: ['grass','poison']
    },
    {
        name: 'Ivysaur',
        height: 1.0,
        types: ['grass','poison']
    },
    {
        name: 'Venusaur',
        height: 2.0,
        types: ['grass','poison']
    },
    {
        name: 'Charmander',
        height: 0.6,
        types: ['fire']
    },
    {
        name: 'Charmeleon',
        height: 1.1,
        types: ['fire']
    },
    {
        name: 'Charizard',
        height: 1.7,
        types: ['fire','flying']
    },
    {
        name: 'Squirtle',
        height: 0.5,
        types: ['water']
    },
    {
        name: 'Wartortle',
        height: 1.0,
        types: ['water']
    },
    {
        name: 'Blastoise',
        height: 1.6,
        types: ['water']
    }
];

let big = 1.5


for (let i=0; i<pokemonList.length; i++){
    if (pokemonList[i].height >= big){
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + " m) -> <b>Wow, that's big!</b></p>");
    }
    else {
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + " m)</p>");
    } 
}

