let pokemonRepository = (function () {
  let pokemonDatabase = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  let modal = document.querySelector('#pokemonModal');
  let modalOverlay = modal.querySelector('.modal__overlay');

  function getAll() {
    return pokemonDatabase;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonDatabase.push(pokemon);
    } else {
      alert(
        'Method not allowed! Make sure the pokemon you want to add is an <object> datatype'
      );
    }
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      var row = $('#pokemon-list');

      var card = $('<div class="card m-3" style="width:400px"></div>');
      var image = $(
        '<img class="card-img-top" alt="Card image" style="width:30%"/>'
      );
      image.attr('src', pokemon.imageUrlFront);
      var cardBody = $('<div class="card-body"></div>');
      var cardTitle = $('<h4 class="card-title" >' + pokemon.name + '</h4>');
      var seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokemonModal">See Profile</button>'
      );

      row.append(card);
      card.append(image);
      card.append(cardBody);
      cardBody.append(cardTitle);
      cardBody.append(seeProfile);

      seeProfile.on('click', function (event) {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          hideLoadingMessage();
        });
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(' ' + details.types[i].type.name);
        }
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(' ' + details.abilities[i].ability.name);
        }
        hideLoadingMessage();
      })
      .catch(function (e) {
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
    //build the modal
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    modalTitle.empty();
    modalBody.empty();
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElementFront = $('<img class="moda-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrlFront);
    let imageElementBack = $('<img class="moda-img" style="width:50%">');
    imageElementBack.attr('src', pokemon.imageUrlBack);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    let abilitiesElement = $(
      '<p>' + 'Abilities: ' + pokemon.abilities + '</p>'
    );
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  function searchPokemons() {
    var input, filter, list, card, a, i, txtValue;
    input = document.querySelector('#input__search-pokemons');
    filter = input.value.toUpperCase();
    list = document.querySelector('#pokemon-list');
    card = list.querySelectorAll('.card');

    for (i = 0; i < card.length; i++) {
      a = card[i].getElementsByClassName('card-title')[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        card[i].style.display = '';
      } else {
        card[i].style.display = 'none';
      }
    }
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    searchPokemons: searchPokemons,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
