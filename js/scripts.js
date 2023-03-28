let pokemonRepository = (function () {
    let pokemonDatabase = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';                
   
    function getAll () {
      return pokemonDatabase;
    }
  
    function add (pokemon) {
        if (
          typeof pokemon === 'object' &&
          'name' in pokemon 
        ) {
          pokemonDatabase.push(pokemon);
        } else {
          alert("Method not allowed! Make sure the pokemon you want to add is an <object> datatype");
        } 
      }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemonItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-primary');
        button.addEventListener('click', function(){
            showDetails(pokemon)
        });
        listPokemonItem.appendChild(button);
        pokemonList.appendChild(listPokemonItem);
    }
  
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            });
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            hideLoadingMessage();
          });
        }).catch(function (e) {
          console.error(e);
          hideLoadingMessage();
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          hideLoadingMessage();
        }).catch(function (e) {
          console.error(e);
          hideLoadingMessage();
        });
    }

    function showLoadingMessage() {
        let loadingMessage = document.querySelector('.loading-message');
        loadingMessage.classList.remove('hidden');
    }

    function hideLoadingMessage() {
        let loadingMessage = document.querySelector('.loading-message');
        loadingMessage.classList.add('hidden');
    }

    return {
      getAll,
      add,
      addListItem,
      loadList,
      loadDetails
    }
                      
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});