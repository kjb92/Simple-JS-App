let pokemonRepository = (function () {

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
     ]                     
   
    function getAll () {
      return pokemonList;
    }
  
    function add (pokemon) {
        if (
          typeof pokemon === 'object' &&
          'name' in pokemon && 
          'height' in pokemon && 
          'types' in pokemon 
        ) {
          pokemonList.push(pokemon);
        } else {
          alert("Method not allowed! Make sure the pokemon you want to add is an <object> datatype");
        } 
      }
  
    return {
      getAll,
      add
    }
                      
  })();


let big = 1.5

function printAllPokemons (pokemon){
    if (pokemon.height >= big){
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + " m) -> <b>Wow, that's big!</b></p>");
    }
    else {
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + " m)</p>");
    } 
}

 pokemonRepository.getAll().forEach(printAllPokemons);
 