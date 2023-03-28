let pokemonRepository = (function () {
    let pokemonDatabase = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';                
    let modal = document.querySelector('#modal-1');
    let modalOverlay = modal.querySelector('.modal__overlay');

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
        button.classList.add('capitalize', 'flex');
        button.innerText = pokemon.name;
        button.classList.add('button-primary');
        button.addEventListener('click', function(){
            showDetails(pokemon);
        });
        listPokemonItem.appendChild(button);
        pokemonList.appendChild(listPokemonItem);
    }
  
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
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
        });
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

    function showModal(pokemon) {
      
      //call the modalTitel & set to pokemon's name
      let modalTitel = modal.querySelector('#modal-1-title');
      modalTitel.innerText = pokemon.name;
      
      //call the modalContent & insert pokemon's image
      let detailImage = modal.querySelector('.detail__image');
      detailImage.src = pokemon.imageUrl;

      let detailStats = modal.querySelector('.detail__stats');
      detailStats.innerHTML = '';
      let detailHeight = document.createElement('p');
      detailHeight.innerText = 'Height: ' + pokemon.height;
      detailStats.appendChild(detailHeight);
      let detailTypes = document.createElement('p');
      detailTypes.innerText = 'Types: ' + pokemon.types;
      detailStats.appendChild(detailTypes);

      
      //enable to close modal via X
      modal.querySelector('.modal__close').addEventListener('click', hideModal);

      //enable to close modal via click anywhere outside of modal
      modalOverlay.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalOverlay) {
          hideModal();
        }  
      });

      //show the modal
      modal.classList.add('is-open'); 
    }

    function hideModal() {
      modal.classList.remove('is-open');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        hideModal();  
      }
    });

    return {
      getAll,
      add,
      addListItem,
      loadList,
      loadDetails
    };
                      
})();


function searchPokemons() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.querySelector('#input__search-pokemons');
  filter = input.value.toUpperCase();
  ul = document.querySelector('#pokemon-list');
  li = ul.querySelectorAll('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("button")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});